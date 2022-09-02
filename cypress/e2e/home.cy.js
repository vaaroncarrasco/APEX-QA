// Abstracting the urls into variables to make the code more readable
let logoUrl = "https://assetspwa.liverpool.com.mx/assets/images/logos/liverpool-logo.svg"
let socialUrls = [
  "https://distintivodigital.profeco.gob.mx/consulta.php?serie=da21dfa3022111",
  'https://www.facebook.com/liverpoolmexico',
  'https://twitter.com/LiverpoolMexico',
  'https://www.instagram.com/liverpool_mexico/'
]

// Testing home view without being logged in
describe('Home loads succesfully', () => {

  // No beforeEach needed since it's just one test

  it('Home content loads succesfully', () => {

    // Visiting home
    cy.home()

    // Logo and link to home
    cy.get('.a-header__logo').parent().should('have.attr', 'href', '/tienda/home#!')
    cy.get('.a-header__logo').should('have.attr', 'src', logoUrl)

    // Search bar
    cy.get('#mainSearchbar').should('have.attr', 'placeholder', 'Buscar...')

    cy.get('.order-lg-3').find('a').should('have.text', 'Mis Compras')
    cy.get('.order-lg-4').find('span').should('have.text', 'Iniciar sesión')
    cy.get('.order-lg-5').find('.a-header__bag').should('be.visible')

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
    // This will fail as one of the links has a typo
    /*
      class="icon-<div class="profeco_container"><a href="https://distintivodigital.profeco.gob.mx/consulta.php?serie=da21dfa3022111" class="a_profeco" target="_blank"><img cla="a_profeco_img" src="https://assetspwa.liverpool.com.mx/assets/images/distintivo_digital_da21dfa3022111.svg?dis"></a></div>"
    */
    cy.get('.a-footer__socialMedia').each((item, index) => {
      cy.get(item).should('have.attr', 'href', socialUrls[index])
    })

  })

})