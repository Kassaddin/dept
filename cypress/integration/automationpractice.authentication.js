// Access http://automationpractice.com/index.php, create a new account.

// Create unique email for registration. Won't work for parallell testing.
function createEmail() {
    const coreMail = 'kassaddin';
    const today = Date.now();
    const testMail = `${coreMail}+id${today}@gmail.com`;

    return testMail;
}

describe('Create new account', () => {
    // Generate new email.
    const mail = createEmail();

    it('get and type in unique email to create new account', () => {
        cy.visit('http://automationpractice.com/index.php?controller=authentication');

        cy  // Type in generated email.
            .get('input[id="email_create"]')
            .type(mail);

        // Add new email into "createdMail.txt".
        cy.writeFile('createdMail.txt', `${mail}\n`, { flag: 'a+' });

        cy  // Find and click on a "Create an account" button.
            .get('button[id="SubmitCreate"]')
            .click();
    })

    it('fill form with data', () => {
        // Fill form with data from "cypress.env.json" file.
        cy
            .get('input[id="customer_firstname"]')
            .type(Cypress.env('customer').customer_firstname);
        cy
            .get('input[id="customer_lastname"]')
            .type(Cypress.env('customer').customer_lastname);
        cy
            .get('input[id="passwd"]')
            .type(Cypress.env('customer').passwd);
        cy
            .get('input[id="address1"]')
            .type(Cypress.env('customer').address1);
        cy
            .get('input[id="city"]')
            .type(Cypress.env('customer').city);
        cy
            .get('input[id="postcode"]')
            .type(Cypress.env('customer').postcode);
        cy
            .get('select[id="id_country"]')
            .select(Cypress.env('customer').id_country);
        cy
            .get('select[id="id_state"]')
            .select(Cypress.env('customer').id_state);
        cy
            .get('input[id="phone_mobile"]')
            .type(Cypress.env('customer').phone_mobile);
        cy
            .get('input[id="alias"]')
            .type(Cypress.env('customer').alias);

        cy  // Submit form.
            .get('button[id="submitAccount"]')
            .click();

        cy  // Assert that final page is one we expecting.
            .get('h1')
            .then(($h1) => {
                expect($h1).to.have.text('My account')
            })
    })
})