//login function
Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
      username, password
    }).then(({ body }) => {
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
      cy.visit('http://localhost:3000')
    })
  })
  
//create user
Cypress.Commands.add('createUser', ({ name,username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/users', {
      name,username, password
    }).then(({ body }) => {
      cy.visit('http://localhost:3000')
    })
})


//create a Blog post
Cypress.Commands.add('createBlog', (blog) => {
  cy.request({
    url : 'http://localhost:3003/api/blogs',
    method : 'POST', 
    body : blog,
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`
    }
  }).then(({ body }) => {
    cy.visit('http://localhost:3000')
  })
})


//Add a couple of posts


////////////////////////////////////////////


describe('Blog app', function() {


    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.createUser({ name: 'costeira',username: 'costeira', password: 'password' })
        cy.visit('http://localhost:3000')
    })
    
    
    // (5.17) login in form is shown:
    it('Login form is shown', function() {
        cy.contains('Login').click()
        cy.get('#username').should('exist');
        cy.get('#password').should('exist');
        cy.contains('cancel').click()

    })

    // (5.18) Loging in the application successfully
    describe('Login',function() {

      it('Logging in the application', function() {
  
          cy.contains('Login').click()
          cy.get('#username').type('costeira')
          cy.get('#password').type('password')
          cy.get('#login-button').click()
          cy.contains('costeira logged in')
      
        })
  
      //wrong credentials:
      it('login fails with wrong password', function() {
  
          cy.contains('Login').click()
          cy.get('#username').type('costeira')
          cy.get('#password').type('wrongpassword')
          cy.get('#login-button').click()
  
          cy.get('.err')
            .should('contain', 'Wrong credentials')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')
  
  
          cy.get('html').should('not.contain', 'costeira logged in')
  
      })
    })

    // (5.19) Add a Blog
    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({username : 'costeira' , password : 'password' })
      })
  
      it('A blog can be created', function() {
        cy.contains('Add a new blog').click()
        cy.get('#title').type('Added a new blog via cypress')
        cy.get('#author').type('costeira')
        cy.get('#url').type('https://www.google.com')
        cy.get('#createBlog').click()
        cy.contains('Added a new blog via cypress')
      })

      describe('Like an Existing Post', function(){
        beforeEach(function(){
          const newBlog = {
            "title" : "Test Important Post",
            "url" : "https://www.google.pt/",
            "likes" : 10
        }
          cy.createBlog(newBlog)
        })

        it('Like the Post', function(){
          cy.contains('view').click()
          cy.get('.likeCounter').should('contain','10')
          cy.contains('like').click()
          cy.get('.likeCounter').should('contain','11')
        })
      })

      // 5.21) Delete a Blog
      describe('Delete an Existing BlogPost', function(){
        beforeEach(function(){
          const newBlog = {
            "title" : "Test Important Post",
            "url" : "https://www.google.pt/",
            "likes" : 10
        }
          cy.createBlog(newBlog)
        })
        it('Creator can delete their own Blogposts', function(){
          cy.contains('view').click()
          cy.get('html').should('contain', 'Test Important Post')
          cy.contains('remove').click()
          cy.get('html').should('not.contain', 'Test Important Post')
        })

        it("Other User Can't Delete it", function(){
          cy.contains('Logout').click()
          cy.createUser({ name: 'someoneElse',username: 'someoneElse', password: 'password' })
          cy.login({ username: 'someoneElse', password: 'password' })
          cy.contains('view').click()
          cy.get('#remove-blog-btn').should('not.exist')
        })
      })

      // 5.22) Post are sorted by the number of likes:
      describe('Blogs are sorted by likes', function(){

        const least = {
          "title" : "Blog with least likes",
          "url" : "https://www.google.pt/",
          "likes" : 10
        }

        const middle = {
          "title" : "Middle one",
          "url" : "https://www.google.pt/",
          "likes" : 15
        }

        const biggest={
          "title" : "Most liked",
          "url" : "https://www.google.pt/",
          "likes" : 20
        }

        beforeEach(function(){

          cy.createBlog(least)
          cy.createBlog(middle)
          cy.createBlog(biggest)

        })

        it('Blogs are sorted by likes', function(){
          cy.get('.blog-card').eq(0).contains(biggest.title)
          cy.get('.blog-card').eq(1).contains(middle.title)
          cy.get('.blog-card').eq(2).contains(least.title)
        })
      })

    })

  })