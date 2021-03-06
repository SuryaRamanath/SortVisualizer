export function getBubbleSortAnimations(array){
    const animations=[]
    const copy = [...array];
    if(array.length <=1) return array;
    // const auxiliaryArray = array.slice();
  bubbleSort(copy, animations)
  return animations
}
function bubbleSort(array,animations){
    for(var i = 0; i < array.length; i++){
    
        // Last i elements are already in place 
        for(var j = 0; j < ( array.length - i -1 ); j++){

            animations.push([[j,j+1],false]);
            animations.push([[j,j+1],false]);
           
          // Checking if the item at present iteration
          // is greater than the next iteration
          if(array[j] > array[j+1]){
             
            animations.push([[j,array[j+1]],true])
            animations.push([[j+1,array[j]],true])
            // If the condition is true then swap them
            var temp = array[j]
            array[j] = array[j + 1]
            array[j+1] = temp
          }
        //   else{
        //       animations.push([-1,-1]);
        //       animations.push([-1,-1]);

        //   }
        }
      }
}