const quizes = [];
const subTitleVal = document.getElementById('sub-title');
const messageVal = document.getElementById('message');
const infoWrap = document.getElementById('info');
const btnWrap = document.getElementById('btn-wrap');
let questionNum = 0;
let num = 1;
let correctAnswerCount = 0;

function getQuizApi() {
  fetch('https://opentdb.com/api.php?amount=10')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('読み込みエラーです。');
      }
    })
    .then((json) => {
      for (let i = 0; i < json.results.length; i++) {
        const quiz = new Quiz(json.results[i]);
        quizes.push(quiz);
      }
      //開始ボタン非表示
      startBtn.style.display = 'none';

      //ロード中のメッセージ・タイトルの変更
      subTitleVal.textContent = '取得中';
      messageVal.textContent = '少々お待ち下さい・・・';
      window.setTimeout(firstQuiz, 2000);
    });
}
//最初の問題
function firstQuiz() {
  quizes[questionNum].showQuiz();
  quizes[questionNum].createAnswerBtn();
  createAddEvents();
  subTitleVal.textContent = `問題${num}`;
}
//答えを押した後
function replyQuiz(event) {
  if (num >= 10) {
    const answerList = document.querySelector('.answer-list');
    btnWrap.removeChild(answerList);
    for (let i = infoWrap.childNodes.length; i > 0; i--) {
      const child = infoWrap.childNodes[i - 1];
      infoWrap.removeChild(child);
    }
    subTitleVal.textContent = `あなたの正答数は${correctAnswerCount}です。`;
    messageVal.textContent =
      '再チャレンジする場合は～開始ボタン～を押してください。';
    startBtn.style.display = 'block';
    startBtn.textContent = 'ホームに戻る';
    startBtn.addEventListener('click', restartQuiz);
  } else {
    if (event.target.textContent === quizes[questionNum].correctAnswer) {
      correctAnswerCount++;
    }
    subTitleVal.textContent = `問題${++num}`;
    for (let i = infoWrap.childNodes.length; i > 0; i--) {
      const child = infoWrap.childNodes[i - 1];
      infoWrap.removeChild(child);
    }
    const answerList = document.querySelector('.answer-list');
    btnWrap.removeChild(answerList);

    quizes[++questionNum].showQuiz();
    quizes[questionNum].createAnswerBtn();
    createAddEvents();
  }
}

//各ボタンにaddEventの追加
function createAddEvents() {
  const answerBtns = document.getElementsByClassName('answer-btn');
  for (let i = 0; i < answerBtns.length; i++) {
    const answerBtn = answerBtns[i];
    answerBtn.addEventListener('click', replyQuiz);
  }
}
//リスタートするボタン
function restartQuiz() {
  window.location.reload();
}
