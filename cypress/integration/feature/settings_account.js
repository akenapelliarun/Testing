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

// --- ASSERTION: Check QR Code ---
Then('I should see the PayRam connection QR code card with correct details', () => {
    // Select the parent element using the XPath you provided
    cy.xpath("//div[contains(@class,'w-full md:w-[64%]')]")
        .should('be.visible')
        .within(() => {
            // 1. Assert the QR Code is visible
            cy.get('img, svg, canvas').first().should('be.visible');

            // 2. Assert the Heading Text
            cy.contains('h1, h2, h3, div', 'Connect to PayRam Mobile App')
                .should('be.visible');

            // 3. Assert the Description Text
            cy.contains('Scan above QR code in mobile app to get started with linking wallets on mobile app')
                .should('be.visible');

            // 4. Assert the Expiration Timer
            cy.contains('Expiring in').should('be.visible');
        });
});

// --- BRANDING TAB STEPS ---

Then('I click on Branding Tab', () => {
    set_ac.get_branding().should('be.visible').click();
});

Then('I click on Logo edit', () => {
    set_ac.get_logo_edit().should('be.visible').click();
});
Then('I click on support edit', () => {
    set_ac.get_support_edit().should('be.visible').click();
});
Then('I click on social edit', () => {
    set_ac.get_socialink_edit().should('be.visible').click();
});
// Corrected Step Definition
// We add {string} to catch the path, and (logoPath) to use it in the function
Then('I upload the logo {string}', (logoPath) => {
    cy.log('🎨 BRANDING: Uploading logo and setting brand color...');

    // 1. Clear existing logo (Corrected Pattern)
    // You cannot use try/catch. Instead, selectFile usually overrides the existing file automatically.
    // If you MUST click clear, use this 'body' check pattern:
    cy.get('body').then(($body) => {
        // Check if the clear button exists in the DOM before trying to click it
        // Note: You need to know the specific class or text of your clear button for this check
        const clearButton = $body.find('button:contains("Clear")'); // Adjust selector as needed
        if (clearButton.length > 0) {
            cy.wrap(clearButton).click({ force: true });
            cy.log('✅ Clear button clicked');
        }
    });

    // 2. Upload the new file using the dynamic variable 'logoPath'
    cy.log(`Uploading logo from: ${logoPath}`);
    set_ac.get_logo_input().selectFile(logoPath, { force: true });
    cy.log('✅ Logo uploaded');

    // 3. Brand Color Section
    // (Note: Ideally, this should be in its own step "And I set the brand color to...")
    cy.log('Setting brand color...');
    set_ac.get_brand_colour().should('be.visible').clear().type('#c11515');
    set_ac.get_brand_colour().should('have.value', '#c11515');

    // Wait for color preview to update
    cy.wait(500);

    // Assertion: Check the visual color swatch (Hex converts to RGB)
    set_ac.get_colour_code()
        .should('have.css', 'background-color', 'rgb(193, 21, 21)');
    cy.log('✅ Color preview verified');

    // Save
    set_ac.get_save_button().scrollIntoView().should('be.visible').click({ force: true });
    cy.log('✅ Branding saved');
});

// 1. Enable Editing
When('I click the edit button for Social Links', () => {
    set_ac.get_socialink_edit().should('be.visible').click();
});

// 2. Update Individual Fields (Separated)
When('I update the Twitter handle', () => {
    set_ac.get_twitter_handle().clear().type(testData.twitterHandle);
});

When('I update the Discord link', () => {
    set_ac.get_discord_link().clear().type(testData.discordLink);
});

When('I update the LinkedIn URL', () => {
    set_ac.get_linkedIn_url().clear().type(testData.linkedinHandle);
});

When('I update the Telegram link', () => {
    set_ac.get_telegram_link().clear().type(testData.telegramLink);
});

// 3. Save Action
When('I click the save button', () => {
    set_ac.get_save_button().should('be.visible').click();
});

// 4. Verification/Assertion
Then('the Twitter handle should be updated correctly', () => {
    set_ac.get_twitter_handle().should('have.value', testData.twitterHandle);
});

// 1. Enable Editing
When('I click the edit button for Support Information', () => {
    set_ac.get_support_edit().scrollIntoView().should('be.visible').click();
});

// 2. Update Individual Fields
When('I update the Support Email', () => {
    set_ac.get_supportEmail().clear().type(testData.supportEmail);
});

When('I update the Reply-To Email', () => {
    set_ac.get_replyToEmail().clear().type(testData.replyToEmail);
});

When('I update the From Email', () => {
    set_ac.get_fromEmail().clear().type(testData.fromEmail);
});

// 3. Verification
Then('the Support Email should be updated correctly', () => {
    set_ac.get_supportEmail().should('have.value', testData.supportEmail);
});

// 4. Save (Reusing the generic save step is best practice, but here it is explicitly)
When('I save the Support Information', () => {
    set_ac.get_save_button().should('be.visible').click();
});