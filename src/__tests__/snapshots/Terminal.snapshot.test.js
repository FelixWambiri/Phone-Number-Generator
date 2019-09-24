import React from "react";
import renderer from "react-test-renderer";

// Test Component
import AppTerminal from "../../components/Terminal";

it("Should render with a welcome message", () => {
  // tree: component that represents the output of rendering our Page/component
  const tree = renderer.create(
    <AppTerminal
      generatePhoneNumbers={jest.fn()}
      deleteGeneratedNumbers={jest.fn()}
    />
  );

  expect(tree).toMatchSnapshot();
});
