// Importing lodash to use _.sample() to randomly select a value from an array
const { _ } = Cypress;

// Equivalence Partitioning Classes
const aboveMinValues = [" ", ".", "a",]

const validValues = ["tenis", "cocina", "cama", "juegos"]

const anormalValidValues = ["saborines", "$/_.-"]

const belowMaxValues = ["Refrigerador Dúplex Samsung 22 cúbicos RS22T5561B1"]

const maxValues = ["Consola Xbox Series S de 512 GB edicion stand alone"]


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