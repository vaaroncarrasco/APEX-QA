const { _ } = Cypress; // lodash

Cypress.Commands.add('searchBarUI', (valueArr) => {
  let value = _.sample(valueArr);

  cy.get('#mainSearchbar').type(`${value}`)
  cy.get('.input-group-text > .icon-zoom').click();


  return cy.wrap(value);
})