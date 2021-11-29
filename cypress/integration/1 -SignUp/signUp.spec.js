/* eslint-disable no-undef */
import createUser from "../../factories/userFactory";


describe('SignUp', () => {
    const baseURL = 'http://localhost:3000';
    const user = createUser();

    it('Should be abble to go to sign-up page', () => {
        cy.viewport(375, 700)
        cy.visit(baseURL);
        cy.wait(700);

        cy.get("p.toggler").click()
        cy.wait(700)

        cy.url().should("equal", `${baseURL}/sign-up`)
    })

    it('Should be abble to return to sign-in page', () => {
        cy.viewport(375, 700)
        cy.visit(`${baseURL}/sign-up`)
        cy.wait(700);

        cy.get("p.toggler").click()
        cy.wait(300)

        cy.url().should("equal", `${baseURL}/`)
    })

    it("Should be able to register if correct form", () => {
        cy.viewport(375, 700)
        cy.visit(`${baseURL}/sign-up`)
        cy.wait(700);

        cy.register(user.name, user.email, user.password);
        cy.url().should("equal", `${baseURL}/`)
    })

    it("Shouldn't be able to register if already registered user", () => {
        cy.viewport(375, 700)
        cy.visit(`${baseURL}/sign-up`)
        cy.wait(700);

        cy.register(user.name, user.email, user.password);
        cy.url().should("equal", `${baseURL}/sign-up`)
    })
})