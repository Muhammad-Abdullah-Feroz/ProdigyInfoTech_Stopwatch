console.log(`Started JavaScript`);
const hand = document.querySelector(".hand");
const buttons = document.querySelectorAll(".btn");
const h = document.querySelector(".hours")
const m = document.querySelector(".minutes")
const s = document.querySelector(".seconds")
const laps = document.querySelector(".lap-section")
console.log(Array.from(buttons));
console.log(hand.style);

let hours,minutes,seconds;
let time = 0;
let lapCount = 0
let timeLoop = -5;
const updateTime = () =>{
    seconds = time%60;
    minutes = Math.floor((time/60)%60)
    hours = Math.floor(time/3600)%60
    h.innerHTML = (hours<10)?`0${hours}`:`${hours}`
    m.innerHTML = (minutes<10)?`0${minutes}`:`${minutes}`
    s.innerHTML = (seconds<10)?`0${seconds}`:`${seconds}`
}
const startTime = (e) => {
    timeLoop = setInterval(() => {
        time += 1
        console.log(time);
        updateTime()
    }, 999);
    hand.setAttribute("style", "animation-name:clockMove")
    e.innerHTML = "STOP";
}
const stopTime = (e) => {
    clearInterval(timeLoop)
    e.innerHTML = "START";
    hand.setAttribute("style", "animation-play-state:paused")
}
const resetTime = () => {
    buttons.forEach((e)=>{
        if(e.innerHTML == "STOP")
            stopTime(e);
    })
    time = 0;
    updateTime()
    laps.innerHTML = ""
    lapCount = 0;
}
const lapTime = ()=>{
    lapCount += 1;
    let newLap = `
    <div class="lap"><div class="serial">Lap ${lapCount}</div><div class="lap-time">${h.innerHTML}:${m.innerHTML}:${s.innerHTML}</div></div>
    `
    laps.innerHTML = laps.innerHTML + newLap;
}

buttons.forEach((e) => {
    // console.log(e.innerHTML);
    e.addEventListener('click', () => {
        console.log(e.innerHTML);
        if (e.innerHTML == "START") {
            startTime(e);
        } else if (e.innerHTML == "STOP") {
            stopTime(e)
        } else if (e.innerHTML == "RESET") {
            resetTime()
        } else if (e.innerHTML == "LAP") {
            lapTime()
        }
    })
})