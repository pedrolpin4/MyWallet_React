/* eslint-disable no-undef */

Cypress.Commands.add('register', (username, email, password) => {
    cy.visit('http://localhost:3000/sign-up');
  
    cy.get("input[placeholder=Name]").type(username)
        cy.get("input[placeholder=Email]").type(email)
        cy.get("input[placeholder=Password]").type(password)
        cy.get("input[placeholder='Confirm your password']").type(password)
  
    cy.get('.register').click();
    cy.wait(500);
});
  
Cypress.Commands.add('login', (email, password) => {
    cy.visit('http://localhost:3000/');

    cy.get("input[placeholder=Email]").type(email)
    cy.get("input[placeholder=Password]").type(password)
    cy.get('.login').click();
    cy.wait(500);
});

Cypress.Commands.add('goToCashFlow', (username, email, password) => {
    cy.register(username, email, password);
    cy.login(email, password);
});