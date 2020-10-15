
const quizCreate = new QuizCreate(
  'start-btn',
  'sub-title',
  'message',
  'btn-wrap',
  'info',
  );
quizCreate.startBtn.addEventListener('click', quizCreate.startQuiz.bind(quizCreate));






