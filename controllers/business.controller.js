module.exports.search = (req, res, next) => {
  //beginnig, comeBack
  const { routeAtoB, locations, limit } = req.body


}

// function comb(arr, n, results = [], result = []) {
//   for(let i=0; i<arr.length; ++i) {
//     let newResult = result.slice();
//     let newArr = arr.slice();

//     newResult.push(arr[i]);
//     newArr.splice(i, 1);

//     if(n>1) {
//       comb(newArr, n-1, results, newResult);
//     } else if (results.length){
//       newResult.reverse()
//       let repeated = results.some(el => {
//         for(let j=0; j<el.length; j++) {
//           if (el[j] !== newResult[j]) return false
//         }
//         return true
//       })
//       if (!repeated) {
//         results.push(newResult.reverse())
//       }
//     } else {
//       results.push(newResult)
//     }
//   }

//   return results
// }
