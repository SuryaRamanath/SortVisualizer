import { swap } from './Utility';

export function getSelectionSortAnimations(array){
    const animations=[]
    const copy = [...array];
    if(array.length <=1) return array;
    // const auxiliaryArray = array.slice();
  selectionSort(copy, animations)
  return animations
}
function  selectionSort(array,animations){
    var minindex;
   
    for(var i = 0; i < array.length-1; i++){
        minindex =i;



        for(var j=i+1;j<array.length;j++){


            animations.push([[i,j],false]);
            animations.push([[i,j],false]);
            if(array[j]<array[minindex]){
                minindex=j;
            }
        }
        animations.push([[i,array[minindex]],true])
        animations.push([[minindex,array[i]],true])
        swap(array,i,minindex);
      
      }
}