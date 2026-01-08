// ===========Feature===============
// - 2 Question 2 answer
// - Multi answer correction
// - Multi answer display (line break)
// =================================

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
let questionStep = 0;

// ==========================
// 次の単語を表示する関数
// ==========================

function nextWord() {

  if (wordIndex >= shuffledWords.length) {
    shuffledWords = shuffle([...words]);
    wordIndex = 0;
  }

  currentWord = shuffledWords[wordIndex];
  wordIndex++;

  questionStep = 0; // ← ここが重要
  showQuestion();

}

function showQuestion() {

  document.getElementById("input").value = "";
  document.getElementById("correction").textContent = "";
  document.getElementById("correct_word").textContent = "";

  if (questionStep === 0) {

    // 第1問：意味
    document.getElementById("word").textContent = currentWord.question;
    document.getElementById("message").textContent =
      "What is the meaning of this adjective?";
    document.getElementById("input").placeholder = "Type the meaning in English";

  } else {

    // 第2問：形容詞変化
    document.getElementById("word").textContent = currentWord.question;
    document.getElementById("message").textContent =
      currentWord.message;
    document.getElementById("input").placeholder = "Type the meaning in Japanese";

  }

  document.getElementById("input").focus();
  isChecking = false;

}

function checkAnswer() {

  if (isChecking) return;
  isChecking = true;

  const input = document.getElementById("input").value.trim().toLowerCase();
  let isCorrect = false;
  let correctText = "";

  if (questionStep === 0) {
    // ===== 第1問：意味（配列対応） =====
    isCorrect = currentWord.meaning
      .map(m => m.toLowerCase())
      .includes(input);

    correctText = currentWord.meaning.join("<br>");

  } else {
    // ===== 第2問：形容詞変化 =====
    isCorrect = currentWord.answer
      .map(a => a.toLowerCase())
      .includes(input);

    correctText = currentWord.answer.join("<br>");
  }

  // ===== 正解・不正解 共通処理 =====
  document.getElementById("correct_word").innerHTML = correctText;

  if (isCorrect) {

    score++;
    document.getElementById("score").textContent = "Score: " + score;
    document.getElementById("message").textContent = "✅ Correct! Well done!";

    if (questionStep === 0) {
      questionStep = 1;
      setTimeout(showQuestion, 4000);
    } else {
      setTimeout(nextWord, 4000);
    }

  } else {

    document.getElementById("message").textContent =
      "❌ Oops! Let's watch out the answer!";

    if (questionStep === 0) {
      questionStep = 1;
      setTimeout(showQuestion, 8000);
    } else {
      setTimeout(nextWord, 8000);
    }
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