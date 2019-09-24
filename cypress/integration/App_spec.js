/* eslint no-undef: 0 */

describe("App Component", function() {
  beforeEach(() => {
    cy.visit("/");
  });

  context("App Terminal", () => {
    const genCommand = "gen 5";
    const delCommand = "del";
    const helpCommand = "help";
    const clearCommand = "clear";
    const nonExistentCommand = "nonExistent";

    it("Should accept input", function() {
      cy.get("input")
        .type(genCommand)
        .should("have.value", genCommand);
    });

    it("Should generate given phone numbers when given an input", function() {
      cy.get("input")
        .type(genCommand)
        .type("{enter}");

      cy.get(".right-section ul li").should("have.length", 5);
    });

    it("Should save the phone numbers to the local Storage", function() {
      cy.get("input")
        .type(genCommand)
        .type("{enter}");

      cy.get(".right-section ul li").should("have.length", 5);
      cy.window()
        .its("localStorage")
        .invoke("getItem", "phoneNumbers")
        .should("exist");
    });

    it("Should delete the phone numbers when del command is typed", function() {
      cy.get("input")
        .type(delCommand)
        .type("{enter}");

      cy.get(".right-section ul li").should("have.length", 0);
    });

    it("Should delete the phone numbers from the local Storage", function() {
      cy.get("input")
        .type(genCommand)
        .type("{enter}");

      cy.get(".right-section ul li").should("have.length", 5);
      cy.window()
        .its("localStorage")
        .invoke("getItem", "phoneNumbers")
        .should("exist");
    });

    it("Should generate the terminal commands when help is typed", function() {
      cy.get("input")
        .type(helpCommand)
        .type("{enter}");

      cy.get(".left-section p").should("have.length", 8);
      cy.get(".left-section p").should(
        "contain",
        "help - Show a list of available commands."
      );
      cy.get(".left-section p").should(
        "contain",
        "clear - Empty the terminal window."
      );
      cy.get(".left-section p").should(
        "contain",
        "gen - Generate a list of phone numbers - gen number"
      );
      cy.get(".left-section p").should(
        "contain",
        "del - Delete a list of phone numbers - del"
      );
    });

    it("Should clear the terminal console when clear is typed", function() {
      cy.get("input")
        .type(clearCommand)
        .type("{enter}");

      cy.get(".left-section p").should("have.length", 0);
    });

    it("Should display Command  not found! when a non existent command is typed", function() {
      cy.get("input")
        .type(nonExistentCommand)
        .type("{enter}");

      cy.get(".left-section p").should(
        "contain",
        "Command 'nonExistent' not found!"
      );
    });
  });
});
