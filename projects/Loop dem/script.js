// Counter 1: 1 → 10 repeating (FOR LOOP)
const output10 = document.getElementById("output10");
let i10 = 1;
setInterval(() => {
    // Here we use a FOR loop just to demonstrate it
    for (let j = i10; j <= i10; j++) {
        output10.textContent = j;
    }
    i10++;
    if (i10 > 10) {
        i10 = 1; // reset after 10
    }
}, 500);

// Counter 2: Add random numbers until total > 30 (WHILE LOOP)
const output30 = document.getElementById("output30");

function runRandomCounter() {
    output30.innerHTML = ""; // clear previous run
    let total = 0;
    let steps = [];

    // WHILE loop keeps going until total > 30
    while (total <= 30) {
        let rand = Math.floor(Math.random() * 10) + 1; // random 1–10
        total += rand;
        steps.push(`Added ${rand}, total = ${total}`);
    }

    // Show steps one by one with delay
    steps.forEach((step, index) => {
        setTimeout(() => {
            output30.innerHTML += step + "<br>";
        }, index * 800); // 0.8s delay between updates
    });

    // Restart automatically after the sequence finishes
    setTimeout(runRandomCounter, steps.length * 800 + 1000);
}

// Animated Color Display (FOREACH LOOP)
const colorDisplay = document.getElementById("colorDisplay");
const colors = ["red", "green", "blue", "purple", "orange", "teal", "gold", "pink"];

function animateColors() {
    // forEach loop cycles through colors with delays
    colors.forEach((color, index) => {
        setTimeout(() => {
            colorDisplay.textContent = color.toUpperCase();
            colorDisplay.style.backgroundColor = color;
            colorDisplay.style.color = (["yellow", "gold", "pink"].includes(color)) ? "black" : "white";
        }, index * 1000);
    });

    // Restart after the last color
    setTimeout(animateColors, colors.length * 1000 + 500);
}

// Start everything
animateColors();
runRandomCounter();
