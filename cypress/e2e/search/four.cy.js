// Importing lodash to use _.sample() to randomly select a value from an array
const { _ } = Cypress;

// Equivalence Partitioning Classes
const belowMaxValues = ["Refrigerador Dúplex Samsung 22 cúbicos RS22T5561B1"]

describe('Testing search bar functionality', () => {
  // We want to visit home before each test and have state reset
  beforeEach(() => {
    // Visiting home
    cy.home()
  })


  it('Search accepts a string of 50 chars max', () => {
    let sampleBelowMax = _.sample(belowMaxValues)
    cy.log(sampleBelowMax)
    // Max character input is allowed
    cy.get('#mainSearchbar').type(`${sampleBelowMax}`)
    cy.get('.icon-zoom').click()

    cy.get('ul[class="m-product__listingPlp"]')
      .children()
      .should('have.length.above', 0)
  })

})