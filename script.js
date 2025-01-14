const notes = ["do", "re", "mi", "fa", "sol", "la", "si"];
let previousNote = null;
let intervalId = null;
let intervalTime = 1.5 * 1000;

function getRandomNote() {
    let randomNote;
    do {
        randomNote = notes[Math.floor(Math.random() * notes.length)];
    } while (randomNote === previousNote);
    previousNote = randomNote;
    return randomNote;
}

function updateNote() {
    const noteElement = document.getElementById("note");
    const currentNote = getRandomNote();
    noteElement.textContent = currentNote;
    noteElement.style.animation = "noteAnimation 0.5s ease-out";
    speak(currentNote);
}

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}

function toggleStartStop() {
    const startStopBtn = document.getElementById("startStopBtn");
    const sliderContainer = document.getElementById("sliderContainer");
    const noteElement = document.getElementById("note");

    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        startStopBtn.textContent = "Start";
        startStopBtn.classList.remove("active");
        sliderContainer.style.display = "flex";
        noteElement.textContent = "--";
    } else {
        intervalId = setInterval(updateNote, intervalTime);
        startStopBtn.textContent = "Stop";
        startStopBtn.classList.add("active");
        sliderContainer.style.display = "none";
        updateNote();
    }
}

function updateIntervalTime() {
    const slider = document.getElementById("intervalSlider");
    const intervalValue = document.getElementById("intervalValue");
    intervalTime = parseFloat(slider.value) * 1000;
    intervalValue.textContent = slider.value;
}

document.getElementById("startStopBtn").addEventListener("click", toggleStartStop);
document.getElementById("intervalSlider").addEventListener("input", updateIntervalTime);

document.getElementById("note").addEventListener("animationend", function() {
    this.style.animation = "";
});

