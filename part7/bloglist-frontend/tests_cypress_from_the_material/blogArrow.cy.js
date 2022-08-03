describe('Blog app', () => {
    it('front page can be opened', () => {
      cy.visit('http://localhost:3000')
      cy.contains('blogs')
      cy.contains('test new costeira')
    })

    //something to fail...
    it('front page contains random text', function() {
        cy.visit('http://localhost:3000')
        //cy.contains('wtf is this app?')
      })
})