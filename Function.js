class Function {
  constructor(url) {
    this.url = url;
    this.quizes = [];
    this.questionNum = 0;
    this.num = 1;
    this.correctAnswerCount = 0;
  }
  getQuizApi() {
    fetch(this.url)
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
          this.quizes.push(quiz);
        }
        //開始ボタン非表示
        startBtn.style.display = 'none';

        //ロード中のメッセージ・タイトルの変更
        subTitleVal.textContent = '取得中';
        messageVal.textContent = '少々お待ち下さい・・・';
        window.setTimeout(this._firstQuiz.bind(this), 2000);
        
      });
  }
  //最初の問題
  _firstQuiz() {
    this.quizes[this.questionNum].showQuiz();
    this.quizes[this.questionNum].createAnswerBtn();
    this._createAddEvents();
    subTitleVal.textContent = `問題${this.num}`;
  }
  //答えを押した後
  _replyQuiz(event) {
    if (this.num >= 10) {
      const answerList = document.querySelector('.answer-list');
      btnWrap.removeChild(answerList);
      for (let i = infoWrap.childNodes.length; i > 0; i--) {
        const child = infoWrap.childNodes[i - 1];
        infoWrap.removeChild(child);
      }
      subTitleVal.textContent = `あなたの正答数は${this.correctAnswerCount}です。`;
      messageVal.textContent =
        '再チャレンジする場合は～開始ボタン～を押してください。';
      startBtn.style.display = 'block';
      startBtn.textContent = 'ホームに戻る';
      startBtn.addEventListener('click', this._restartQuiz);
    } else {
      if (
        event.target.textContent === this.quizes[this.questionNum].correctAnswer
      ) {
        this.correctAnswerCount++;
      }
      subTitleVal.textContent = `問題${++this.num}`;
      for (let i = infoWrap.childNodes.length; i > 0; i--) {
        const child = infoWrap.childNodes[i - 1];
        infoWrap.removeChild(child);
      }
      const answerList = document.querySelector('.answer-list');
      btnWrap.removeChild(answerList);

      this.quizes[++this.questionNum].showQuiz();
      this.quizes[this.questionNum].createAnswerBtn();
      this._createAddEvents();
    }
  }

  //各ボタンにaddEventの追加
  _createAddEvents() {
    const answerBtns = document.getElementsByClassName('answer-btn');
    for (let i = 0; i < answerBtns.length; i++) {
      const answerBtn = answerBtns[i];
      answerBtn.addEventListener('click', this._replyQuiz.bind(this));
    }
  }
  //リスタートするボタン
  _restartQuiz() {
    window.location.reload();
  }
}
