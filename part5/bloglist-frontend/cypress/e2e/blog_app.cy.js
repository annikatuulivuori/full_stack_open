describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const testuser = {
      name: 'Test User',
      username: 'testuser',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', testuser)
    cy.visit('http://localhost:3000')
  })

  it('Frontpage can be opened'), function() {
    cy.contains('Blogs')
  }

  it('Login form is shown', function() {
    cy.contains('log in').click()
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('testuser')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('testuser logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('testuser')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.get('#username').type('testuser')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()
      })

      it('a blog can be created', function() {
        cy.get('#new-blog-button').click()
        cy.get('#title').type('React patterns')
        cy.get('#author').type('Michael Chan')
        cy.get('#url').type('https://reactpatterns.com/')

        cy.get('#create-blog-button').click()
        cy.contains('React Patterns by Michael Chan')
      })
    })
  })
})