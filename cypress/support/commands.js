const { _ } = Cypress; // lodash

Cypress.Commands.add('searchBarUI', (valueArr) => {
  let value = _.sample(valueArr);

  cy.get('#mainSearchbar')
    .type(`${value}{enter}`);

  return cy.wrap(value);

});