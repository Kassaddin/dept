// Access  http://the-internet.herokuapp.com/broken_images, validate if there are broken images.

describe('Validate broken images', () => {
    it('all images should be loaded', () => {
        cy.visit('https://the-internet.herokuapp.com/broken_images');

        cy
            .get('img')
            .should('be.visible')
            .then(($img) => {
                // Get a list of images on a page and check in cycle each of their naturalWidth.
                // Picture will have naturalWidth attribute if it was successfully loaded.
                for (let i = 0; i < $img.length; i++) {
                    cy.expect($img[i].naturalWidth).not.to.eq(0);
                }
            })
    })
})