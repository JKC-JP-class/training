let currentWord = {};
let score = 0;
let isChecking = false;

function nextWord() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    document.getElementById("word").textContent = currentWord.jp;
    document.getElementById("input").value = "";
    document.getElementById("message").textContent = "Type English for the Japanese word you see!";
    document.getElementById("correction").textContent = "";
    document.getElementById("correct_word").textContent = "";
    document.getElementById("input").focus();
    isChecking = false;
}

function checkAnswer() {
    
    if (isChecking) return;
    isChecking = true; 

    const input = document.getElementById("input").value.trim().toLowerCase();
    if (input === currentWord.english) {

    score++;
    document.getElementById("message").textContent = "✅ Correct! Well done!";
    document.getElementById("score").textContent = "Score: " + score;
    setTimeout(nextWord, 1500);

    } else {

    document.getElementById("correction").textContent = `❌ Oops! Let's watch out the answer!`;
    document.getElementById("correct_word").textContent = `${currentWord.english}`;
    setTimeout(nextWord, 4000);

    }

}

function startGame() {
    const name = document.getElementById("nameInput").value.trim();
    if (!name) {
    alert("Please enter your name!");
    return;
    }
    document.getElementById("nameInputContainer").style.display = "none";
    document.getElementById("gameContainer").style.display = "block";
    document.getElementById("playerName").textContent = `${name} さん`;
    document.getElementById("input").addEventListener("keydown", e => {
    if (e.key === "Enter") checkAnswer();
    });

    nextWord();
}