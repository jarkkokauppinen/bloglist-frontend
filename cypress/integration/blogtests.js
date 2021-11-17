beforeEach(function() {
  cy.request('POST', 'http://localhost:3003/api/testing/reset')
  const user = {
    name: 'Repe',
    username: 'repe96',
    password: '1234'
  }
  cy.request('POST', 'http://localhost:3003/api/users/', user)
  cy.visit('http://localhost:3000')
})

describe('Blog App', () => {
  it('Login form is shown', function() {
    cy.contains('blogs')
    cy.contains('Log in to application')
  })
})

describe('Login', function() {
  it('succeeds with correct credentials', function() {
    cy.get('#username').type('repe96')
    cy.get('#password').type('1234')
    cy.contains('login').click()
    cy.contains('Repe logged in')
  })

  it('fails with wrong credentials', function() {
    cy.get('#username').type('repe96')
    cy.get('#password').type('wrong password')
    cy.contains('login').click()
    cy.get('#message').contains('wrong username or password')
  })
})

describe('When logged in', function() {
  beforeEach(function() {
    cy.get('#username').type('repe96')
    cy.get('#password').type('1234')
    cy.contains('login').click()
  })

  it('A blog can be created', function() {
    cy.contains('create new blog').click()
    cy.get('#title').type('something')
    cy.get('#author').type('something')
    cy.get('#url').type('something')
    cy.get('#createNew').click()
    cy.contains('something')
  })

  it('push like button', function() {
    cy.contains('create new blog').click()
    cy.get('#title').type('something')
    cy.get('#author').type('something')
    cy.get('#url').type('something')
    cy.get('#createNew').click()
    cy.get('.view').click()
    cy.get('.like').click()
  })

  it('remove blog', function() {
    cy.contains('create new blog').click()
    cy.get('#title').type('something')
    cy.get('#author').type('something')
    cy.get('#url').type('something')
    cy.get('#createNew').click()
    cy.get('.view').click()
    cy.get('.remove').click()
  })
})