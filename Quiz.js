class Quiz {
  //エレメントの取得
  constructor(quiz) {
    this.category = quiz.category;
    this.difficulty = quiz.difficulty;
    this.correctAnswer = quiz.correct_answer;
    this.incorrectAnswers = quiz.incorrect_answers;
    this.question = quiz.question;
    this.questionNumber = 1;
  }
  
  showQuiz(quizes) {
    //タイトル
    const subTitleVal = document.getElementById('sub-title');
    subTitleVal.textContent = `問題${this.questionNumber++}`;
    //質問
    const messageVal = document.getElementById('message');
    messageVal.textContent = `${this.question}`;

    //ジャンル・難易度
    const infoWrap = document.getElementById('info');
    const categoryArea = document.createElement('div');
    categoryArea.textContent = `[ジャンル]：${this.category}`;
    infoWrap.appendChild(categoryArea);
    const difficultyArea = document.createElement('div');
    difficultyArea.textContent = `[難易度]：${this.difficulty}`;
    infoWrap.appendChild(difficultyArea);

    //ボタンを配置するエリア
    const answerWrap = document.getElementById('btn-wrap');
    const answerList = document.createElement('ul');
    answerList.className = 'answer-list';
    answerWrap.appendChild(answerList);

    //クイズを配列に入れる。
    let questionItems = [this.correctAnswer];
    for (let i = 0; i < this.incorrectAnswers.length; i++) {
      const questionItem = this.incorrectAnswers[i];
      questionItems.push(questionItem);
    }
    this._shuffleAnswer(questionItems);

    for (let i = 0; i < questionItems.length; i++) {
      const answerVal = questionItems[i];
      const answerItem = document.createElement('li');
      const answerBtn = document.createElement('button');
      answerBtn.className = 'answer-btn';
      answerBtn.textContent = answerVal;
      answerList.appendChild(answerItem);
      answerItem.appendChild(answerBtn);
      //ボタンを押して答えた時
      answerBtn.addEventListener('click', this._replyQuestion.bind(this));
      answerBtn.param = {
        quizes: quizes,
        answerList: answerList,
        correctAnswer: this.correctAnswer,
        answerBtn: answerBtn.textContent,
        category: categoryArea,
        difficulty: difficultyArea,
      };
    }
  }
  //質問をシャッフルする
  _shuffleAnswer(questionItems) {
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
  _replyQuestion(event) {
    if (event.target.param.correctAnswer === event.target.param.answerBtn) {
      this.totalAnswer++;
    } else {
    }
    const answerWrap = document.getElementById('btn-wrap');
    const infoWrap = document.getElementById('info');
    answerWrap.removeChild(event.target.param.answerList);
    infoWrap.removeChild(event.target.param.category);
    infoWrap.removeChild(event.target.param.difficulty);
    event.target.param.quizes.shift();
    console.log(event.target.param.quizes);
    this.showQuiz();
  }
  //ホーム画面に戻る
  _restartQuiz() {
    window.location.reload();
  }
}