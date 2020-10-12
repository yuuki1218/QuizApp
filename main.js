//エレメントの取得
const startBtn = document.getElementById("start-btn");
const subTitleVal = document.getElementById("sub-title");
const messageVal = document.getElementById("message");
const answerWrap = document.getElementById("btn-wrap");
const infoWrap = document.getElementById("info");
let questionNumber = 1;
let totalAnswer = 0;

function startQuiz() {
  startBtn.style.display = "none";

  //ロード中のメッセージ・タイトルの変更
  subTitleVal.textContent = "取得中";
  messageVal.textContent = "少々お待ち下さい・・・";

  //APIのテキストを取得・表示
  fetch("https://opentdb.com/api.php?amount=10")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("読み込みエラーです。");
      }
    })
    .then((json) => json.results)
    .then((results) => {
      showQuiz(results);
    });

  //クイズを表示する
  function showQuiz(quiz) {
    //問題数が0になったとき
    if (quiz.length === 0) {
      questionNumber = 0;
      subTitleVal.textContent = `あなたの正答数は${totalAnswer}です。`;
      messageVal.textContent = `再チャレンジする場合は～開始ボタン～を押してください。`;
      startBtn.textContent = "ホームに戻る";
      startBtn.style.display = "block";

      startBtn.addEventListener("click", restartQuiz);
      return;
    }
    //問題数
    subTitleVal.textContent = `問題${questionNumber++}`;

    //質問
    messageVal.textContent = `${quiz[0].question}`;

    //ジャンル・難易度
    const category = document.createElement("div");
    category.textContent = `[ジャンル]：${quiz[0].category}`;
    infoWrap.appendChild(category);
    const difficulty = document.createElement("div");
    difficulty.textContent = `[難易度]：${quiz[0].difficulty}`;
    infoWrap.appendChild(difficulty);

    //正解
    const correctAnswer = quiz[0].correct_answer;

    //ボタンリストのラップ
    const answerList = document.createElement("ul");
    answerList.className = "answer-list";
    answerWrap.appendChild(answerList);

    //クイズを配列に入れる。
    let questionItems = [quiz[0].correct_answer];
    for (let i = 0; i < quiz[0].incorrect_answers.length; i++) {
      const questionItem = quiz[0].incorrect_answers[i];
      questionItems.push(questionItem);
    }
    shuffleAnswer(questionItems);

    for (let i = 0; i < questionItems.length; i++) {
      const answerVal = questionItems[i];
      const answerItem = document.createElement("li");
      const answerBtn = document.createElement("button");
      answerBtn.className = "answer-btn";
      answerBtn.textContent = answerVal;
      answerList.appendChild(answerItem);
      answerItem.appendChild(answerBtn);

      answerBtn.addEventListener("click", {
        answerList: answerList,
        quiz: quiz,
        correct_answer: correctAnswer,
        answer_btn: answerBtn.textContent,
        category: category,
        difficulty: difficulty,
        handleEvent: replyQuestion,
      });
    }
  }
  //質問をシャッフルする
  function shuffleAnswer(questionItems) {
    let num = questionItems.length;
    while (num) {
      let i = Math.floor(Math.random() * num);
      let val = questionItems[--num];
      questionItems[num] = questionItems[i];
      questionItems[i] = val;
    }
    return questionItems;
  }
  //答えを押した後
  function replyQuestion() {
    if (this.correct_answer === this.answer_btn) {
      totalAnswer++;
    } else {
    }
    this.quiz.shift();
    answerWrap.removeChild(this.answerList);
    infoWrap.removeChild(this.category);
    infoWrap.removeChild(this.difficulty);
    showQuiz(this.quiz);
  }
  //ホーム画面に戻る
  function restartQuiz() {
    window.location.reload();
  }
}

startBtn.addEventListener("click", startQuiz);
