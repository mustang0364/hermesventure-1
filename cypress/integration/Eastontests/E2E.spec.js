beforeEach(() => {
    cy.visit('/');
});
describe ('First Test', () => {
    it ('is working', () => {
      expect (true).to.equal (true);
    });
  });
describe ('Start Test', () => {
it ('Visit the app', () => {
});
});
describe ('Simple get', () => {
    it ('Simple cypress get', () => {
        cy.get('.feat').contains('FEAT');
    } )
})
describe ('Link Check One', () => {
    it ('finds the content ".dashboardlink"', () => {
        cy.get('.dashboardlink').click()
        cy.url().should('include', '/#dashboard')
    })
})
describe ('Link Check Two', () => {
    it ('finds the content "#fp1link"', () => {
        cy.get('#fp1link').click()
        cy.url().should('include', '/shopping')
    })
})


