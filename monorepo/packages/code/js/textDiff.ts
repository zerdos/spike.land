import diff from 'fast-diff';

type Delta = {
    0: 0 | -1,
    1: number
} |  {
    0: 1
    1: string
}

export function createDelta (original: string, revision: string) {
  var result = diff(original, revision);
  // According to latest jsperf tests, there's no need to cache array length
  return result.map(r=>r[0]===1?r:[r[0], r[1].length] as Delta) as Delta[];
//   for (var i = 0; i < result.length; i++) {
//     var item = result[i];
//     // If operation is DELETE or EQUAL, replace the actual text by its length
//     if (item[0] < 1) {
//       item[1] = item[1].length;
//     }
//   }
//   return result;
};

export  function applyPatch(original: string, delta:Delta[]) {
    var result = '',
      index = 0;
  
    // According to latest jsperf tests, there's no need to cache array length
    for (var i = 0; i < delta.length; i++) {
      var item = delta[i],
        operation = item[0],
        value = item[1];
  
      if (item[0] === -1 && typeof value ==="number") {
        // DELETE
        index += value;
      } else if (operation == 0 && typeof value ==="number") {
        // KEEP
        result += original.slice(index, (index += value));
      } else {
        // INSERT
        result += value;
      }
    }
    return result;
  };