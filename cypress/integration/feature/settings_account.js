import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import home_page from '../../pages/home_page';
import settings_page from '../../pages/settings_page';
import settings_acconut_page from '../../pages/settings_account_page';

// Page Objects
const hp = new home_page();
const set = new settings_page();
const set_ac = new settings_acconut_page();
let testData;

// Load fixture data
before(() => {
    cy.fixture('data.json').then((data) => {
        testData = data;
    });
});



// --- Integrations Tab ---
Then('I click on the account tab', () => {
    cy.log('👤 ACCOUNT: Navigating to Account settings...');
    
    set_ac.get_account()
        .should('be.visible', { timeout: 10000 })
        .click({ force: true });

    // Wait for the Account header to appear
    cy.contains('h3', 'Account').should('be.visible');
});

// --- ASSERTION: Verify Account Page is Displayed ---
Then('the account page should be displayed', () => {
    cy.log('✅ VERIFICATION: Checking if Account page is displayed...');
    
    // Verify account heading is visible
    set_ac.get_account_heading()
        .should('be.visible')
        .and('contain.text', 'Account');
    
    cy.log('✅ Account page is fully displayed');
});

// --- ACTION: Scroll to and Click Test Project 3 ---
When('I scroll to and click on Test Project 3', () => {
    cy.log('📍 ACTION: Scrolling to Test Project 3...');
    
    set_ac.get_testproject3()
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });
    
    cy.log('✅ Scrolled to and clicked Test Project 3');
});

// --- ASSERTION: Verify Edit Save Button is Available ---
Then('the project details edit save button should be visible', () => {
    cy.log('✅ VERIFICATION: Checking Edit/Save button...');
    
    set_ac.get_project_details_edit_save_btn()
        .should('be.visible')
        .click({ force: true });
    
    cy.log('✅ Edit/Save button is available');
});

// --- ASSERTION: Verify Redirection Edit Save Button ---
Then('the redirection edit save button should be visible', () => {
    cy.log('✅ VERIFICATION: Checking Redirection button...');
    
    set_ac.get_redirection_edit_save_btn()
        .should('be.visible')
        .click({ force: true });
    
    cy.log('✅ Redirection button is available');
});

// --- SEPARATE TESTCASE: Enter and assert Success URL ---
When('I enter the success url from fixture', () => {
    cy.log('✍️ ACTION: Entering Success URL from fixture');
    set_ac.get_successUrl_label()
        .scrollIntoView()
        .should('be.visible')
        .clear()
        .type(testData.successUrl);
});

Then('the success url should be entered correctly', () => {
    set_ac.get_successUrl_label()
        .should('have.value', testData.successUrl);
});

// --- SEPARATE TESTCASE: Enter and assert Cancel URL ---
When('I enter the cancel url from fixture', () => {
    cy.log('✍️ ACTION: Entering Cancel URL from fixture');
    set_ac.get_cancelUrl_label()
        .scrollIntoView()
        .should('be.visible')
        .clear()
        .type(testData.cancelUrl);
});

Then('the cancel url should be entered correctly', () => {
    set_ac.get_cancelUrl_label()
        .should('have.value', testData.cancelUrl);
});

// --- SEPARATE TESTCASE: Enter and assert Website URL ---
When('I enter the website url', () => {
    cy.log('✍️ ACTION: Entering Website URL');
    set_ac.get_websiteUrl()
        .scrollIntoView()
        .should('be.visible')
        .clear()
        .type(testData.websiteUrl);
});

Then('the website url should be entered correctly', () => {
    set_ac.get_websiteUrl()
        .should('have.value', testData.websiteUrl);
});

// --- SEPARATE TESTCASE: Enter and assert Project Name ---
When('I enter the project name', () => {
    cy.log('✍️ ACTION: Entering Project Name');
    set_ac.get_projectName()
        .scrollIntoView()
        .should('be.visible')
        .clear()
        .type(testData.projectName);
});

Then('the project name should be entered correctly', () => {
    set_ac.get_projectName()
        .should('have.value', testData.projectName);
});

Then('I should see the PayRam connection QR code card with correct details', () => {
    // Select the parent element using the XPath you provided
    cy.xpath("//div[contains(@class,'w-full md:w-[64%]')]")
      .should('be.visible')
      .within(() => {
        
        // 1. Assert the QR Code is visible
        // We look for an image tag (img) or an SVG (common for QRs) inside this container
        cy.get('img, svg, canvas').first().should('be.visible');

        // 2. Assert the Heading Text
        cy.contains('h1, h2, h3, div', 'Connect to PayRam Mobile App')
          .should('be.visible');

        // 3. Assert the Description Text
        cy.contains('Scan above QR code in mobile app to get started with linking wallets on mobile app')
          .should('be.visible');

        // 4. Assert the Expiration Timer
        // We use a partial match because the time "01:16" changes
        cy.contains('Expiring in')
          .should('be.visible');
    });
});
