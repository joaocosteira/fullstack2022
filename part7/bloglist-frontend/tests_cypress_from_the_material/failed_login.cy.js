describe("Failed Login", function () {
  it.only("login fails with wrong password", function () {
    cy.visit("http://localhost:3000");
    cy.contains("Login").click();
    cy.get("input:first").type("costeira");
    //cy.get('input:last').type('wrongpassword')
    cy.get("#login-button").click();
    /*      
        cy.get('.err').contains('Wrong credentials')
        cy.get('.err').should('contain', 'Wrong credentials')
        cy.get('.err').should('have.css', 'color', 'rgb(255, 0, 0)')
        cy.get('.err').should('have.css', 'border-style', 'solid')
        */

    //Instead of a bunch if gets, we can chain them...
    /*      
        cy.get('.err')
            .contains('Wrong credentials')
            .should('contain', 'Wrong credentials')
            .should('have.css', 'color', 'rgb(255, 0, 0)')
            .should('have.css', 'border-style', 'solid') 
        */

    cy.get(".err")
      .should("contain", "Wrong credentials")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");

    cy.get("html").should("not.contain", "costeira logged in");
  });
});
