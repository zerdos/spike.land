import { createHash } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

/**
 * Cache configuration
 */
interface CacheConfig {
  maxAge: number;
  directory: string;
  bypassCache?: boolean;
}

/**
 * Cache statistics
 */
interface CacheStats {
  cacheSize: number;
  itemCount: number;
  oldestItem: number;
  newestItem: number;
}

/**
 * Default cache configuration
 */
const DEFAULT_CACHE_CONFIG: CacheConfig = {
  maxAge: 3600 * 1000, // 1 hour
  directory: ".cache",
};

/**
 * Serves a resource with caching
 * @param url The URL to fetch
 * @param options Fetch options
 * @param cacheConfig Cache configuration
 * @returns The response
 */
export async function serveWithCache(
  url: string,
  options: RequestInit = {},
  cacheConfig: Partial<CacheConfig> = {}
): Promise<Response> {
  // Merge cache config with defaults
  const config = { ...DEFAULT_CACHE_CONFIG, ...cacheConfig };
  
  // Create a hash of the URL and options to use as the cache key
  const key = createHash("md5")
    .update(url + JSON.stringify(options))
    .digest("hex");
  
  // Create the cache directory if it doesn't exist
  const cacheDir = path.resolve(process.cwd(), config.directory);
  await fs.mkdir(cacheDir, { recursive: true });
  
  const cachePath = path.join(cacheDir, key);
  
  // Check if we should bypass the cache
  if (!config.bypassCache) {
    try {
      // Check if the cache file exists and is not expired
      const stats = await fs.stat(cachePath);
      const age = Date.now() - stats.mtimeMs;
      
      if (age < config.maxAge) {
        // Cache hit
        const cachedData = await fs.readFile(cachePath, "utf-8");
        const { status, headers, body } = JSON.parse(cachedData);
        
        return new Response(body, {
          status,
          headers: new Headers(headers),
        });
      }
    } catch (error) {
      // Cache miss or error, continue to fetch
    }
  }
  
  try {
    // Fetch the resource
    const response = await fetch(url, options);
    
    // Don't cache failed responses
    if (!response.ok) {
      return response;
    }
    
    // Clone the response to read the body
    const clonedResponse = response.clone();
    
    // Read the body as text
    const body = await clonedResponse.text();
    
    // Create a cache entry
    const cacheEntry = {
      url,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      body,
      timestamp: Date.now(),
    };
    
    // Write the cache entry to disk
    await fs.writeFile(cachePath, JSON.stringify(cacheEntry));
    
    // Return the original response
    return new Response(body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (error) {
    console.error("Error fetching resource:", error);
    throw error;
  }
}

/**
 * Clears the cache
 * @param urlOrConfig URL to clear or cache configuration
 */
export async function clearCache(
  urlOrConfig?: string | Partial<CacheConfig>
): Promise<void> {
  // Handle different parameter types
  let config = { ...DEFAULT_CACHE_CONFIG };
  let specificUrl: string | undefined;
  
  if (typeof urlOrConfig === "string") {
    specificUrl = urlOrConfig;
  } else if (urlOrConfig) {
    config = { ...config, ...urlOrConfig };
  }
  
  const cacheDir = path.resolve(process.cwd(), config.directory);
  
  try {
    if (specificUrl) {
      // Clear cache for specific URL
      const key = createHash("md5")
        .update(specificUrl)
        .digest("hex");
      const cachePath = path.join(cacheDir, key);
      await fs.unlink(cachePath);
    } else {
      // Clear all cache
      const files = await fs.readdir(cacheDir);
      
      // Delete each file
      await Promise.all(
        files.map((file) => fs.unlink(path.join(cacheDir, file)))
      );
    }
  } catch (error) {
    // Directory doesn't exist or other error
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }
  }
}

/**
 * Gets cache statistics
 * @param cacheConfig Cache configuration
 * @returns Cache statistics
 */
export async function getCacheStats(
  cacheConfig: Partial<CacheConfig> = {}
): Promise<CacheStats> {
  const config = { ...DEFAULT_CACHE_CONFIG, ...cacheConfig };
  const cacheDir = path.resolve(process.cwd(), config.directory);
  
  try {
    // Get all files in the cache directory
    const files = await fs.readdir(cacheDir);
    
    let totalSize = 0;
    let oldestTimestamp = Date.now();
    let newestTimestamp = 0;
    
    // Get stats for each file
    for (const file of files) {
      const filePath = path.join(cacheDir, file);
      const stats = await fs.stat(filePath);
      
      totalSize += stats.size;
      oldestTimestamp = Math.min(oldestTimestamp, stats.mtimeMs);
      newestTimestamp = Math.max(newestTimestamp, stats.mtimeMs);
    }
    
    return {
      cacheSize: totalSize,
      itemCount: files.length,
      oldestItem: oldestTimestamp,
      newestItem: newestTimestamp,
    };
  } catch (error) {
    // Directory doesn't exist or other error
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return {
        cacheSize: 0,
        itemCount: 0,
        oldestItem: 0,
        newestItem: 0,
      };
    }
    throw error;
  }
}
