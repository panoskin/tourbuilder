describe("tourbuilder.js", () => {
  it("bundle should embed tour", () => {
    // given
    Cypress.on("window:before:load", (win) => {
      win.TOUR_ID = "63d3f0a782070112f2c24cd0";
      win.SCRIPT_SRC = "dist/tourbuilder.js";
    });

    // when
    cy.visit("http://localhost:8080/e2e.html");

    // then
    cy.get("iframe").should(
      "have.attr",
      "src",
      "//tour.tourbuilder.com/?id=tour&tour=63d3f0a782070112f2c24cd0"
    );
    cy.get("iframe").should(
      "have.attr",
      "allow",
      "accelerometer; clipboard-write; gyroscope; vr"
    );
  });

  it("minified bundle should embed tour", () => {
    Cypress.on("window:before:load", (win) => {
      win.TOUR_ID = "63d3f0a782070112f2c24cd0";
      win.SCRIPT_SRC = "dist/tourbuilder.min.js";
    });

    cy.visit("http://localhost:8080/e2e.html");

    // then
    cy.get("iframe").should(
      "have.attr",
      "src",
      "//tour.tourbuilder.com/?id=tour&tour=63d3f0a782070112f2c24cd0"
    );
    cy.get("iframe").should(
      "have.attr",
      "allow",
      "accelerometer; clipboard-write; gyroscope; vr"
    );
  });
});
