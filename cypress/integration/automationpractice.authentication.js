// Access http://automationpractice.com/index.php, create a new account.

// Create unique email for registration. Won't work for parallell testing.
function createEmail() {
    const coreMail = 'kassaddin';
    let today = Date.now();
    let testMail = `${coreMail}+id${today}@gmail.com`;

    return testMail;
}

describe('Create new account', () => {
    // Generate new email.
    let mail = createEmail();

    it('get and type in unique email to create new account', () => {
        cy.visit('http://automationpractice.com/index.php?controller=authentication');

        cy  // Type in generated email.
            .get('input[id="email_create"]')
            .type(mail);
    })

    it('press "Create an account" button', () => {
        // Pass/Fail criteria.
        let condition = true;

        cy  // Find and click on a "Create an account" button.
            .get('button[id="SubmitCreate"]')
            .click();

        cy  // Wait for error messsage to pop-up if email is not unique.
            .wait(500);

        cy  // Check error message after click.
            .get('div[id="create_account_error"]')
            .then(($error) => {
                if ($error.is(':visible')) {    // If error message is visible set pass-condition to false. And stop further steps.
                    condition = false;
                    cy.log('Such email is already in use');
                    Cypress.runner.stop();
                }
                else {  // Else wait for 5 sec for page to load and check that it is the one we expect.
                    cy.wait(5000);  

                    // Add new email into createdMail.txt to use later.
                    cy.writeFile('createdMail.txt', `${mail}\n`, { flag: 'a+' });   
                    
                    cy  // Check loaded page's <h1> to assert this is one we expect.
                        .get('h1')
                        .then(($h1) => {
                            expect($h1).to.have.text('Create an account')
                        })
                }
            });

        // Assert Pass/Fail criteria.
        cy.expect(condition).to.be.true;
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