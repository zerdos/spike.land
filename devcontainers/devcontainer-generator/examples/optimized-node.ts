import { DevcontainerGenerator } from '../src/index';
import * as fs from 'fs/promises';

/**
 * Example script demonstrating the improved DevcontainerGenerator
 * with optimized Dockerfile generation
 */
async function generateOptimizedNodeContainer() {
  try {
    // Create a new generator for a Debian Bookworm base
    const generator = new DevcontainerGenerator('bookworm');
    
    // Configure with optimized Node.js template
    generator
      .setNodeVersion('lts', true) // Use optimized Node.js template
      .updateGit()
      .setZsh()
      .setVscode();
    
    // Generate the Dockerfile and README
    const { Dockerfile, README, warnings } = await generator.generate();
    
    // Output any warnings
    if (warnings.length > 0) {
      console.warn('Warnings during generation:');
      warnings.forEach(warning => console.warn(`- ${warning}`));
    }
    
    // Write the generated files
    await fs.mkdir('output', { recursive: true });
    await fs.writeFile('output/Dockerfile', Dockerfile);
    await fs.writeFile('output/README.md', README);
    
    console.log('Successfully generated optimized Node.js container files in the output directory');
  } catch (error) {
    console.error('Error generating container:', error);
  }
}

// Run the example
generateOptimizedNodeContainer();
