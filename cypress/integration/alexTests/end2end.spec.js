describe('find product', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('Add To Cart', () => {
        cy.get('.feat').click();
        cy.url().should('contain', 'shopping')

    });
});

describe('Not Authorized', () => {
    it('gets denied!', () => {
        cy.get('.shopping-menu').trigger('mouseover')
        cy.get('#profile').click()
        cy.url().should('be', '/api/login')
    })
})