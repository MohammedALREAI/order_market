/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
// function checkOperations(a:Array<number>, signs:Array<string>, b:Array<number>, c:Array<number>) {
//     for(let i =0 ;i<a.length;i++){
//             let firtnumber=a[i];
//             let secandnnumber=b[i]
//             let resfrom2number=signs[i]==='+'?firtnumber+secandnnumber:firtnumber-secandnnumber
//             let isTure=resfrom2number===c[i]
//             if(!isTure) return false
           
          
            
//     }
//     return true


// }
// let a = [3, 2, -1, 4]
// let s = ['+', '-', '-', '+']
// let b = [2, 7, -5, 2] 
// let c = [5, -5, 4, 6]

// console.log(checkOperations(a,s,b,c))









function removeItemByIndex(arr:number[],index:number):number[]{
    // check the index that foun in arr 
    if(arr.length>index){
    
        delete arr[index]
        delete arr[index+1]
         return  arr.filter(x=>x!==undefined) as number[]
    }
    return arr
    
    }


          function removingPairsGame(num:number[]):number[]{
                        for(let i=0;i<num.length;i++){
                          if(num[i]===num[i+1]){
                         num=removeItemByIndex(num,i) as number[]
                                }
                 
              }
             
            return num        
            }
            
    function removingPairsGames(num:number[]=[1,3,3,5]):string{
        
        let arr=removingPairsGame(num) as number[]
        if(arr.length>2){
        arr =removingPairsGame(arr) as number[]
        }
        
        const  remain =arr.length
        return (((num.length-remain)/2)%2)===1?"Alic":"bob"

          }




