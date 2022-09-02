// Importing lodash to use _.sample() to randomly select a value from an array
const { _ } = Cypress;

// Equivalence Partitioning Classes
const maxValues = ["Consola Xbox Series S de 512 GB edicion stand alone"]


describe('Testing search bar functionality', () => {
  // We want to visit home before each test and have state reset
  beforeEach(() => {
    // Visiting home
    cy.home()
  })

  it('Search bar disables typing at >50 characters', () => {
    let sampleMax = _.sample(maxValues)
    let expectedString = sampleMax.slice(0, -1)

    // Max character input is allowed
    cy.get('#mainSearchbar')
      .type(`${sampleMax}`)
      .should('have.value', expectedString)

    // I actually wanted to have a way to check the value length
    // because it will not work if text greater than 51 chars is entered

  })

})