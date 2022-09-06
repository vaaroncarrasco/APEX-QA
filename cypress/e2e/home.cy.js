describe('Home loads succesfully', () => {

  // Set in a higher scope so it can be accessed
  let fixtureLinks;

  // before() because it's only one test
  before(() => {
    cy.visit('/tienda/home');

    cy.fixture('links')
      .as('links')
      .then(links => fixtureLinks = links);

  });

  it('Home content loads succesfully', () => {

    // Logo href sends to home and logo src is correct
    cy.get('.a-header__logo')
      .parent()
      .should('have.attr', 'href', '/tienda/home#!');

    cy.get('.a-header__logo')
      .should('have.attr', 'src', fixtureLinks.logoUrl);

    // Search bar is displayed
    cy.get('#mainSearchbar')
      .should('have.attr', 'placeholder', 'Buscar...');

    // Navbar user-related links are displayed
    cy.get('.order-lg-3')
      .find('a')
      .should('have.text', 'Mis Compras');

    cy.get('.order-lg-4')
      .find('span')
      .should('have.text', 'Iniciar sesión');

    cy.get('.order-lg-5')
      .find('.a-header__bag')
      .should('be.visible');

    // Banners
    cy.get('div[id*="bannerNo-"]').each((item) => {
      cy.get(item).should('be.visible')
    })

    // Caroussels
    cy.get('div[id*="carouselNo-"]').each((item) => {
      cy.get(item)
        .find('a[class="carouselHeading-link"]')
        .should('have.attr', 'href')
        .and('match', /\/tienda/)
    })

    // Footer
    /*
      This will fail as one of the links has a typo:
        class="icon-<div class="profeco_container"
    */
    cy.get('.a-footer__socialMedia').each((item, index) => {
      cy.get(item).should('have.attr', 'href', fixtureLinks.socialUrls[index])
    })

  })

})