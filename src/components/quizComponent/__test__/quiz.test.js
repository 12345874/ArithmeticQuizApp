import React from "react";
import QuizComponent from "../quiz.component";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

describe("create snapshot", () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {
      allResult: [],
      setAllResult: jest.fn(),
      allAnswers: [],
      setAllAnswers: jest.fn(),
      count: 0,
      setCount: jest.fn()
    };
    wrapper = shallow(<QuizComponent {...props} />);
  });

  it("renders without crashing", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should create an entry in component state", () => {
    const component = shallow(<QuizComponent {...props} />);
    const form = component.find("input");

    form.props().onChange({
      target: {
        name: "myName",
        value: "myValue"
      }
    });

    expect(component.state("input")).toBeDefined();
  });
});
