// Importing lodash to use _.sample() to randomly select a value from an array
const { _ } = Cypress;

// Equivalence Partitioning Classes
const anormalValidValues = ["saborines", "$/_.-"]

describe('Testing search bar functionality', () => {
  // We want to visit home before each test and have state reset
  beforeEach(() => {
    // Visiting home
    cy.home()
  })

  it('Search should alert when no related items are found', () => {

    let sampleAnormal = _.sample(anormalValidValues)

    cy.get('#mainSearchbar').type(`${sampleAnormal}`)
    cy.get('.icon-zoom').click()

    cy.get('.o-nullproduct-title-query')
      .should('have.text', `Lo sentimos, no encontramos nada para "${sampleAnormal}"`)

  })

})