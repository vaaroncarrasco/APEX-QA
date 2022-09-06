describe('Testing search bar functionality', () => {

  let fixtureItems;

  beforeEach(() => {
    cy.visit('/tienda/home');
    cy.fixture('items')
      .as('items')
      .then(items => fixtureItems = items);
  });

  it('Search should alert when no related items are found', () => {

    // Should fail when "  " (double space) is entered as it renders a diff view

    cy.searchBarUI(fixtureItems.anormalValid).then(value => {
      cy.get('.o-nullproduct-title-query')
        .should(
          'have.text',
          `Lo sentimos, no encontramos nada para "${value}"`
        );
    });

  })

  it('Search bar displays related items', () => {

    cy.searchBarUI(fixtureItems.normalValid).then(value => {
      cy.location().should(loc => {
        expect(loc.search).to.eq(`?s=${value}`);
      });

      // Search bar is cleared
      cy.get('#mainSearchbar')
        .should('have.attr', 'value', '')

      // Have items shown
      cy.get('ul[class="m-product__listingPlp"]')
        .children()
        .should('have.length.above', 0)
    });

  });

  it('Search bar is disabled on min and aboveMin values', () => {

    // Empty search bar -> min value = ""
    cy.get('.input-group-text > .icon-zoom')
      .click();

    cy.location('pathname')
      .should('eq', '/tienda/home');

    cy.get('#mainSearchbar')
      .focus()
      .type('{enter}')
      .should('have.attr', 'value', '');

    cy.searchBarUI(fixtureItems.aboveMin).then((value) => { // "a"|" "
      cy.location('pathname')
        .should('eq', '/tienda/home');

      cy.get('#mainSearchbar')
        .should('have.attr', 'value', value);
    });

  });

  it('Search accepts a string of 50 chars max', () => {

    cy.searchBarUI(fixtureItems.belowMax).then(() => {
      cy.get('ul[class="m-product__listingPlp"]')
        .children()
        .should('have.length.above', 0);
    });

  });

  it('Search bar disables typing at >50 characters', () => {

    cy.searchBarUI(fixtureItems.max).then(() => {
      cy.get('#mainSearchbar')
        .invoke('attr', 'value')
        .then(value => {
          expect(value.length).to.be.lessThan(51);
        });
    });

  });

});