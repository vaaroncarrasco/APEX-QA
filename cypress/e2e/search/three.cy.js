// Importing lodash to use _.sample() to randomly select a value from an array
const { _ } = Cypress;

// Equivalence Partitioning Classes
const aboveMinValues = [" ", ".", "a",]

describe('Testing search bar functionality', () => {
  // We want to visit home before each test and have state reset
  beforeEach(() => {
    // Visiting home
    cy.home()
  })

  it('Search bar is disabled on invalid values', () => {

    cy.get('.icon-zoom').click()
    cy.location('pathname').should('eq', '/tienda/home')

    cy.get('#mainSearchbar')
      .focus()
      .type('{enter}')
      .should('have.attr', 'value', '')

    cy.location('pathname').should('eq', '/tienda/home')

    cy.get('#mainSearchbar').type(`${_.sample(aboveMinValues)}{enter}`)
    cy.location('pathname').should('eq', '/tienda/home')

  })

})