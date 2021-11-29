/* eslint-disable no-undef */
import createUser from "../../factories/userFactory";

describe('SignIn', () => {
    const baseURL = 'http://localhost:3000';
    const user = createUser();

    it("Shouldn't be abble to go to sign-in if not registered user", () => {
        cy.viewport(375, 700)
        cy.visit(baseURL);
        cy.wait(700);

        cy.login(user.email, user.password)

        cy.url().should("equal", `${baseURL}/`)
    });

    it("Shouldn't be abble to go to sign-in if wrong password", () => {
        cy.viewport(375, 700)
        cy.visit(baseURL);
        cy.wait(700);

        cy.register(user.name, user.email, user.password)
        cy.login(user.email, '1234567')

        cy.url().should("equal", `${baseURL}/`)
    });

    it("Should go to /cash-flow if has logged in successfully", () => {
        cy.viewport(375, 700)
        cy.visit(baseURL);
        cy.wait(700);

        cy.login(user.email, user.password)

        cy.url().should("equal", `${baseURL}/cash-flow`)
    });
})