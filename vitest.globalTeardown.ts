export default async function teardown() {
  // Force garbage collection if available
  if (global.gc) {
    global.gc();
  }

  // Give a bit of time for cleanup
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Allow process to exit naturally after cleanup
  // Ensure all asynchronous operations are completed
}