import '@testing-library/cypress/add-commands';
import "../support/commands";

describe("Countries Application", () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it("display navigation bar correctly", () => {
        cy.findByRole("banner").should("exist");
        cy.findByRole("link", { name: "Home" }).should("exist");
        cy.findByRole("link", { name: "Countries" }).should("exist");
    });
    it("display countries page correctly", () => {
        cy.findByRole("link", { name: "Countries"}).click();
    });
    it("display login page correctly", () => {
        cy.findByRole("link", { name: "Login"}).click();
    });
    it("display country page details properly", () => {
        cy.findByRole("link", { name: "Countries"}).click();
    });
    it("shows a list of countries", () => {
        
    });

})