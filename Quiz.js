class Quiz {
  //エレメントの取得
  constructor(quiz) {
    this.category = quiz.category;
    this.difficulty = quiz.difficulty;
    this.correctAnswer = quiz.correct_answer;
    this.incorrectAnswers = quiz.incorrect_answers;
    this.question = quiz.question;
  }
  //クイズの表示
  showQuiz() {
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
  }

  //答えるボタンの作成
  createAnswerBtn() {
    //クイズを配列に入れる。
    let questionItems = [this.correctAnswer];
    for (let i = 0; i < this.incorrectAnswers.length; i++) {
      const questionItem = this.incorrectAnswers[i];
      questionItems.push(questionItem);
    }
    //ボタンを配置するエリア
    const answerWrap = document.getElementById('btn-wrap');
    const answerList = document.createElement('ul');
    answerList.className = 'answer-list';
    answerWrap.appendChild(answerList);

    this._shuffleAnswer(questionItems);

    for (let i = 0; i < questionItems.length; i++) {
      const answerVal = questionItems[i];
      const answerItem = document.createElement('li');
      const answerBtn = document.createElement('button');
      answerBtn.className = 'answer-btn';
      answerBtn.textContent = answerVal;
      answerList.appendChild(answerItem);
      answerItem.appendChild(answerBtn);
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
}
