# Dept assignment
### By Pichkurov Alexander
---
## General info
Part 2 of assignment for a position of middle QA for Dept.

Assignment link: [here](https://www.deptagency.com/assignment-qa-engineer/)
Part 1 can be found here: [Test Plan](https://docs.google.com/document/d/1Q8xXdt8qR2xjgtS1moschGt80m6s7iagdqzn2DlSrHg/edit?usp=sharing)

## Cases that was automated
1. Access  http://the-internet.herokuapp.com/broken_images, validate if there are broken images.
File: [herokuapp.images.js](https://github.com/Kassaddin/dept/blob/master/cypress/integration/herokuapp.images.js)
2. Access http://the-internet.herokuapp.com/upload and try uploading any file.
File: [herokuapp.upload.js](https://github.com/Kassaddin/dept/blob/master/cypress/integration/herokuapp.upload.js)
3. Access http://automationpractice.com/index.php, Hover over one of the main categories and click on a subcategory Women.
File: [automationpractice.categories.js](https://github.com/Kassaddin/dept/blob/master/cypress/integration/automationpractice.categories.js)
4. Access http://automationpractice.com/index.php, create new account.
File: [automationpractice.authentication.js](https://github.com/Kassaddin/dept/blob/master/cypress/integration/automationpractice.authentication.js)
5. Access  http://automationpractice.com/index.php, hover over a product from the home page and add it to the basket, then check it out as registered user. Payment with check.
File: [automationpractice.purchase.js](https://github.com/Kassaddin/dept/blob/master/cypress/integration/automationpractice.purchase.js)

## Install and run
To run this project, install Cypress locally using npm:

```npm install cypress --save-dev```

Run tests in terminal:

Run all tests ```npm run cy:run```

Run all tests in firefox ```npm run cy:run:firefox```

Run cases 1 and 2 ```npm run cy:run:herokuapp```

Run cases 3 to 5 ```npm run cy:run:automationpractice```


Run Cypress Runner:
```npm run cy:open```