import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import login_page from '../../pages/login_page';
import home_page from '../../pages/home_page';
import settings_page from '../../pages/settings_page';

// Page Objects
const lp = new login_page();
const hp = new home_page();
const set = new settings_page();
let testData;
let widgetValue;

// Load fixture data
before(() => {
    cy.fixture('data.json').then((data) => {
        testData = data;
    });
});

// --- Settings Tab ---
Then('I click on the settings tab', () => {
    cy.log('⚙️ SETTINGS: Navigating to Settings...');
    hp.get_settings()
        .should('be.visible', { timeout: 10000 })
        .click({ force: true });

    // Instead of cy.wait, assert that the next URL or element is present
    // Example: cy.url().should('include', '/settings'); 
});

// --- Integrations Tab ---
Then('I click on the integration tab', () => {
    cy.log('🔗 INTEGRATIONS: Navigating to Integrations...');
    // Fixed typo: get_ingtegartions -> get_integrations
    set.get_integrations()
        .should('be.visible', { timeout: 10000 })
        .click({ force: true });

    // Wait for the specific header to appear instead of hard waiting
    cy.contains('h3', 'Integrations').should('be.visible');
});

Then('I should see the following supported networks:', (dataTable) => {
  const expectedNetworks = dataTable.raw().map(row => row[0]);

  // 1. Target the specific container using the class attribute
  // We use [class="..."] to match the exact string you provided
  set.get_node_list_container()
    .should('be.visible') // Assert the container itself is visible
    .within(() => {
      
      // 2. Now we are inside that specific box. 
      // We loop through your expected networks (Base, Bitcoin, etc.)
      expectedNetworks.forEach((networkName) => {
        
        // 3. Assert each network name exists and is visible inside this container
        cy.contains(networkName).should('be.visible');
      });
    });
});


// --- DYNAMIC STEP: Handles clicks for ALL networks (Tron, Bitcoin, Base, Ethereum) ---
When('I click on the three dots for {string}', (networkName) => {
    cy.log(`🔘 MENU: Opening options for ${networkName}...`);

    let element;
    // Select the correct element based on the input string
    switch (networkName) {
        case 'Tron':
            element = set.get_tron_threeDots();
            break;
        case 'Bitcoin':
            element = set.get_bitcoin_threeDots();
            break;
        case 'Base':
            element = set.get_base_threeDots();
            break;
        case 'Ethereum':
            element = set.get_ethereum_threeDots();
            break;
        default:
            throw new Error(`❌ Network "${networkName}" not defined in switch case!`);
    }

    // Click and verify the "Test Connection" button appears (menu opened)
    element.should('be.visible').click({ force: true });
    set.get_test_connection().should('be.visible');
});

// --- STEP: Click Test Connection ---
When('I click on test connection', () => {
    cy.log('⚡ ACTION: Testing connection...');
    
    set.get_test_connection()
        .should('be.visible')
        .click({ force: true });
});

// --- STEP: Verify Success Message ---
Then('I should see the connection success message', () => {
    cy.log('✅ VERIFICATION: Checking for success toast...');
    
    // Assert the success message is visible as requested
    set.get_connection_success()
        .should('be.visible', { timeout: 10000 });
});

When('I click on edit', () => {
    cy.log('⚡ ACTION: Testing connection...');
    
    set.get_edit()
        .should('be.visible')
        .click({ force: true });
});

// --- EMAIL INPUT ---
When("I type email in the server url input", (email) => {
  cy.log(`📧 INPUT: Typing "url" in email box...`);
  
  set.get_input_url()
    .should("be.visible", { timeout: 5000 })
    .clear()
    .type(testData.serverUrl);
    
  cy.log(`✅ Url entered`);
});

// --- PASSWORD INPUT ---
When("I type password in the password input", (password) => {
  cy.log(`🔒 INPUT: Typing password...`);
  
  set.get_input_pswrd()
    .should("be.visible", { timeout: 5000 })
    .clear()
    .type(testData.pswrd);

  cy.log(`✅ Password entered`);
});

// --- USERNAME INPUT ---
When("I type username in the username input", (username) => {
  cy.log(`👤 INPUT: Typing "${username}" in username box...`);
  
  set.get_input_username()
    .should("be.visible", { timeout: 5000 })
    .clear()
    .type(testData.username);

  cy.log(`✅ Username entered`);
});

// --- SERVER KEY INPUT ---
When("I type server key  in the server key input", (key) => {
  cy.log(`🔑 INPUT: Typing server key...`);
  
  set.get_server_key()
    .should("be.visible", { timeout: 5000 })
    .clear()
    .type(testData.serverKey);

  cy.log(`✅ Server key entered`);
});

// --- CLICK SAVE ---
// Changed to 'When' because clicking is an action
When('I click on the save details', () => {
    cy.log('💾 ACTION: Clicking Save button...');
    
    set.get_save_details()
        .should('be.visible', { timeout: 10000 })
        .click({ force: true });
        
    cy.log('✅ Save button clicked');
});

// --- VERIFY SUCCESS MESSAGE ---
Then('I should see the "Node details saved successfully" message', () => {
  cy.log('✅ VERIFICATION: Checking for success modal...');

  // 1. Get the success message element from the page object
  // Based on your screenshot, this is inside an <h3> tag
  set.get_success_message_title()
    .should('be.visible', { timeout: 10000 }) 
    .and('contain.text', 'Node details saved successfully');

  // 2. Verify the description text (optional but good for robustness)
  cy.contains('p', 'Your node is connected and ready to use')
    .should('be.visible');
    
  cy.log('✅ Success message verified');
});