// Access  http://automationpractice.com/index.php, hover over a product from the home page and add it to the basket, then check it out as registered user. Payment with check.

describe('Hover over Women categorie and click on a subcategory, and filterover', () => {
    it('pick an item to buy and add it to cart', () => {
        cy.visit('http://automationpractice.com/index.php')

        cy  // Find an <li> element as a first child of <ul>. Then trigger mouse events to hover over and move cursor
            .get('ul[id="homefeatured"]')
            .children('li')
            .first()
            .trigger('mouseover')
            .trigger('mousemove');

        cy  // Find button, check that it contains Add to cart caption. Then click on it.
            .get('a[data-id-product="1"]')
            .contains('Add to cart')
            .click();
    })

    it('proceed to checkout and finish purchase', () => {
        cy
            .window()
            .then(() => {
                cy  // Find button, check that it contains Add to cart caption. Then click on it.
                    .get('div[id="layer_cart"]')
                    .within(() => {
                        cy
                            .get('div[class="button-container"]')
                            .contains('Proceed to checkout')
                            .click();
                    })
            });

        cy  // Summary page. Check that added item exist in a table.
            .get('table[id="cart_summary"]')
            .should('exist');
        cy  // Summary page. Click "Proceed to checkout" button.
            .get('p[class="cart_navigation clearfix"]')
            .find('a[class="button btn btn-default standard-checkout button-medium"]')
            .click();

        cy  // Sign in page. Read "createdEmail.txt" file and get email from it for authentication.
            .readFile('createdMail.txt')
            .then(text => {
                let email = text.substring('0', text.indexOf('\n'));

                cy  // Paste first email from file
                    .get('input[id="email"]')
                    .type(email);
            })
        cy  // Sign in page. Get password from "cypress.env.json" file.
            .get('input[id="passwd"]')
            .type(Cypress.env('customer').passwd);
        cy  // Sign in page. Click "Sign in" button.
            .get('button[id="SubmitLogin"]')
            .click();

        cy  // Address page. Leave page information as it is. Click "Proceed to checkout" button.
            .get('button[name="processAddress"]')
            .click();
            
        cy  // Shipping page. Leave page information as it is. Check "Terms of service" checkbox.
            .get('div[class="checker"]')
            .find('input[id="cgv"]')
            .check();
        cy  // Shipping page. Click "Proceed to checkout" button.
            .get('button[name="processCarrier"]')
            .click();

        cy  // Payment page. Check "Pay by check" option.
            .get('p[class="payment_module"]')
            .find('a[class="cheque"]')
            .click();
        cy  // Payment page. Click "I confirm my order" button.
            .get('button[type="submit"]')
            .find('span')
            .contains('I confirm my order')
            .click();
        cy  // Payment page. Assert that order is compete.
            .get('p[class="alert alert-success"]')
            .should('exist');
    })
})