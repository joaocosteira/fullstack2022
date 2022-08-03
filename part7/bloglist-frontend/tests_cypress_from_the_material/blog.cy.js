describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    //cy.visit('http://localhost:3000')
    cy.contains('blogs')
    cy.contains('test new costeira')
  })

  it('Logging in the application', function() {
    //cy.visit('http://localhost:3000')
    cy.contains('Login').click()
/*     cy.get('input:first').type('costeira')
    cy.get('input:last').type('password')    
    cy.contains('login').click() */
    cy.get('#username').type('costeira')
    cy.get('#password').type('password')
    cy.get('#login-button').click()

    cy.contains('costeira logged in')

  })


})