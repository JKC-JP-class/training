function shuffle(array) {

  let currentIndex = array.length, randomIndex;

  while (currentIndex != 0) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // 要素を入れ替え
      [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]
      ];

  }

  return array;
}

// ==========================
// 初期設定
// ==========================
let shuffledWords = shuffle([...words]); // シャッフルしたコピー
let wordIndex = 0; // 現在のインデックス
let currentWord = null;
let isChecking = false;
let score = 0;

// ==========================
// 次の単語を表示する関数
// ==========================
function nextWord() {

  // 全部出し切ったら再シャッフル
  if (wordIndex >= shuffledWords.length) {
      shuffledWords = shuffle([...words]);
      wordIndex = 0;
  }

  // 現在の単語を取得
  currentWord = shuffledWords[wordIndex];
  wordIndex++;

  // 表示を更新
  document.getElementById("word").textContent = currentWord.question;
  document.getElementById("input").value = "";
  document.getElementById("message").textContent =
      "Type English for the Japanese word you see!";
  document.getElementById("correction").textContent = "";
  document.getElementById("correct_word").textContent = "";
  document.getElementById("input").focus();

  isChecking = false;

}

function checkAnswer() {

  if (isChecking) return;
  isChecking = true;

  const input = document.getElementById("input").value.trim().toLowerCase();

  // 正解判定（配列のどれかに一致すればOK）
  const isCorrect = currentWord.answer
    .map(a => a.toLowerCase())
    .includes(input);

  if (isCorrect) {

    score++;
    document.getElementById("message").textContent = "✅ Correct! Well done!";
    document.getElementById("score").textContent = "Score: " + score;
    setTimeout(nextWord, 1500);

  } else {

    document.getElementById("correction").textContent =
      "❌ Oops! Let's watch out the answer!";
    document.getElementById("correct_word").textContent =
      currentWord.answer.join(" / ");
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