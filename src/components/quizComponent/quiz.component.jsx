import { useEffect, useState } from "react";
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
    operator === "/"
      ? setNumber2(generateNumber(1, 9))
      : setNumber2(generateNumber(0, 9));
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
   * round the decimal number upto two places
   * @param {*} num
   */

  function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
  }

  /**
   * function runs on click of next button handles user input and pre-answer value
   */

  const handleNext = () => {
    setCurrentIndex((prevState) => prevState + 1);
    setNumber1(generateNumber(0, 9));
    operator === "/"
      ? setNumber2(generateNumber(1, 9))
      : setNumber2(generateNumber(0, 9));
    generateOperator(["+", "-", "*", "/"]);
    setAllAnswers([
      ...allAnswers,
      {
        originalAns: roundToTwo(handleAnswers(operator, number1, number2)),
        operator: operator,
        num1: number1,
        num2: number2,
        index: [currentIndex]
      }
    ]);
    setAllResult([
      ...allResult,
      {
        userAns: inputData.length ? roundToTwo(parseInt(inputData)) : "",
        index: [currentIndex]
      }
    ]);
    setInputData("");
    if (currentIndex === 20) {
      setSubmit(true);
    }
  };

  /**
   * used to display the final  result , compares the two array of objects and return a new array of objects with correct and incorrect values..
   */

  const handleResult = () => {
    const res = allAnswers.map((el1) => ({
      index: el1.index,
      operator: el1.operator,
      num1: el1.num1,
      num2: el1.num2,
      match: allResult.some((el2) =>
        parseInt(el2.userAns) === ""
          ? false
          : parseInt(el2.userAns) === el1.originalAns
      )
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
        <div>Note: Please enter value only till to decimal places.</div>
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
            <div className="top-margin">
              Total Correct Answers:{count}/{allAnswers?.length}
            </div>
          </>
        ) : (
          <>
            {allQuestions?.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`flex ${!item.match && "bg-color"}`}
                >
                  <div className="padding">{item.num1}</div>
                  <div>{item?.operator}</div>
                  <div className="padding">{item.num2}&nbsp;?</div>
                </div>
              );
            })}
            <div>
              Total Correct Answers:{count}/{allQuestions?.length}
            </div>
          </>
        )}
        {!submit && (
          <button
            style={{ cursor: "pointer" }}
            className={`${currentIndex < 20 && "btn"}`}
            onClick={handleNext}
          >
            {currentIndex === 20 ? "Submit" : "Next"}
          </button>
        )}
      </div>
    </>
  );
}

export default QuizComponent;
