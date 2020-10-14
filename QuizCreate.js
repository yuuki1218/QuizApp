class QuizCreate {
  //エレメントの取得
  constructor(startBtn, subTitleVal, messageVal, answerWrap, infoWrap) {
    this.startBtn = document.getElementById(startBtn);
    this.subTitleVal = document.getElementById(subTitleVal);
    this.messageVal = document.getElementById(messageVal);
    this.answerWrap = document.getElementById(answerWrap);
    this.infoWrap = document.getElementById(infoWrap);
    this.questionNumber = 0;
    this.totalAnswer = 0;
  }
  startQuiz() {
    //開始ボタン非表示
    this.startBtn.style.display = 'none';

    //ロード中のメッセージ・タイトルの変更
    this.subTitleVal.textContent = '取得中';
    this.messageVal.textContent = '少々お待ち下さい・・・';

    //APIのテキストを取得・表示
    fetch('https://opentdb.com/api.php?amount=10')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('読み込みエラーです。');
        }
      })
      .then((json) => json.results)
      .then((results) => {
        this._showQuiz(results);
      });
  }
  //クイズを表示する
  _showQuiz(quiz) {
    //問題数が0になったとき
    console.log(this.subTitleVal);
    console.log(this.messageVal);
    if (quiz.length === 0) {
      this.questionNumber = 0;
      this.subTitleVal.textContent = `あなたの正答数は${this.totalAnswer}です。`;
      this.messageVal.textContent = `再チャレンジする場合は～開始ボタン～を押してください。`;
      this.startBtn.textContent = 'ホームに戻る';
      this.startBtn.style.display = 'block';

      this.startBtn.addEventListener('click', this._restartQuiz);
      return;
    }
    //問題数
    this.subTitleVal.textContent = `問題${this.questionNumber + 1}`;

    //質問
    this.messageVal.textContent = `${quiz[0].question}`;

    //ジャンル・難易度
    const category = document.createElement('div');
    category.textContent = `[ジャンル]：${quiz[0].category}`;
    this.infoWrap.appendChild(category);
    const difficulty = document.createElement('div');
    difficulty.textContent = `[難易度]：${quiz[0].difficulty}`;
    this.infoWrap.appendChild(difficulty);

    //正解
    const correctAnswer = quiz[0].correct_answer;

    //ボタンリストのラップ
    const answerList = document.createElement('ul');
    answerList.className = 'answer-list';
    this.answerWrap.appendChild(answerList);

    //クイズを配列に入れる。
    let questionItems = [quiz[0].correct_answer];
    for (let i = 0; i < quiz[0].incorrect_answers.length; i++) {
      const questionItem = quiz[0].incorrect_answers[i];
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
      answerBtn.addEventListener('click', {
        answerList: answerList,
        quiz: quiz,
        correct_answer: correctAnswer,
        answer_btn: answerBtn.textContent,
        category: category,
        difficulty: difficulty,
        handleEvent: this._replyQuestion,
        infoWrap: this.infoWrap,
        answerWrap: this.answerWrap,
        totalAnswer: this.totalAnswer,
        showQuiz: this._showQuiz
      });
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
  _replyQuestion() {
    if (this.correct_answer === this.answer_btn) {
      this.totalAnswer++;
      
    } else {
    }
    this.quiz.shift();
    this.answerWrap.removeChild(this.answerList);
    this.infoWrap.removeChild(this.category);
    this.infoWrap.removeChild(this.difficulty);
    this.showQuiz(this.quiz);
  }
  //ホーム画面に戻る
  _restartQuiz() {
    window.location.reload();
  }
}
