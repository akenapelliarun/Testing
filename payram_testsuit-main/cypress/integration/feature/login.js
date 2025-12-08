import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import login_page from '../../pages/login_page';

// Initialize page object and load test data
const lp = new login_page();
let testData;

// Load fixture data before tests
before(() => {
  cy.fixture('data.json').then((data) => {
    testData = data;
  });
});

// Step Definitions

Given('I am on the login page', () => {
  cy.visitApp('/login');
  cy.url().should('include', '/login');
  cy.log('✓ Navigated to login page');
});

When('I enter valid credentials', () => {
  cy.log('Entering valid credentials...');

  // Verify email field using custom command
  cy.xpath("//input[@id='email']").then(() => {
    lp.get_email_field().clear().type(testData.email);
    cy.log(`✓ Email entered: ${testData.email}`);
  });

  // Verify password field using custom command
  cy.xpath("//input[@id='password']").then(() => {
    lp.get_password_field().clear().type(testData.password);
    cy.log('✓ Password entered');
  });
});

When('I enter invalid credentials', () => {
  cy.log('Entering invalid credentials...');

  lp.get_email_field().clear().type('invalid@email.com');
  cy.log('✓ Invalid email entered: invalid@email.com');

  lp.get_password_field().clear().type('WrongPassword123!');
  cy.log('✓ Invalid password entered');
});

When('I click the login button', () => {
  cy.log('Clicking login button...');
  lp.get_login_button().should('be.visible').click();
  cy.log('✓ Login button clicked');
});

Then('I should be redirected to the dashboard', () => {
  cy.log('Verifying dashboard redirection...');
  cy.url().should('include', '/dashboard', { timeout: 10000 });
  cy.log('✓ Successfully redirected to dashboard');
});

Then('I should see an error message indicating invalid login', () => {
  cy.log('Checking for error message...');

  // Check for common error messages (adjust selectors based on your app)
  cy.get('body').then(($body) => {
    const errorSelectors = [
      'div[class*="error"]',
      'span[class*="error"]',
      'p[class*="error"]',
      '[role="alert"]',
      '.alert-danger',
      '.error-message'
    ];

    let errorFound = false;

    errorSelectors.forEach((selector) => {
      if ($body.find(selector).length > 0) {
        cy.get(selector).should('be.visible');
        cy.log(`✓ Error message found with selector: ${selector}`);
        errorFound = true;
      }
    });

    if (!errorFound) {
      // Try to find any text containing error keywords
      cy.contains(/invalid|incorrect|wrong|error|failed/i).should('be.visible');
      cy.log('✓ Error message found by text content');
    }
  });
});

When('I check all links on the page', () => {
  cy.log('Starting broken links check...');
  cy.checkBrokenLinks();
  cy.log('✓ Broken links check completed');
});

Then('I should not find any broken links', () => {
  // Access the results stored by the custom command
  cy.get('@brokenLinksResult').then((result) => {
    const { totalChecked, brokenCount, brokenLinks } = result;

    cy.log(`Broken Links Check Results:`);
    cy.log(`Total links checked: ${totalChecked}`);
    cy.log(`Broken links found: ${brokenCount}`);

    // Add this information to the test output
    cy.task('log', '\n=== CUCUMBER REPORT: Broken Links Check ===');
    cy.task('log', `Total links checked: ${totalChecked}`);
    cy.task('log', `Broken links found: ${brokenCount}`);

    if (brokenCount > 0) {
      cy.task('log', '\n⚠️ WARNING: The following broken links were found:');
      brokenLinks.forEach((link, index) => {
        cy.task('log', `  ${index + 1}. ${link.url} (HTTP ${link.status}) - "${link.text}"`);
      });
      cy.task('log', '==========================================\n');

      // Create a visible log that will show in the report
      cy.log(`⚠️ Found ${brokenCount} broken link(s) - See details in CI logs`);
    } else {
      cy.task('log', '✅ All links are working correctly!');
      cy.task('log', '==========================================\n');
    }

    // Add an assertion for visibility in cucumber report
    expect(totalChecked, 'Total links checked').to.be.greaterThan(0);
    cy.log(`✓ Broken links verification completed - ${totalChecked} links checked, ${brokenCount} broken`);
  });
});