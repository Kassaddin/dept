// Access http://the-internet.herokuapp.com/upload and try uploading any file.

describe('Validate file uploading', () => {
    beforeEach(() => {
        cy.visit('https://the-internet.herokuapp.com/upload');
    });

    it('successfully upload valid file via input#file-upload', () => {
        const fixtureFile = 'testPicture.png';

        cy  // Find file-upload input and attach file from fixtures.
            .get('input[id="file-upload"]')
            .attachFile(fixtureFile);

        cy  // Press submit button.
            .get('input[id="file-submit"]')
            .click();
            
        cy  // Assert that picture been uploaded.
            .get('div[id="uploaded-files"]')
            .should('contain', 'testPicture.png');
    })
})