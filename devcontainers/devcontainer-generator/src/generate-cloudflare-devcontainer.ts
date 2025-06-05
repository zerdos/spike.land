console.log('Script execution started.'); // New top-level log

import { DevcontainerGenerator } from './index.js';
import { writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateCloudflareDevcontainer() {
  console.log('Starting Cloudflare devcontainer generation function...');
  const generator = new DevcontainerGenerator('bullseye'); // Or another base like 'bookworm'

  // Enable desired features
  generator.setNodeVersion('lts', true); // Use LTS Node.js, optimized build
  generator.updateGit(true); // Update git from source
  // Add the new cloudflare template.
  // Ensure 'cloudflare' is a valid template id added to the registry.
  // We need to cast to any to add a custom template not yet in FeatureFlags
  (generator as any)._enabledTemplates.add("cloudflare");


  try {
    console.log('Initializing generator...');
    await generator.init(); // Load templates
    console.log('Generator initialized.');

    console.log('Generating Dockerfile and README...');
    const { Dockerfile, README } = await generator.generate();
    console.log('Dockerfile and README generated.');

    const outputDir = join(__dirname, '../../../devcontainers/cloudflare-devcontainer');
    const devcontainerDir = join(outputDir, '.devcontainer');

    console.log(`Output directory: ${outputDir}`);
    console.log(`Devcontainer directory: ${devcontainerDir}`);

    // Create directories if they don't exist
    console.log('Creating output directories...');
    await mkdir(outputDir, { recursive: true });
    await mkdir(devcontainerDir, { recursive: true });
    console.log('Output directories created.');

    // Write Dockerfile
    console.log('Writing Dockerfile...');
    await writeFile(join(outputDir, 'Dockerfile'), Dockerfile);
    console.log('Dockerfile generated successfully.');

    // Write README.md (from the cloudflare template)
    // Note: The generator currently concatenates all README parts.
    // We might need a way to get a specific README part or create a static one.
    // For now, we'll write the generated README. A specific README is in a later step.
    console.log('Writing README.md...');
    await writeFile(join(outputDir, 'README.md'), README);
    console.log('README.md generated successfully.');

    // devcontainer.json will be created in a separate step as per the plan.

    console.log(`Cloudflare devcontainer generated in ${outputDir}`);
  } catch (error) {
    console.error('Error generating Cloudflare devcontainer:', error);
    // Log the full error object for more details, especially for non-Error instances
    console.error('Full error object for error:', error);
  }
}

console.log('About to call generateCloudflareDevcontainer()...');
generateCloudflareDevcontainer()
  .then(() => console.log('generateCloudflareDevcontainer() finished successfully.'))
  .catch(err => {
    console.error('Error calling generateCloudflareDevcontainer() or unhandled promise rejection:', err);
    console.error('Full error object for rejection:', err);
  });
