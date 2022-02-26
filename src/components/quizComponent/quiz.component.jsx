import { useEffect, useState } from "react";
import { quizData } from "../../quizData";
import { handleAnswers } from "../../utils";
import "./style.css";

function QuizComponent({
  allResult,
  setAllResult,
  allAnswers,
  setAllAnswers,
  count,
  setCount
}) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [number1, setNumber1] = useState();
  const [number2, setNumber2] = useState();
  const [operator, setOperator] = useState();
  const [inputData, setInputData] = useState("");
  const [submit, setSubmit] = useState(false);
  const [allQuestions, setAllQuestions] = useState();

  /**
   * function to generate random numbers
   * @param {*} min
   * @param {*} max
   */
  const generateNumber = (min, max) => {
    if (min === max) {
      return min;
    }

    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  /**
   * function to generate random operators
   * @param {*} arrOperators
   */

  const generateOperator = (arrOperators) => {
    let iRandom = Math.floor(Math.random() * arrOperators.length);
    setOperator(arrOperators[iRandom]);
  };

  /**
   * runs only once when page load
   */
  useEffect(() => {
    setNumber1(generateNumber(0, 9));
    setNumber2(generateNumber(0, 9));
    generateOperator(["+", "-", "*", "/"]);
    setSubmit(false);
    setCurrentIndex(1);
  }, []);

  /**
   * function to handle input field changes
   * @param {*} e
   */
  const handleChange = (e) => {
    setInputData(e.target.value);
  };

  /**
   * function runs on click of next button
   */

  const handleNext = () => {
    setCurrentIndex((prevState) => prevState + 1);
    setNumber1(generateNumber(0, 9));
    setNumber2(generateNumber(0, 9));
    generateOperator(["+", "-", "*", "/"]);
    setAllAnswers([
      ...allAnswers,
      {
        originalAns: handleAnswers(operator, number1, number2),
        operator: operator,
        num1: number1,
        num2: number2,
        index: [currentIndex]
      }
    ]);
    setAllResult([...allResult, { userAns: inputData, index: [currentIndex] }]);
    setInputData("");
    if (currentIndex === 5) {
      setSubmit(true);
    }
  };

  /**
   * used to display the final  result
   */

  const handleResult = () => {
    const res = allAnswers.map((el1) => ({
      index: el1.index,
      operator: el1.operator,
      num1: el1.num1,
      num2: el1.num2,
      match: allResult.some((el2) => parseInt(el2.userAns) === el1.originalAns)
    }));
    setAllQuestions(res);
    const matchData = res.filter((item) => item.match === true);
    setCount(matchData.length);
  };

  useEffect(() => {
    handleResult();
  }, [currentIndex]);

  useEffect(() => {
    handleResult();
  }, [submit]);

  return (
    <>
      <div className="quizContainer">
        {!submit ? (
          <>
            <div className="quiz-cont">
              <div className="box">{number1}</div>
              <div>{operator}</div>
              <div className="box">{number2}</div>
              <div className="add-margin">=</div>
              <input
                type="number"
                onChange={handleChange}
                className="input-field"
                value={inputData}
              />
            </div>
            <div className="top-margin">Total Correct Answers:{count}</div>
          </>
        ) : (
          <>
            {allQuestions?.map((item) => {
              return (
                <div className={`flex ${!item.match && "bg-color"}`}>
                  <div className="padding">{item.num1}</div>
                  <div>{item?.operator}</div>
                  <div className="padding">{item.num2}&nbsp;?</div>
                </div>
              );
            })}
            <div>Total Correct Answers:{count}</div>
          </>
        )}
        {!submit && (
          <button style={{ cursor: "pointer" }} onClick={handleNext}>
            {currentIndex === 5 ? "Submit" : "Next"}
          </button>
        )}
      </div>
    </>
  );
}

export default QuizComponent;
