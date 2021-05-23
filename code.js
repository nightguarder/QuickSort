//declare variables 
let values = [];
let states = [];
let w =10;
let fontsize = 50; //optimal size

let array = [];
let duration = 0;


function preload(){
    font = loadFont("/TrenchThin-16R0.otf");
    console.log(font);
}
//let createCanvas = document.createElement("canvas");
//it is present in p5.min data
function setup(){
    createCanvas(windowWidth, windowHeight);
    values = new Array(floor(width/w));

    textFont(font);
    textSize(fontsize);
    
    //creating random elements
    for (let i = 0; i < values.length; i++) {   //the values.length depends on your browser window size
           values[i] = random(height);
           states[i] = -1;
    }
  
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
    //const t0=performance.now()
    performance.mark("start");

    await Promise.all([
        Quicksort(array,start,index-1),
        Quicksort(array,index+1,end),
        /* console.log(counter) */
        //add a counter for n. operations
    ]);
    performance.mark("end");
    performance.measure('measure', 'start', 'end');
    //console.log(performance.measure("measure"));

    //get duration from performance.measure in JSON 
    async function getData(){
      let raw_data = await performance.measure("measure");
      let stringify =JSON.stringify(raw_data);
      let obj= JSON.parse(stringify);

      for(duration =0;duration<1000;duration++){
        duration =obj.duration;
        duration++;
      }
     //console.log(Math.floor(duration/1000))
    }
  getData();
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

  function draw() {
    background(0);
    textAlign(LEFT,LEFT);
    drawWords(width *0.01);

    for (let i = 0; i < values.length; i++) {
        noStroke();
        if (states[i] == 0) {
          fill('#fc666d');
        } else if (states[i] == 1) {
          fill('#696969');
        } else {
          fill(255);
        }
        rect(i * w, height - values[i], w, values[i]);
      }
    }
    function drawWords(x){
        fill(255);
        text("Recursive Quicksort",x,40)
        /* text("Time complexity: O(nLogn)",x,50) */
        text("n. of Inversions: " +counter, x,80)
        /* text("array size: " +values.length,x,90) */
        text("elapsed time: " +Math.floor(duration) +"ms",x,120)
    }
    