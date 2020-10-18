const startBtn = document.getElementById('start-btn');
const subTitleVal = document.getElementById('sub-title');
const messageVal = document.getElementById('message');
const infoWrap = document.getElementById('info');
const btnWrap = document.getElementById('btn-wrap');

const quizFunction = new Function('https://opentdb.com/api.php?amount=10');
startBtn.addEventListener('click', quizFunction.getQuizApi.bind(quizFunction));

