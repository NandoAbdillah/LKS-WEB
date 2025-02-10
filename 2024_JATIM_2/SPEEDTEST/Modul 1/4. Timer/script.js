let interval;
let seconds= 999;
let centiSeconds = 0;
// 100 centiseconds = 1 second

function updateTimer(){
    centiSeconds++;
    if(centiSeconds==100){
        seconds++;
        centiSeconds = 0;
    }

    if(seconds === 999 && centiSeconds==59){
        stopTimer();
        updateDisplay();
        alert("Time's up!");
    }
    updateDisplay();
}

function updateDisplay(){
    const formatedSeconds = seconds.toString().padStart(3,"0");
    const formatedCentiSeconds = centiSeconds.toString().padStart(2,"0");
    document.querySelector("#timer").innerHTML=formatedSeconds +":"+formatedCentiSeconds;
}


function startTimer(){
    interval = setInterval(updateTimer, 10); // 10 milliseconds = 1 centisecond
}

function stopTimer(){
    clearInterval(interval);
}

function resetTimer(){
    stopTimer();
    seconds = 0;
    centiSeconds = 0;
    updateDisplay();
}
