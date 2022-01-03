// Access http://automationpractice.com/index.php, Hover over one of the main categories and click on a subcategory Women.

describe('Hover over Women category and click on a subcategory, and filterover', () => {
    beforeEach(() => {
        cy.visit('http://automationpractice.com/index.php')

        cy  // Find an <li> element as a first child of <ul>. Then trigger mouse events to hover over and move cursor.
            .get('ul[class="sf-menu clearfix menu-content sf-js-enabled sf-arrows"]')
            .children('li')
            .first()
            .trigger('mouseover')
            .trigger('mousemove');
    })

    it('go to WOMEN category', () => {
        cy  // Find element, check that it contains title Women. Then click on it
            .get('li[class="sfHover"]')
            .contains('Women')
            .click();

        cy // Assert loaded page is one we need.
            .title()
            .should('eq', 'Women - My Store')
    })

    it('go to subcategory WOMEN -> Tops', () => {
        cy  // Find sub element of <li class="sfHover">, check that it sontains subtitle Tops. Then click on it.
            .get('li[class="sfHover"]')
            .within(() => {
                cy
                    .get('a[class="sf-with-ul"]')
                    .contains('Tops')
                    .click();
            });

        cy // Assert loaded page is one we need.
            .title()
            .should('eq', 'Tops - My Store');
    })

    it('go to subcategory WOMEN -> Tops and filter by T-shirts category', () => {
        cy  // Find sub element of <li class="sfHover">, check that it have filter T-shirts. Then click on it.
            .get('li[class="sfHover"]')
            .within(() => {
                cy.get('ul');
                cy
                    .get('a[title="T-shirts"]')
                    .contains('T-shirts')
                    .click();
            })
        cy // Assert loaded page is one we need.
            .title()
            .should('eq', 'T-shirts - My Store');
    })
})