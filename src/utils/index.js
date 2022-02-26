/**
 * handle Operators
 */
export const handleAnswers = (operator, number1, number2) => {
  if (operator === "+") {
    return Number(number1) + Number(number2);
  }
  if (operator === "-") {
    return Number(number1) - Number(number2);
  }
  if (operator === "/") {
    return Number(number1) / Number(number2);
  }
  if (operator === "*") {
    return Number(number1) * Number(number2);
  }
};
