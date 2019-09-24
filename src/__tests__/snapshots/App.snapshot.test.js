import React from "react";
import renderer from "react-test-renderer";

// Test Component
import App from "../../App";

it("Should render with all the child components being empty", () => {
  const tree = renderer.create(<App />);

  expect(tree).toMatchSnapshot();
});
