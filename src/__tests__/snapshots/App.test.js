import React from "react";
import { mount } from "enzyme";

// Test Component
import App from "../../App";
import NumberList from "../../components/NumberList";

const stateObject = {
  phoneNumbers: [
    "0760141312",
    "0733596874",
    "0738366684",
    "0793073538",
    "0772724273",
    "0775666955"
  ],
  maxNumber: "0793073538",
  minNumber: "0733596874"
};
const emptyStateObject = {
  phoneNumbers: [],
  maxNumber: "",
  minNumber: ""
};

describe("The App Component", () => {
  const wrapper = mount(<App />);
  wrapper.setState(emptyStateObject);

  it("Should not either render maximum or minimum number containers on initial render", () => {
    const minAndMaxNumDiv = wrapper.find(".card-container");
    expect(minAndMaxNumDiv.length).toBe(0);
  });

  it("Should render the list as empty on initial render", () => {
    const numbersList = wrapper.find(NumberList);
    expect(numbersList).toHaveLength(0);
  });
});

describe("The App component", () => {
  const wrapperWithState = mount(<App />);
  wrapperWithState.setState(stateObject);

  it("Should render the maximum number container and the maximum number when generated", () => {
    const maxNumDiv = wrapperWithState.find(".card-container").first();
    const maxNum = maxNumDiv
      .find("p")
      .last()
      .text();

    expect(maxNumDiv.length).toBe(1);
    expect(maxNum).toBe("00793073538");
  });

  it("Should render the minimum number container and the minimum number when generated", () => {
    const minNumDiv = wrapperWithState.find(".card-container").last();
    const minNum = minNumDiv
      .find("p")
      .last()
      .text();

    expect(minNumDiv.length).toBe(1);
    expect(minNum).toBe("00733596874");
  });

  it("Should render a list of available numbers from the state", () => {
    const numberListComponent = wrapperWithState.find(NumberList);
    const list = numberListComponent.find("li");

    expect(list).toHaveLength(6);
  });
});

describe("The App Component", () => {
  const wrapper = mount(<App />);
  wrapper.setState(emptyStateObject);

  it("Should generate the given random numbers when generate random number method is called with a value", () => {
    // 1st try
    wrapper.instance().generateRandomPhoneNumbers(10);
    const newPhoneNumbersState = wrapper.state().phoneNumbers;

    expect(newPhoneNumbersState.length).toBe(10);

    // 2nd try with a diff value
    wrapper.instance().generateRandomPhoneNumbers(5);
    const secPhoneNumbersState = wrapper.state().phoneNumbers;

    expect(secPhoneNumbersState.length).toBe(5);
  });

  it('Should delete generated numbers', () => {
    // Generate random numbers
    wrapper.instance().generateRandomPhoneNumbers(10);
    const newPhoneNumbersState = wrapper.state().phoneNumbers;
    expect(newPhoneNumbersState.length).toBe(10);

    // Delete the generated numbers
    wrapper.instance().deleteGeneratedNumbers()
    const emptyPhoneNumbersState = wrapper.state().phoneNumbers;
    expect(emptyPhoneNumbersState.length).toBe(0);
  })
});
