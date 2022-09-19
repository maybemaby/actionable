import cypress from "cypress";

const workflow = {
  name: "Cypress",
};

describe("Workflow form fillout", () => {
  beforeEach(() => {
    cy.visit("", {
      onBeforeLoad(win) {
        win.sessionStorage.clear();
      },
    });
  });
  it("Entering workflow name persists to tutorial", () => {
    cy.get("input[name=workflow-name]").type(workflow.name);
    cy.get("input[name=events]").should("be.visible");
    cy.visit("/tutorial");
    cy.contains("Start").click();
    cy.get("#name").should("be.visible");
    cy.get("input#name").should("have.value", workflow.name);
  });
  it("Entering Tutorial name workflow should persist to form", () => {
    cy.visit("/tutorial/1");
    cy.get("input#name").type(workflow.name);
    cy.visit("/");
    cy.get("input[name=workflow-name]").should("have.value", workflow.name);
    cy.get("input[name=events]").should("be.visible");
  });
  it("No workflow name should disable next", () => {
    cy.visit("/tutorial/1");
    cy.get("button[disabled]").should("be.visible");
  });

  describe("Event trigger field", () => {
    beforeEach(() => {
      cy.get("input[name=workflow-name]").type(workflow.name);
      cy.get("input[name=events]").should("be.visible");
    });
    it.only("Persists to tutorial", () => {
      // Open combobox and select first two items
      cy.get(".combobox-input").within(() => {
        cy.get("button").click();
      });
      cy.get("li").first().click();
      cy.get("ul>li").eq(1).click();
      // Check that two items have been toggled
      cy.get("[aria-selected=true]").should("have.length", 2);
      cy.get("section#event-filter").should("be.visible");
      // Check that combobox ccloses on esc
      cy.get(".combobox-input").type("{esc}");
      cy.get("ul").should("not.be.visible");
      // Confirm the event filter field has two selected
      cy.get("section#event-filter").within(() => {
        cy.get("[name=event-filter-select]").click();
        cy.get("ul>li").should("have.length", 2);
      });
      // Go to tutorial section and check that two items are selected again
      cy.contains("Tutorial Mode").click();
      cy.contains("Start").click();
      cy.contains("Next").click();
      cy.get(".combobox-input").within(() => {
        cy.get("button").click();
      });
      cy.get("[aria-selected=true]").should("have.length", 2);
    });
  });
});
