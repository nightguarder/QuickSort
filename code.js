let values = [];
let states = [];
let w =10;

//let createCanvas = document.createElement("canvas");
//it is present in p5.min data
function setup(){
    createCanvas(windowWidth, windowHeight);
    values = new Array(floor(width/w));

    //creating random elements
    for (let i = 0; i < values.length; i++) {   
           values[i] = random(height);
           states[i] = -1;
    }
    //console.log(values);
    Quicksort(values,0,values.length-1)

}
async function Quicksort(array,start,end){
    if (start>=end){  //its a recursive function so this prevents from loop
    return;
    }

    //initialize partinion,which chooses the pivot and sorts...
    let index = await Partition(array,start,end);
    states[index] = -1;

    //recursively sort the array
    await Promise.all([
        Quicksort(array,start,index-1),
        Quicksort(array,index+1,end),
        console.log(counter)
        //add a counter for n. operations
    ]);
}
let counter =0;
async function Partition(array,start,end){
    for (let i = start; i < end; i++) {
        states[i]=1;
    }

    let pivotValue = array[end];
    let pivotIndex = start;
    states[pivotIndex] = 0;
    for (let i = start; i < end; i++) {
      if (array[i] < pivotValue) {
        await Swap(array, i, pivotIndex);
        states[pivotIndex] = -1;
        pivotIndex++;
        states[pivotIndex] = 0;
        counter++;
      }
    }
    //put pivotIndex in correct spot
    await Swap(array,pivotIndex,end);

    for (let i = start; i < end; i++) {
        if(i !=pivotIndex)
            states[i]=-1;
    }
    return pivotIndex;
}

async function Operations(){

}

 function draw() {
    background(0);
    for (let i = 0; i < values.length; i++) {
        noStroke();
        if (states[i] == 0) {
          fill('#fc666d');
        } else if (states[i] == 1) {
          fill('#D6FFB7');
        } else {
          fill(255);
        }
        rect(i * w, height - values[i], w, values[i]);
      }
    }

//classic swap function
async function Swap(array, a,b){
    await sleep(50);
    let temp = array[a];
    array[a]=array[b];
    array[b] = temp;
}
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }