/* eslint-disable no-undef */
import createUser from "../../factories/userFactory";

describe('Transactions', () => {
    const baseURL = 'http://localhost:3000';
    const user = createUser();

    it("Shouldn't be abble to go to incomes page", () => {
        cy.viewport(375, 700)
        cy.wait(700);

        cy.goToCashFlow(user.name, user.email, user.password)
        cy.get(".income").click()

        cy.url().should("equal", `${baseURL}/incomes`)
    });

    it("Shouldn't be abble to go to expenses page", () => {
        cy.viewport(375, 700)
        cy.wait(700);

        cy.login(user.email, user.password)
        cy.get(".expense").click()

        cy.url().should("equal", `${baseURL}/expenses`)
    });

    it("Shouldn't be abble to return to cash-flow", () => {
        cy.viewport(375, 700)
        cy.wait(700);

        cy.login(user.email, user.password)
        cy.get(".expense").click()

        cy.get('.home').click()
        cy.url().should("equal", `${baseURL}/cash-flow`)
    });

    it("Shouldn't be abble to register an expense if no value", () => {
        cy.viewport(375, 700)
        cy.wait(700);

        cy.login(user.email, user.password)
        cy.get(".expense").click()

        cy.get("input[placeholder='Description']").type('dad gave me')

        cy.contains("Save").click();
        cy.wait(700);

        cy.url().should("equal", `${baseURL}/expenses`)
    });

    it("Should be abble to register an expense if positive value", () => {
        cy.viewport(375, 700)
        cy.wait(700);

        cy.login(user.email, user.password)
        cy.get(".expense").click()

        cy.get(".currency").type(5000)
        cy.get("input[placeholder='Description']").type('dad gave me')

        cy.contains("Save").click();
        cy.wait(1000);

        cy.url().should("equal", `${baseURL}/cash-flow`)
    });

    it("Should be abble to register an income if positive value", () => {
        cy.viewport(375, 700)
        cy.wait(700);

        cy.login(user.email, user.password)
        cy.get(".income").click()

        cy.get(".currency").type(5000)
        cy.get("input[placeholder='Description']").type('candys')

        cy.contains("Save").click();
        cy.wait(1000);

        cy.url().should("equal", `${baseURL}/cash-flow`)
    });

    it("Should be abble to logOut", () => {
        cy.viewport(375, 700)
        cy.login(user.email, user.password)
        cy.get(".menu").click()
        cy.wait(700)

        cy.contains("LOGOUT").click();
        cy.wait(700)
        cy.url().should("equal", `${baseURL}/`)
    })
})