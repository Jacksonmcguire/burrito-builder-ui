describe('Burrito Builder', () => {

  beforeEach(() => {
    cy.fixture('orders').then(( data ) => {
      console.log(data)
      cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
        statusCode: 200,
        body: data,
      })
    })
    cy.fixture('post-order').then(( data ) => {
      console.log(data)
      cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
        statusCode: 200,
        body: data,
      }).as('post')      
    })
    cy.intercept('DELETE', 'http://localhost:3001/api/v1/orders/1', {fixture: 'orders'}).as('deleted')

    cy.visit('http://localhost:3000')
  })

  it('should allow a user to see a gallery of created orders on load', () => {
    cy.get('.order').contains('Pat')
  })

  it('should allow a user to select ingredients for their burrito', () => {
    cy.get('form').find('p').should('have.text', 'Order: Nothing selected')

    cy.get('button').contains('beans').click()
    cy.get('form').find('p').should('have.text', 'Order: beans')
  })

  it('should allow a user to enter their name for the order', () => {
    cy.get('input[name="name"]').should('have.value', '')

    cy.get('input[name="name"]').type('jan').should('have.value', 'jan')
  })

  it('should allow a user to submit their order if the inputs are filled out', () => {
    cy.get('input[name="name"]').type('jan').should('have.value', 'jan')
    cy.get('button').contains('beans').click()

    cy.get('button').contains('Submit Order').click()

    cy.wait('@post').its('response.body').then(({orders}) => {
      cy.expect(orders[0].name).to.deep.equal('janevieve')
    })
  })

  it('should tell a user to fill out the required inputs if the form is incomplete', () => {
    cy.get('button').contains('beans').click()
    cy.get('button').contains('Submit Order').click()

    cy.get('form').contains('you must give a name and at least one ingredient to place an order')
  })

  it('should allow a user to delete an order of their choice', () => {
    cy.get('.order').find('button').click()

    cy.wait('@deleted').its('response').then(data => {
      cy.expect(data.body.orders[0].name).to.deep.equal('Pat')
      cy.expect(data.statusCode).to.deep.equal(200)
    })
  })
})