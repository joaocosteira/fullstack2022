Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

describe('Login and add Blog', function() {
    beforeEach(function() {
      /**
       *     
       * //clear the backend
       * cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'root',
            username: 'root',
            password: 'password'
        }
        //create a new user
        cy.request('POST', 'http://localhost:3003/api/users/', user) 
       */

      //Login via the UI
      /*       
      cy.visit('http://localhost:3000')
      cy.contains('Login').click()
      cy.get('input:first').type('costeira')
      cy.get('input:last').type('password')
      cy.get('#login-button').click() 
      */

      //Bypass it by going to the backend:
/*       cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'costeira', password: 'password'
      }).then(response => {
        localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      }) */

      //Other option is defining commands:
      cy.login({ username: 'costeira', password: 'password' })


    })
  
    it('Add Blog Post', function() {
      //cy.visit('http://localhost:3000')
      cy.contains('Add a new blog').click()
      cy.get('#title').type('Added a new blog via cypressnew blog to add')
      cy.get('#author').type('costeira')
      cy.get('#url').type('https://www.google.com')
      //cy.contains('test new costeira')
      cy.get('#createBlog').click()
      cy.contains('Added a new blog via cypress')
      
    })
  
  
  
  })