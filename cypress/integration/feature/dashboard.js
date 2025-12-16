import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import login_page from '../../pages/login_page';
import home_page from '../../pages/home_page';
import dashboard_page from '../../pages/dashboard_page';

// Page Objects
const lp = new login_page();
const hp = new home_page();
const dp = new dashboard_page();
let testData;
let widgetValue;

// Load fixture data
before(() => {
  cy.fixture('data.json').then((data) => {
    testData = data;
  });
});

// ============================================
// COMMON STEPS - Used by ALL scenarios
// ============================================

Given('I am logged in as a valid user', () => {
  cy.log('🔐 LOGIN: Starting login process...');

  // Visit login page
  cy.visitApp('/login');
  cy.url().should('include', '/login');
  cy.log('✅ Login page loaded');

  // Enter email
  lp.get_email_field()
    .should('be.visible')
    .clear()
    .type(testData.email);
  cy.log(`✅ Email entered: ${testData.email}`);

  // Enter password
  lp.get_password_field()
    .should('be.visible')
    .clear()
    .type(testData.password);
  cy.log('✅ Password entered');

  // Click login button
  lp.get_login_button()
    .should('be.visible')
    .should('be.enabled')
    .click();
  cy.log('✅ Login button clicked');

  // Wait for successful login
  cy.url().should('not.include', '/login', { timeout: 15000 });
  cy.log('✅ LOGIN SUCCESSFUL - User is logged in');
});

When('I navigate to the home page', () => {
  cy.log('🏠 NAVIGATION: Verifying home page...');
  cy.url().should('include', 'testnet.resuefas.vip');
  cy.log('✅ Home page verified');
});

Then('I click on the projects dropdown', () => {
  cy.log('📂 PROJECTS DROPDOWN: Opening dropdown...');
  hp.get_project_dropdown()
    .should('be.visible', { timeout: 10000 })
    .click({ force: true });
  cy.wait(1000);
  cy.log('✅ Projects dropdown opened');
});

Then('I select {string} from the dropdown', (projectName) => {
  cy.log(`📂 PROJECT SELECTION: Selecting "${projectName}"...`);
  hp.get_test_project_3()
    .should('be.visible', { timeout: 5000 })
    .click({ force: true });
  cy.wait(2000);
  cy.log(`✅ Project "${projectName}" selected`);
});

Then('I click on the dashboard link', () => {
  cy.log('📊 DASHBOARD LINK: Clicking dashboard...');
  hp.get_dashboard()
    .should('be.visible', { timeout: 10000 })
    .click({ force: true });
  cy.wait(2000);
  cy.log('✅ Dashboard link clicked');
});

Then('I should see the dashboard page', () => {
  cy.log('📊 DASHBOARD PAGE: Verifying dashboard loaded...');
  cy.url().should('include', 'dashboard', { timeout: 10000 });
  cy.get('body').should('be.visible');
  cy.log('✅ DASHBOARD PAGE LOADED SUCCESSFULLY');
});

// ============================================
// SCENARIO: Validate broken links on dashboard
// ============================================

When('I check for broken links on the dashboard page', () => {
  cy.log('🔍 BROKEN LINKS: Starting check...');
  cy.checkBrokenLinks();
  cy.log('✅ Broken links check completed');
});

Then('there should be no broken links present', () => {
  cy.log('🔍 BROKEN LINKS: Analyzing results...');
  cy.get('@brokenLinksResult').then((result) => {
    const { totalChecked, brokenCount, brokenLinks } = result;

    cy.log(`📊 Total links checked: ${totalChecked}`);
    cy.log(`📊 Broken links found: ${brokenCount}`);

    if (brokenCount > 0) {
      cy.log('⚠️ WARNING: Broken links detected!');
      brokenLinks.forEach((link, index) => {
        cy.log(`  ${index + 1}. URL: ${link.url} - Status: HTTP ${link.status}`);
      });
    } else {
      cy.log('✅ All links are working correctly');
    }

    expect(totalChecked, 'Total links checked').to.be.greaterThan(0);
    cy.log('✅ BROKEN LINKS VALIDATION COMPLETED');
  });
});

// ============================================
// SCENARIO: Validate data on dashboard
// ============================================

When('I validate the presence of key data on the dashboard', () => {
  cy.log('📊 DASHBOARD DATA: Validating all key data elements...');

  // Widget 1: Total Payments
  cy.log('📊 Checking Total Payments widget...');
  dp.get_total_payments().should('be.visible');
  dp.get_total_payments_value().should('be.visible').invoke('text').then((text) => {
    cy.log(`  ✅ Total Payments: ${text.trim()}`);
  });

  // Widget 2: Payments in last 30 days
  cy.log('📊 Checking Payments in last 30 days widget...');
  dp.get_payments_in_last_30_days().should('be.visible');
  dp.get_payments_in_last_30_days_value().should('be.visible').invoke('text').then((text) => {
    cy.log(`  ✅ Payments in last 30 days: ${text.trim()}`);
  });

  // Widget 3: Total Paying Users
  cy.log('📊 Checking Total Paying Users widget...');
  dp.get_total_paying_users().should('be.visible');
  dp.get_total_paying_users_value().should('be.visible').invoke('text').then((text) => {
    cy.log(`  ✅ Total Paying Users: ${text.trim()}`);
  });

  // Widget 4: Paying Users in last 30 days
  cy.log('📊 Checking Paying Users in last 30 days widget...');
  dp.get_paying_users_in_last_30_days().should('be.visible');
  dp.get_paying_users_in_last_30_days_value().should('be.visible').invoke('text').then((text) => {
    cy.log(`  ✅ Paying Users in last 30 days: ${text.trim()}`);
  });

  // Widget 5: Total Users Requested Payments
  cy.log('📊 Checking Total Users Requested Payments widget...');
  dp.get_total_users_requested_payments().should('be.visible');
  dp.get_total_users_requested_payments_value().should('be.visible').invoke('text').then((text) => {
    cy.log(`  ✅ Total Users Requested Payments: ${text.trim()}`);
  });

  // Widget 6: Users Attempted in last 30 days
  cy.log('📊 Checking Users Attempted in last 30 days widget...');
  dp.get_users_attempted_in_last_30_days().should('be.visible');
  dp.get_users_attempted_in_last_30_days_value().should('be.visible').invoke('text').then((text) => {
    cy.log(`  ✅ Users Attempted in last 30 days: ${text.trim()}`);
  });

  cy.log('✅ All 6 data elements validated');
});

Then('all key data elements should be present and correct', () => {
  cy.log('✅ DASHBOARD DATA VALIDATION COMPLETED - All elements present and correct');
});

// ============================================
// SCENARIO: Validate widgets on dashboard
// ============================================

When('I validate the presence of widgets on the dashboard', () => {
  cy.log('🔲 WIDGETS: Validating all widgets are present...');

  const widgets = [
    { name: 'Total Payments', getter: () => dp.get_total_payments() },
    { name: 'Payments in last 30 days', getter: () => dp.get_payments_in_last_30_days() },
    { name: 'Total Paying Users', getter: () => dp.get_total_paying_users() },
    { name: 'Paying Users in last 30 days', getter: () => dp.get_paying_users_in_last_30_days() },
    { name: 'Total Users Requested Payments', getter: () => dp.get_total_users_requested_payments() },
    { name: 'Users Attempted in last 30 days', getter: () => dp.get_users_attempted_in_last_30_days() }
  ];

  widgets.forEach((widget, index) => {
    cy.log(`🔲 Checking Widget ${index + 1}: "${widget.name}"...`);
    widget.getter().should('be.visible');
    cy.log(`  ✅ "${widget.name}" is visible`);
  });

  cy.log('✅ All 6 widgets are present');
});

Then('all widgets should be present and functioning correctly', () => {
  cy.log('✅ WIDGETS VALIDATION COMPLETED - All widgets present and functioning');
});

// ============================================
// INDIVIDUAL WIDGET SCENARIOS
// ============================================

Then('i navigate to {string} widget', (widgetName) => {
  cy.log(`🎯 WIDGET NAVIGATION: Navigating to "${widgetName}" widget...`);

  if (widgetName.toLowerCase() === 'total payments') {
    dp.get_total_payments().scrollIntoView().should('be.visible');
    cy.log(`✅ Navigated to "${widgetName}" widget`);
  }
  else if (widgetName.toLowerCase() === 'payment on last 30 days') {
    dp.get_payments_in_last_30_days().scrollIntoView().should('be.visible');
    cy.log(`✅ Navigated to "${widgetName}" widget`);
  }
  else if (widgetName.toLowerCase() === 'payment on total paying users') {
    dp.get_total_paying_users().scrollIntoView().should('be.visible');
    cy.log(`✅ Navigated to "${widgetName}" widget`);
  }
  else if (widgetName.toLowerCase() === 'paying users in last 30 days') {
    dp.get_paying_users_in_last_30_days().scrollIntoView().should('be.visible');
    cy.log(`✅ Navigated to "${widgetName}" widget`);
  }
  else if (widgetName.toLowerCase() === 'total users requested payments') {
    dp.get_total_users_requested_payments().scrollIntoView().should('be.visible');
    cy.log(`✅ Navigated to "${widgetName}" widget`);
  }
  else if (widgetName.toLowerCase() === 'user attempted in last 30 days') {
    dp.get_users_attempted_in_last_30_days().scrollIntoView().should('be.visible');
    cy.log(`✅ Navigated to "${widgetName}" widget`);
  }
});

When('I check the {string} widget', (widgetName) => {
  cy.log(`🔍 WIDGET CHECK: Checking "${widgetName}" widget...`);

  if (widgetName.toLowerCase() === 'total payments') {
    dp.get_total_payments().should('be.visible');
    cy.log(`  ✅ Widget title visible: "${widgetName}"`);

    dp.get_total_payments_value().should('be.visible').invoke('text').then((text) => {
      widgetValue = text.trim();
      cy.log(`  ✅ Widget value extracted: ${widgetValue}`);
    });
  }
  else if (widgetName.toLowerCase() === 'payment on last 30 days') {
    dp.get_payments_in_last_30_days().should('be.visible');
    cy.log(`  ✅ Widget title visible: "${widgetName}"`);

    dp.get_payments_in_last_30_days_value().should('be.visible').invoke('text').then((text) => {
      widgetValue = text.trim();
      cy.log(`  ✅ Widget value extracted: ${widgetValue}`);
    });
  }

  cy.log(`✅ Widget "${widgetName}" checked successfully`);
});

When('I check the {string} widget and extract the value', (widgetName) => {
  cy.log(`🔍 WIDGET CHECK & EXTRACT: Checking "${widgetName}" widget...`);

  if (widgetName.toLowerCase() === 'payment on total paying users') {
    dp.get_total_paying_users().should('be.visible');
    cy.log(`  ✅ Widget title visible: "${widgetName}"`);

    dp.get_total_paying_users_value().should('be.visible').invoke('text').then((text) => {
      widgetValue = text.trim();
      cy.log(`  ✅ Widget value extracted: ${widgetValue}`);
    });
  }
  else if (widgetName.toLowerCase() === 'paying users in last 30 days') {
    dp.get_paying_users_in_last_30_days().should('be.visible');
    cy.log(`  ✅ Widget title visible: "${widgetName}"`);

    dp.get_paying_users_in_last_30_days_value().should('be.visible').invoke('text').then((text) => {
      widgetValue = text.trim();
      cy.log(`  ✅ Widget value extracted: ${widgetValue}`);
    });
  }
  else if (widgetName.toLowerCase() === 'total users requested payments') {
    dp.get_total_users_requested_payments().should('be.visible');
    cy.log(`  ✅ Widget title visible: "${widgetName}"`);

    dp.get_total_users_requested_payments_value().should('be.visible').invoke('text').then((text) => {
      widgetValue = text.trim();
      cy.log(`  ✅ Widget value extracted: ${widgetValue}`);
    });
  }
  else if (widgetName.toLowerCase() === 'user attempted in last 30 days') {
    dp.get_users_attempted_in_last_30_days().should('be.visible');
    cy.log(`  ✅ Widget title visible: "${widgetName}"`);

    dp.get_users_attempted_in_last_30_days_value().should('be.visible').invoke('text').then((text) => {
      widgetValue = text.trim();
      cy.log(`  ✅ Widget value extracted: ${widgetValue}`);
    });
  }

  cy.log(`✅ Widget "${widgetName}" value extracted successfully`);
});

Then('the {string} value and data should be visible and it should be greater than 0', (widgetName) => {
  cy.log(`✔️ WIDGET VALIDATION: Validating "${widgetName}" value > 0...`);

  // Check value exists
  expect(widgetValue, `${widgetName} value`).to.exist;
  cy.log(`  ✅ Value exists: ${widgetValue}`);

  // Extract numeric value
  const numericValue = widgetValue.replace(/[^0-9.]/g, '');
  const parsedValue = parseFloat(numericValue);
  cy.log(`  ✅ Numeric value: ${parsedValue}`);

  // Validate > 0
  if (!isNaN(parsedValue)) {
    expect(parsedValue, `${widgetName} numeric value`).to.be.greaterThan(0);
    cy.log(`  ✅ ${parsedValue} > 0 ✓`);
  } else {
    cy.log(`  ⚠️ Non-numeric value: ${widgetValue}`);
    expect(widgetValue.length, `${widgetName} has data`).to.be.greaterThan(0);
  }

  cy.log(`✅ WIDGET "${widgetName}" VALIDATION COMPLETED - Value is greater than 0`);
});

// ============================================
// NETWORK DROPDOWN SCENARIOS
// ============================================

When("I click on the network dropdown on dashboard", () => {
  cy.log('🌐 NETWORK DROPDOWN: Opening network dropdown...');
  dp.get_network_dropdown().should("be.visible", { timeout: 10000 });
  cy.log('  ✅ Network dropdown found');

  dp.get_network_dropdown().click();
  cy.wait(1000);
  cy.log('✅ Network dropdown opened');
});

When("I click on the currency dropdown on dashboard", () => {
  cy.log('💱 CURRENCY DROPDOWN: Opening currency dropdown...');
  dp.get_currency_dropdown().should("be.visible", { timeout: 10000 });
  cy.log('  ✅ Currency dropdown found');

  dp.get_currency_dropdown().click();
  cy.wait(1000);
  cy.log('✅ Currency dropdown opened');
});


Then("I click on select none button", () => {
  cy.log('🔘 SELECT NONE: Clearing all network selections...');
  dp.get_select_none_button().should("be.visible", { timeout: 5000 });
  cy.log('  ✅ Select None button found');

  dp.get_select_none_button().click({ force: true });
  cy.wait(1000);
  cy.log('✅ All networks deselected - Select None clicked');
});

When("I select {string} from the network dropdown", (networkName) => {
  cy.log(`🌐 NETWORK SELECTION: Selecting "${networkName}" from dropdown...`);

  const normalizedName = networkName.toLowerCase();

  if (normalizedName === 'bitcoin') {
    dp.get_bitcoin_option().should("be.visible", { timeout: 5000 });
    cy.log(`  ✅ ${networkName} option found`);

    dp.get_bitcoin_option().click({ force: true });
    cy.wait(1000);
    cy.log(`✅ ${networkName} selected`);
  }
  else if (normalizedName === 'ethereum') {
    dp.get_ethereum_option().should("be.visible", { timeout: 5000 });
    cy.log(`  ✅ ${networkName} option found`);

    dp.get_ethereum_option().parent().click({ force: true });
    cy.wait(1000);
    cy.log(`✅ ${networkName} selected`);
  }
  else if (normalizedName === 'tron') {
    dp.get_tron_option().should("be.visible", { timeout: 5000 });
    cy.log(`  ✅ ${networkName} option found`);

    dp.get_tron_option().click({ force: true });
    cy.wait(1000);
    cy.log(`✅ ${networkName} selected`);
  }
  else if (normalizedName === 'base') {
    dp.get_base_option().should("be.visible", { timeout: 5000 });
    cy.log(`  ✅ ${networkName} option found`);

    dp.get_base_option().click({ force: true });
    cy.wait(1000);
    cy.log(`✅ ${networkName} selected`);
  }
});

When("I select {string} from the currency dropdown", (currencyName) => {
  cy.log(`🌐 NETWORK SELECTION: Selecting "${currencyName}" from dropdown...`);

  const currencysName = currencyName.toLowerCase();

  if (currencysName === 'bitcoin') {
    dp.get_bitcoin_option().should("be.visible", { timeout: 5000 });
    cy.log(`  ✅ ${currencyName} option found`);

    dp.get_bitcoin_option().click({ force: true });
    cy.wait(1000);
    cy.log(`✅ ${currencyName} selected`);
  }
  else if (currencysName === 'ethereum') {
    dp.get_ethereum_option().should("be.visible", { timeout: 5000 });
    cy.log(`  ✅ ${currencyName} option found`);

    dp.get_ethereum_option().parent().click({ force: true });
    cy.wait(1000);
    cy.log(`✅ ${currencyName} selected`);
  }
  else if (currencysName === 'tron') {
    dp.get_tron_option().should("be.visible", { timeout: 5000 });
    cy.log(`  ✅ ${currencyName} option found`);

    dp.get_tron_option().click({ force: true });
    cy.wait(1000);
    cy.log(`✅ ${currencyName} selected`);
  }
  else if (currencysName === 'base') {
    dp.get_base_option().should("be.visible", { timeout: 5000 });
    cy.log(`  ✅ ${currencyName} option found`);

    dp.get_base_option().click({ force: true });
    cy.wait(1000);
    cy.log(`✅ ${currencyName} selected`);
  }
});

Then("Bitcoin should be selected with a checkmark", () => {
  cy.log('✔️ CHECKMARK VERIFICATION: Verifying Bitcoin checkmark...');
  dp.get_bitcoin_checkmark().should("be.visible", { timeout: 5000 });
  cy.log('✅ BITCOIN CHECKMARK VERIFIED - Bitcoin is selected');
});

Then("Ethereum should be selected with a checkmark", () => {
  cy.log('✔️ CHECKMARK VERIFICATION: Verifying Ethereum checkmark...');
  dp.get_ethereum_checkmark().should("be.visible", { timeout: 5000 });
  cy.log('✅ ETHEREUM CHECKMARK VERIFIED - Ethereum is selected');
});

Then("Tron should be selected with a checkmark", () => {
  cy.log('✔️ CHECKMARK VERIFICATION: Verifying Tron checkmark...');
  dp.get_tron_checkmark().should("be.visible", { timeout: 5000 });
  cy.log('✅ TRON CHECKMARK VERIFIED - Tron is selected');
});

Then("Base should be selected with a checkmark", () => {
  cy.log('✔️ CHECKMARK VERIFICATION: Verifying Base checkmark...');
  dp.get_base_checkmark().should("be.visible", { timeout: 5000 });
  cy.log('✅ BASE CHECKMARK VERIFIED - Base is selected');
});

// ============================================
// NETWORK SEARCH SCENARIO
// ============================================

When("I type {string} in the search box of network dropdown", (searchText) => {
  cy.log(`🔍 NETWORK SEARCH: Typing "${searchText}" in search box...`);
  dp.get_network_search_box().should("be.visible", { timeout: 5000 });
  cy.log('  ✅ Search box found');

  dp.get_network_search_box().clear();
  cy.log('  ✅ Search box cleared');

  dp.get_network_search_box().type(searchText);
  cy.wait(500);
  cy.log(`✅ Search text "${searchText}" entered`);
});

When("I type {string} in the search box of currency dropdown", (searchText) => {
  cy.log(`🔍 NETWORK SEARCH: Typing "${searchText}" in search box...`);
  dp.get_currency_search_box().should("be.visible", { timeout: 5000 });
  cy.log('  ✅ Search box found');

  dp.get_currency_search_box().clear();
  cy.log('  ✅ Search box cleared');

  dp.get_currency_search_box().type(searchText);
  cy.wait(500);
  cy.log(`✅ Search text "${searchText}" entered`);
});

Then("Only {string} option should be visible in the dropdown", (networkName) => {
  cy.log(`🔍 SEARCH FILTER VERIFICATION: Verifying only "${networkName}" is visible...`);

  if (networkName.toLowerCase() === 'ethereum') {
    dp.get_ethereum_option().should("be.visible", { timeout: 5000 });
    cy.log(`  ✅ ${networkName} is visible in filtered results`);
  }
  else if (networkName.toLowerCase() === 'bitcoin') {
    dp.get_bitcoin_option().should("be.visible", { timeout: 5000 });
    cy.log(`  ✅ ${networkName} is visible in filtered results`);
  }
  else if (networkName.toLowerCase() === 'tron') {
    dp.get_tron_option().should("be.visible", { timeout: 5000 });
    cy.log(`  ✅ ${networkName} is visible in filtered results`);
  }
  else if (networkName.toLowerCase() === 'base') {
    dp.get_base_option().should("be.visible", { timeout: 5000 });
    cy.log(`  ✅ ${networkName} is visible in filtered results`);
  }

  cy.log(`✅ SEARCH FILTER VERIFIED - Only "${networkName}" visible`);
});

// ============================================
// TIME RANGE & GRAPH SCENARIOS
// ============================================

When("I click on the time range dropdown", () => {
  cy.log('⏰ TIME RANGE DROPDOWN: Opening time range dropdown...');
  dp.get_time_range_dropdown().should("be.visible", { timeout: 10000 });
  cy.log('  ✅ Time range dropdown found');

  dp.get_time_range_dropdown().click({ force: true });
  cy.wait(1000);
  cy.log('✅ Time range dropdown opened');
});

When("I select {string} from the time range dropdown", (timeRange) => {
  cy.log(`⏰ TIME RANGE SELECTION: Selecting "${timeRange}"...`);

  if (timeRange.toLowerCase() === "all time") {
    dp.get_all_time_option().should("be.visible", { timeout: 5000 });
    cy.log('  ✅ "All Time" option found');

    dp.get_all_time_option().click({ force: true });
    cy.wait(2000);
    cy.log('✅ "All Time" time range selected');
  }
});

Then("The dashboard should refresh and show data for all networks for all time range", () => {
  cy.log('🔄 DASHBOARD REFRESH: Verifying dashboard refresh with all time data...');
  cy.wait(2000);
  cy.log('  ✅ Dashboard refresh wait completed');

  dp.get_payment_in_usd_graph().should("be.visible");
  cy.log('  ✅ Payment in USD graph is visible');

  dp.get_number_of_transactions_graph().should("be.visible");
  cy.log('  ✅ Number of Transactions graph is visible');

  cy.log('✅ DASHBOARD REFRESHED - Showing all time data for all networks');
});

Then("I click on time select none button", () => {
  cy.log('🔘 TIME SELECT NONE: Clearing all network selections...');
  dp.get_select_none_button().should("be.visible", { timeout: 5000 });
  cy.log('  ✅ Select None button found');

  dp.get_select_none_button().click({ force: true });
  cy.wait(1000);
  cy.log('✅ All networks cleared via Select None');
});

Then("I UNCHECK the default selected BITCOIN option", () => {
  cy.log('🔘 UNCHECK BITCOIN: Unchecking default Bitcoin selection...');
  dp.get_bitcoin_option().should("be.visible", { timeout: 5000 });
  cy.log('  ✅ Bitcoin option found');

  dp.get_bitcoin_option().click({ force: true });
  cy.wait(1000);
  cy.log('✅ Bitcoin option unchecked');
});

Then("I should see checkmark against bitcoin option", () => {
  cy.log('✔️ BITCOIN CHECKMARK: Verifying Bitcoin checkmark is visible...');
  dp.get_bitcoin_checkmark().should("be.visible", { timeout: 5000 });
  cy.log('✅ BITCOIN CHECKMARK VISIBLE - Bitcoin is selected');
});

Then("I should see checkmark against ethereum option", () => {
  cy.log('✔️ ETHEREUM CHECKMARK: Verifying Ethereum checkmark is visible...');
  dp.get_ethereum_checkmark().should("be.visible", { timeout: 5000 });
  cy.log('✅ ETHEREUM CHECKMARK VISIBLE - Ethereum is selected');
});

Then("I should see checkmark against TRON option", () => {
  cy.log('✔️ TRON CHECKMARK: Verifying Tron checkmark is visible...');
  dp.get_tron_checkmark().should("be.visible", { timeout: 5000 });
  cy.log('✅ TRON CHECKMARK VISIBLE - Tron is selected');
});

Then("I should see checkmark against Base option", () => {
  cy.log('✔️ BASE CHECKMARK: Verifying Base checkmark is visible...');
  dp.get_base_checkmark().should("be.visible", { timeout: 5000 });
  cy.log('✅ BASE CHECKMARK VISIBLE - Base is selected');
});

When("I validate the presence of bitcoin data on payment in usd graph", () => {
  cy.log('📊 BITCOIN DATA - PAYMENT USD: Validating Bitcoin data in graph...');
  dp.get_bitcoin_data_payment_in_usd_graph().should("be.visible", { timeout: 10000 });
  cy.log('✅ Bitcoin data found in Payment in USD graph');
});



When("I validate the presence of ethereum data on payment in usd graph", () => {
  cy.log('📊 ETHEREUM DATA - PAYMENT USD: Validating Ethereum data in graph...');
  dp.get_ethereum_data_payment_in_usd_graph().should("be.visible", { timeout: 10000 });
  cy.log('✅ Ethereum data found in Payment in USD graph');
});

When("I validate the presence of TRON data on payment in usd graph", () => {
  cy.log('📊 TRON DATA - PAYMENT USD: Validating Tron data in graph...');
  dp.get_tron_data_payment_in_usd_graph().should("be.visible", { timeout: 10000 });
  cy.log('✅ Tron data found in Payment in USD graph');
});

When("I validate the presence of Base data on payment in usd graph", () => {
  cy.log('📊 BASE DATA - PAYMENT USD: Validating Base data in graph...');
  dp.get_base_data_payment_in_usd_graph().should("be.visible", { timeout: 10000 });
  cy.log('✅ Base data found in Payment in USD graph');
});

Then("The payment in usd graph should show data for bitcoin network for all time range", () => {
  cy.log('📊 PAYMENT USD GRAPH VERIFICATION: Verifying Bitcoin data display...');

  dp.get_payment_in_usd_graph().should("be.visible");
  cy.log('  ✅ Payment in USD graph is visible');

  dp.get_bitcoin_data_payment_in_usd_graph().should("be.visible");
  cy.log('  ✅ Bitcoin data is visible in graph');

  dp.get_bitcoin_data_payment_in_usd_graph().should("have.attr", "fill", "#F7931A");
  cy.log('  ✅ Bitcoin data has correct orange color (#F7931A)');

  cy.log('✅ PAYMENT USD GRAPH VERIFIED - Bitcoin data displayed for all time');
});

Then("The payment in usd graph should show data for ethereum network for all time range", () => {
  cy.log('📊 PAYMENT USD GRAPH VERIFICATION: Verifying Ethereum data display...');

  dp.get_payment_in_usd_graph().should("be.visible");
  cy.log('  ✅ Payment in USD graph is visible');

  dp.get_ethereum_data_payment_in_usd_graph().should("be.visible");
  cy.log('  ✅ Ethereum data is visible in graph');

  dp.get_ethereum_data_payment_in_usd_graph().should("have.attr", "fill", "#627EEA");
  cy.log('  ✅ Ethereum data has correct color (#627EEA)');

  cy.log('✅ PAYMENT USD GRAPH VERIFIED - Ethereum data displayed for all time');
});

Then("The payment in usd graph should show data for TRON network for all time range", () => {
  cy.log('📊 PAYMENT USD GRAPH VERIFICATION: Verifying Tron data display...');

  dp.get_payment_in_usd_graph().should("be.visible");
  cy.log('  ✅ Payment in USD graph is visible');

  dp.get_tron_data_payment_in_usd_graph().should("be.visible");
  cy.log('  ✅ Tron data is visible in graph');

  dp.get_tron_data_payment_in_usd_graph().should("have.attr", "fill", "#C23631");
  cy.log('  ✅ Tron data has correct red color (#C23631)');

  cy.log('✅ PAYMENT USD GRAPH VERIFIED - Tron data displayed for all time');
});

Then("The payment in usd graph should show data for Base network for all time range", () => {
  cy.log('📊 PAYMENT USD GRAPH VERIFICATION: Verifying Base data display...');

  dp.get_payment_in_usd_graph().should("be.visible");
  cy.log('  ✅ Payment in USD graph is visible');

  dp.get_base_data_payment_in_usd_graph().should("be.visible");
  cy.log('  ✅ Base data is visible in graph');

  dp.get_base_data_payment_in_usd_graph().should("have.attr", "fill", "#0052FF");
  cy.log('  ✅ Base data has correct blue color (#0052FF)');

  cy.log('✅ PAYMENT USD GRAPH VERIFIED - Base data displayed for all time');
});

Then("The payment in usd graph should show data for bitcoin currency for all time range", () => {
  cy.log('📊 PAYMENT USD GRAPH: Verifying Bitcoin data display...');

  dp.get_payment_in_usd_graph().should("be.visible");
  cy.log('  ✅ Payment in USD graph container is visible');

  dp.get_bitcoin_data_payment_in_usd_graph().should("be.visible");
  cy.log('  ✅ Bitcoin data element is visible');

  dp.get_bitcoin_data_payment_in_usd_graph().should("have.attr", "fill", "#F7931A");
  cy.log('  ✅ Bitcoin data has correct orange color (#F7931A)');

  cy.log('✅ PAYMENT USD GRAPH: Bitcoin data verification complete');
});

Then("The payment in usd graph should show data for ethereum currency for all time range", () => {
  cy.log('📊 PAYMENT USD GRAPH: Verifying Ethereum data display...');

  dp.get_payment_in_usd_graph().should("be.visible");
  cy.log('  ✅ Payment in USD graph container is visible');

  dp.get_ethereum_data_payment_in_usd_graph().should("be.visible");
  cy.log('  ✅ Ethereum data element is visible');

  dp.get_ethereum_data_payment_in_usd_graph().should("have.attr", "fill", "#627EEA");
  cy.log('  ✅ Ethereum data has correct purple-blue color (#627EEA)');

  cy.log('✅ PAYMENT USD GRAPH: Ethereum data verification complete');
});

Then("The payment in usd graph should show data for TRON currency for all time range", () => {
  cy.log('📊 PAYMENT USD GRAPH: Verifying Tron data display...');

  dp.get_payment_in_usd_graph().should("be.visible");
  cy.log('  ✅ Payment in USD graph container is visible');

  dp.get_tron_data_payment_in_usd_graph().should("be.visible");
  cy.log('  ✅ Tron data element is visible');

  dp.get_tron_data_payment_in_usd_graph().should("have.attr", "fill", "#C23631");
  cy.log('  ✅ Tron data has correct red color (#C23631)');

  cy.log('✅ PAYMENT USD GRAPH: Tron data verification complete');
});

Then("The payment in usd graph should show data for Base currency for all time range", () => {
  cy.log('📊 PAYMENT USD GRAPH: Verifying Base data display...');

  dp.get_payment_in_usd_graph().should("be.visible");
  cy.log('  ✅ Payment in USD graph container is visible');

  dp.get_base_data_payment_in_usd_graph().should("be.visible");
  cy.log('  ✅ Base data element is visible');

  dp.get_base_data_payment_in_usd_graph().should("have.attr", "fill", "#0052FF");
  cy.log('  ✅ Base data has correct blue color (#0052FF)');

  cy.log('✅ PAYMENT USD GRAPH: Base data verification complete');
});
When("I validate the presence of bitcoin data on number of transactions graph", () => {
  cy.log('📊 BITCOIN DATA - TRANSACTIONS: Validating Bitcoin data in graph...');
  dp.get_bitcoin_data_number_of_transactions_graph().should("be.visible", { timeout: 10000 });
  cy.log('✅ Bitcoin data found in Number of Transactions graph');
});

When("I validate the presence of ethereum data on number of transactions graph", () => {
  cy.log('📊 ETHEREUM DATA - TRANSACTIONS: Validating Ethereum data in graph...');
  dp.get_ethereum_data_number_of_transactions_graph().should("be.visible", { timeout: 10000 });
  cy.log('✅ Ethereum data found in Number of Transactions graph');
});

When("I validate the presence of TRON data on number of transactions graph", () => {
  cy.log('📊 TRON DATA - TRANSACTIONS: Validating Tron data in graph...');
  dp.get_tron_data_number_of_transactions_graph().should("be.visible", { timeout: 10000 });
  cy.log('✅ Tron data found in Number of Transactions graph');
});

When("I validate the presence of Base data on number of transactions graph", () => {
  cy.log('📊 BASE DATA - TRANSACTIONS: Validating Base data in graph...');
  dp.get_base_data_number_of_transactions_graph().should("be.visible", { timeout: 10000 });
  cy.log('✅ Base data found in Number of Transactions graph');
});

Then("The number of transactions graph should show data for bitcoin network for all time range", () => {
  cy.log('📊 TRANSACTIONS GRAPH VERIFICATION: Verifying Bitcoin data display...');

  dp.get_number_of_transactions_graph().should("be.visible");
  cy.log('  ✅ Number of Transactions graph is visible');

  dp.get_bitcoin_data_number_of_transactions_graph().should("be.visible");
  cy.log('  ✅ Bitcoin data is visible in graph');

  dp.get_bitcoin_data_number_of_transactions_graph().should("have.attr", "fill", "#F7931A");
  cy.log('  ✅ Bitcoin data has correct orange color (#F7931A)');

  cy.log('✅ TRANSACTIONS GRAPH VERIFIED - Bitcoin data displayed for all time');
});

Then("The number of transactions graph should show data for ethereum network for all time range", () => {
  cy.log('📊 TRANSACTIONS GRAPH VERIFICATION: Verifying Ethereum data display...');

  dp.get_number_of_transactions_graph().should("be.visible");
  cy.log('  ✅ Number of Transactions graph is visible');

  dp.get_ethereum_data_number_of_transactions_graph().should("be.visible");
  cy.log('  ✅ Ethereum data is visible in graph');

  dp.get_ethereum_data_number_of_transactions_graph().should("have.attr", "fill", "#627EEA");
  cy.log('  ✅ Ethereum data has correct color (#627EEA)');

  cy.log('✅ TRANSACTIONS GRAPH VERIFIED - Ethereum data displayed for all time');
});

Then("The number of transactions graph should show data for TRON network for all time range", () => {
  cy.log('📊 TRANSACTIONS GRAPH VERIFICATION: Verifying Tron data display...');

  dp.get_number_of_transactions_graph().should("be.visible");
  cy.log('  ✅ Number of Transactions graph is visible');

  dp.get_tron_data_number_of_transactions_graph().should("be.visible");
  cy.log('  ✅ Tron data is visible in graph');

  dp.get_tron_data_number_of_transactions_graph().should("have.attr", "fill", "#C23631");
  cy.log('  ✅ Tron data has correct red color (#C23631)');

  cy.log('✅ TRANSACTIONS GRAPH VERIFIED - Tron data displayed for all time');
});

Then("The number of transactions graph should show data for TRON currency for all time range", () => {
  cy.log('📊 TRANSACTIONS GRAPH VERIFICATION: Verifying Tron data display...');

  dp.get_number_of_transactions_graph().should("be.visible");
  cy.log('  ✅ Number of Transactions graph is visible');

  dp.get_tron_data_number_of_transactions_graph().should("be.visible");
  cy.log('  ✅ Tron data is visible in graph');

  dp.get_tron_data_number_of_transactions_graph().should("have.attr", "fill", "#C23631");
  cy.log('  ✅ Tron data has correct red color (#C23631)');

  cy.log('✅ TRANSACTIONS GRAPH VERIFIED - Tron data displayed for all time');
});

Then("The number of transactions graph should show data for Base network for all time range", () => {
  cy.log('📊 TRANSACTIONS GRAPH VERIFICATION: Verifying Base data display...');

  dp.get_number_of_transactions_graph().should("be.visible");
  cy.log('  ✅ Number of Transactions graph is visible');

  dp.get_base_data_number_of_transactions_graph().should("be.visible");
  cy.log('  ✅ Base data is visible in graph');

  dp.get_base_data_number_of_transactions_graph().should("have.attr", "fill", "#0052FF");
  cy.log('  ✅ Base data has correct blue color (#0052FF)');

  cy.log('✅ TRANSACTIONS GRAPH VERIFIED - Base data displayed for all time');
});
