// Simplified implementation of snakecase-keys for testing
module.exports = function snakecaseKeys(obj) {
  if (typeof obj !== "object" || obj === null) return obj;

  if (Array.isArray(obj)) {
    return obj.map(snakecaseKeys);
  }

  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
    result[snakeKey] = typeof value === "object" ? snakecaseKeys(value) : value;
  }
  return result;
};

module.exports.default = module.exports;
