const colors = ["red", "blue", "yellow", "green"];
let sequence = [];
let userSequence = [];
let state = 0;
var isGood = true;

function start_game(){
    dim_colors();
    random_color();
}

function dim_colors(){
    document.getElementById("red").style.backgroundColor = "#803b3b";
    document.getElementById("yellow").style.backgroundColor = "#fefe8c";
    document.getElementById("blue").style.backgroundColor = "#6969fd";
    document.getElementById("green").style.backgroundColor ="#4b874b";
}

function random_color(){
    //adds each random generated color to the sequence
    sequence.push(colors[Math.floor(Math.random()*4)]);
    display_sequence();
}

async function display_sequence(){
    var time = 0;
    if(sequence.length >= 13){
        time = 400;
    }else if (sequence.length >= 9){
        time = 600;
    }else if (sequence.length >= 5){
        time = 800;
    }else{
        time = 1000;
    }
    console.log("display sequence");
    for(let i = 0; i < sequence.length; i++){
        console.log(sequence[i] + " " + i);
        document.getElementById(sequence[i]).style.backgroundColor = sequence[i];
        await delay(time);
        dim_colors();
        await delay(time/4);
    }
    state = 1;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


function guess_color(color){
    // highlight(color);
    if(state === 1 && userSequence.length === sequence.length-1){
        userSequence.push(color);
        state = 0;
        verify_guess();
    }else if(state === 1 && userSequence.length < sequence.length){
        userSequence.push(color);
    }
}
// async function highlight(color){
//     document.getElementById(color).style.backgroundColor = color;
//     await delay(100);
//     dim_colors();
//   }

//probably should verify as clicking, then handle progressing better but works for now

function verify_guess(){
    console.log("verify guess");
    for(let i = 0; i < sequence.length; i++){
        if(sequence[i] !== userSequence[i]){
            console.log(sequence[i] + " vs " + userSequence[i]);
            isGood = false;
        }
    }
    if(isGood){
        next_round();
    }else{
        game_over();
    }
    
}

function next_round(){
    userSequence = [];
    random_color();
}

function game_over(){
    console.log("GG");
}


    document.getElementById("red").addEventListener("click", () => guess_color("red"));
    document.getElementById("yellow").addEventListener("click", () => guess_color("yellow"));
    document.getElementById("blue").addEventListener("click", () => guess_color("blue"));
    document.getElementById("green").addEventListener("click", () => guess_color("green")); 

    //to do
    //the starting light changes red to green after 3 seconds
    //5 second limit hmm some sort of time bomb maybe
    //flash all 4 lights 5 times for end game and reset all arrays
    //css requirements font and all that
    //comments
    //if there is time i need to make all time top score probably with a server or something
    //fix the design a bit