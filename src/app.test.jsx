import React from "react";
import App from "./App";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

describe("create snapshot", () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {};
    wrapper = shallow(<App {...props} />);
  });

  it("renders without crashing", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
