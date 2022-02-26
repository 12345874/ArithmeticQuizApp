import { useState } from "react";
import QuizComponent from "./components/quizComponent/quiz.component";
import "./styles.css";

export default function App() {
  const [quiz1, setQuiz1] = useState(false);
  const [quiz2, setQuiz2] = useState(false);
  //handle Quiz1 user selected and pre-correct data
  const [allCorrectResult, setCorrectAllResult] = useState([]);
  const [allUserAnswers, setAllUserAnswers] = useState([]);
  const [count, setCount] = useState(0);
  const [quiz2Count, setQuizCount] = useState(0);

  //handle quiz2 user selected and pre-correct data

  const [quiz2AllCorrect, setQuiz2AllCorrect] = useState([]);
  const [quiz2UserSelected, setQuiz2UserSelected] = useState([]);

  /**
   * function used to handle the btn display
   */
  const handleQuiz1 = () => {
    setQuiz1(!quiz1);
  };

  const handleQuiz2 = () => {
    setQuiz2(!quiz2);
  };

  return (
    <div className="App">
      <div className="app-header">Quiz App</div>
      <div className="quiz-cont">
        <div className="quiz1-cont">
          <div className="quiz-title">QUIZ 1</div>
          <button className={`btn ${quiz1 && "hide"}`} onClick={handleQuiz1}>
            Start Quiz
          </button>
          {quiz1 && (
            <QuizComponent
              setAllAnswers={setAllUserAnswers}
              allAnswers={allUserAnswers}
              allResult={allCorrectResult}
              setAllResult={setCorrectAllResult}
              count={count}
              setCount={setCount}
            />
          )}
        </div>
        <div className="quiz2-cont">
          <div className="quiz-title">QUIZ 2</div>
          <button className={`btn ${quiz2 && "hide"}`} onClick={handleQuiz2}>
            Start Quiz
          </button>
          {quiz2 && (
            <QuizComponent
              setAllAnswers={setQuiz2UserSelected}
              allAnswers={quiz2UserSelected}
              allResult={quiz2AllCorrect}
              setAllResult={setQuiz2AllCorrect}
              count={quiz2Count}
              setCount={setQuizCount}
            />
          )}
        </div>
      </div>
    </div>
  );
}
