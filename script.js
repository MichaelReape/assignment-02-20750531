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
    document.getElementById("red").style.backgroundColor = "rgb(128, 59, 59)";
    document.getElementById("yellow").style.backgroundColor = "rgb(254, 254, 140)";
    document.getElementById("blue").style.backgroundColor = "#6969fd"
    document.getElementById("green").style.backgroundColor ="#4b874b"
}

function random_color(){
    //adds each random generated color to the sequence
    sequence.push(colors[Math.floor(Math.random()*4)]);
    display_sequence();
}

async function display_sequence(){
    console.log("display sequence");
    for(let i = 0; i < sequence.length; i++){
        console.log(sequence[i] + " " + i);
        document.getElementById(sequence[i]).style.backgroundColor = sequence[i];
        await delay(1000);
        dim_colors();
    }
    state = 1;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function guess_color(color){
    if(state === 1 && userSequence.length === sequence.length-1){
        userSequence.push(color);
        state = 0;
        verify_guess();
    }else if(state === 1 && userSequence.length < sequence.length){
        userSequence.push(color);
    }
}

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
