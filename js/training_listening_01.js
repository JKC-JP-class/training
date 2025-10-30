let current = null;
let score = 0;
let isChecking = false;


function pickRandomExercise() {
    current = datas[Math.floor(Math.random() * datas.length)];
    document.getElementById("input").value = "";
    document.getElementById("correction").textContent = "";
    document.getElementById("correct_word").textContent = "";
    document.getElementById("input").focus();
    isChecking = false;
}

function playAudio() {
    if (!current) pickRandomExercise();
    const audio = new Audio(current.file);
    audio.play();
}

function checkAnswer() {
    
    if (isChecking) return;
    isChecking = true; 

    const input = document.getElementById("input").value.trim().toLowerCase();
    if (input === current.answer) {

        score++;
        document.getElementById("correction").textContent = "✅ Correct! Well done!";
        document.getElementById("score").textContent = "Score: " + score;
        setTimeout(pickRandomExercise, 1500);

    } else {

        document.getElementById("correction").textContent = `❌ Oops! Let's watch out the answer!`;
        document.getElementById("correct_word").textContent = `${current.answer}`;
        setTimeout(pickRandomExercise, 3000);

    }
   
}

function startGame() {
    const name = document.getElementById("nameInput").value.trim();
    if (!name) {
    alert("Please enter your name!");
    return;
    }
    // 名前入力画面を非表示、ゲーム画面を表示
    document.getElementById("nameInputContainer").style.display = "none";
    document.getElementById("gameContainer").style.display = "block";

    // 名前を表示
    document.getElementById("playerName").textContent = `${name}さん`;

    // Enterキーでチェック
    document.getElementById("input").addEventListener("keydown", e => {
    if (e.key === "Enter") checkAnswer();
    });

    pickRandomExercise();
}