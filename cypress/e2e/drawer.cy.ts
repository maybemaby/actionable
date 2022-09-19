import cypress from "cypress";

describe("Drawer spec", () => {
  it("Opens drawer on click", () => {
    cy.visit("");
    cy.contains("Actionable");
    cy.get("header button").click();
    cy.focused().parent().contains("name:");
  });

  it("Focuses close button on open and closes on press", () => {
    cy.visit("");
    cy.get("header button").click();
    cy.focused().type("{enter}");
    cy.contains("name:").should("not.exist");
  });

  it("Closes on outside click", () => {
    cy.visit("");
    cy.get("header button").click();
    cy.focused().parent().parent().click({ force: true });
    cy.contains("name:").should("not.exist");
  });
});
