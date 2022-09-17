

export function getCountSortAnimations(array) {
  const animations = [];
  const copy = [...array];
  if (array.length <= 1) return array;
  // const auxiliaryArray = array.slice();
  countSort(copy, animations);
  return animations;
}
function countSort(array, animations) {
  // for(var i = 0; i < array.length-1; i++){
  //     minindex =i;

  //     for(var j=i+1;j<array.length;j++){

  //         animations.push([[i,j],false]);
  //         animations.push([[i,j],false]);
  //         if(array[j]<array[minindex]){
  //             minindex=j;
  //         }
  //     }
  //     animations.push([[i,array[minindex]],true])
  //     animations.push([[minindex,array[i]],true])
  //     swap(array,i,minindex);

  //   }

  var n = array.length;

  // The output character array that will have sorted arr
  var output = Array.from({ length: n }, (_, p) => 0);

  // Create a count array to store count of individual
  // characters and initialize count array as 0
  var count = Array.from({ length: 256 }, (_, p) => 0);

  // store count of each character
  for (var i = 0; i < n; ++i) {
    animations.push([[i],false]);
    ++count[array[i]];
  }

  // Change count[i] so that count[i] now contains actual
  // position of this character in output array
  for (var j = 1; j <= 255; ++j) count[j] += count[j - 1];

  // Build the output character array
  // To make it stable we are operating in reverse order.
  for (var k = n - 1; k >= 0; k--) {
    output[count[array[k]] - 1] = array[k];
    --count[array[k]];
  }

  // Copy the output array to arr, so that arr now
  // contains sorted characters


  for (var l = 0; l < n; ++l){
    animations.push([[l,output[l]],true])
    array[l] = output[l];
  
} 
}
