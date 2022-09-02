// Importing lodash to use _.sample() to randomly select a value from an array
const { _ } = Cypress;

// Equivalence Partitioning Classes
const validValues = ["tenis", "cocina", "cama", "juegos"]

describe('Testing search bar functionality', () => {
  // We want to visit home before each test and have state reset
  beforeEach(() => {
    // Visiting home
    cy.home()
  })

  it('Search bar displays related items', () => {

    // Getting a random value from an array by using lodash
    let sampleValid = _.sample(validValues)

    cy.get('#mainSearchbar').type(`${sampleValid}`)
    cy.get('.icon-zoom').click()
    cy.location().should(loc => {
      expect(loc.search).to.eq(`?s=${sampleValid}`)
    })

    // Search bar is cleared
    cy.get('#mainSearchbar').should('have.attr', 'value', '')

    // Have items shown
    cy.get('ul[class="m-product__listingPlp"]')
      .children()
      .should('have.length.above', 0)

  })

})