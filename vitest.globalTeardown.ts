export default async function teardown() {
  // Force garbage collection if available
  if (global.gc) {
    global.gc();
  }

  // Give a bit of time for cleanup
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Force exit to prevent hanging
  process.exit(0);
}