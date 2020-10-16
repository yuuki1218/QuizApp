const startBtn = document.getElementById('start-btn');
const subTitleVal = document.getElementById('sub-title');
const messageVal = document.getElementById('message');

fetch('https://opentdb.com/api.php?amount=10')
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('読み込みエラーです。');
    }
  })
  .then((json) => {
    const quizes = [];
    for (let i = 0; i < json.results.length; i++) {
      const quiz = new Quiz(json.results[i]);
      quizes.push(quiz);

    }
    function startQuiz() {
      //開始ボタン非表示
      startBtn.style.display = 'none';
  
      //ロード中のメッセージ・タイトルの変更
      subTitleVal.textContent = '取得中';
      messageVal.textContent = '少々お待ち下さい・・・';
      
      quizes[0].showQuiz(quizes);
      // console.log(quizes);
    }
    startBtn.addEventListener('click', startQuiz.bind(this));
  });
