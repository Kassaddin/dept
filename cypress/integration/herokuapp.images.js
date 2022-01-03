// Access  http://the-internet.herokuapp.com/broken_images, validate if there are broken images.

describe('Validate broken images', () => {
    it('all images should be loaded', () => {
        cy.visit('https://the-internet.herokuapp.com/broken_images');

        cy
            .get('img')
            .should('be.visible')
            .then(($img) => {
                // Pass/Fail criteria.
                let condition = true;

                // Get a list of images on a page and check in cycle each of their naturalWidth.
                // Picture will have naturalWidth attribute if it was successfully loaded.
                for (let i = 0; i < $img.length; i++) {
                    let check = $img[i].naturalWidth;

                    // Check Pass/Fail criteria. If naturalWidth = 0 than picture was not loaded.                
                    if (check == 0) {
                        condition = false;
                    }

                    // Assert Pass/Fail criteria.
                    cy.expect(condition).to.be.true;
                }
            })
    })
})