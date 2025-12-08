///<reference types = "cypress-xpath"/>

/**
 * Helper function to get base URL based on active environment
 * Usage: const baseUrl = Cypress.env('getBaseUrl')();
 */
Cypress.env('getBaseUrl', () => {
  const activeEnv = Cypress.env('activeEnv') || 'testnet';
  return Cypress.env(activeEnv);
});

/**
 * Custom command to visit a page with environment-aware URL
 * @param {string} path - Path to append to base URL (e.g., '/login', '/dashboard')
 */
Cypress.Commands.add('visitApp', (path = '') => {
  const activeEnv = Cypress.env('activeEnv') || 'testnet';
  const baseUrl = Cypress.env(activeEnv);
  const fullUrl = `${baseUrl}${path}`;
  cy.log(`🌐 Visiting ${activeEnv.toUpperCase()}: ${fullUrl}`);
  cy.visit(fullUrl);
});

/**
 * Custom command to verify input field functionality
 * @param {string} selector - CSS or XPath selector for the input field
 * @param {string} testText - Text to enter for testing
 */
Cypress.Commands.add('verifyInputField', (selector, testText = 'Test Input') => {
  cy.log('**Starting Input Field Verification**');
  
  // Check if field is enabled
  cy.get(selector).should('be.enabled').then(() => {
    cy.log('✓ Input field is ENABLED');
  });
  
  // Check if field is visible
  cy.get(selector).should('be.visible').then(() => {
    cy.log('✓ Input field is VISIBLE');
  });
  
  // Clear the field first
  cy.get(selector).clear().then(() => {
    cy.log('✓ Input field CLEARED initially');
  });
  
  // Verify user can enter characters
  cy.get(selector).type(testText).then(() => {
    cy.log(`✓ Successfully ENTERED text: "${testText}"`);
  });
  
  // Verify the text was entered correctly
  cy.get(selector).should('have.value', testText).then(() => {
    cy.log(`✓ Input field value VERIFIED: "${testText}"`);
  });
  
  // Verify user can delete characters (backspace)
  const deleteCount = 3;
  cy.get(selector).type('{backspace}'.repeat(deleteCount)).then(() => {
    cy.log(`✓ Successfully DELETED ${deleteCount} characters using backspace`);
  });
  
  // Verify characters were deleted
  const expectedValue = testText.slice(0, -deleteCount);
  cy.get(selector).should('have.value', expectedValue).then(() => {
    cy.log(`✓ Deletion VERIFIED: Current value is "${expectedValue}"`);
  });
  
  // Select all and delete using Delete key
  cy.get(selector).type('{selectall}{del}').then(() => {
    cy.log('✓ Successfully DELETED all characters using select all + delete');
  });
  
  // Verify field is empty after deletion
  cy.get(selector).should('have.value', '').then(() => {
    cy.log('✓ Field is EMPTY after deletion');
  });
  
  // Final clear
  cy.get(selector).clear().then(() => {
    cy.log('✓ Input field CLEARED at end');
  });
  
  cy.log('**Input Field Verification Completed Successfully**');
});

/**
 * Alternative command with XPath support
 * @param {string} selector - CSS or XPath selector for the input field
 * @param {string} testText - Text to enter for testing
 * @param {boolean} isXPath - Set to true if selector is XPath
 */
Cypress.Commands.add('verifyInputFieldAdvanced', (selector, testText = 'Test Input', isXPath = false) => {
  const getElement = isXPath ? cy.xpath(selector) : cy.get(selector);
  
  cy.log('**Starting Advanced Input Field Verification**');
  cy.log(`Selector Type: ${isXPath ? 'XPath' : 'CSS'}`);
  
  // Check if field is enabled
  getElement.should('be.enabled').then(() => {
    cy.log('✓ Input field is ENABLED');
  });
  
  // Check if field is visible
  getElement.should('be.visible').then(() => {
    cy.log('✓ Input field is VISIBLE');
  });
  
  // Clear and type
  getElement.clear().type(testText).then(() => {
    cy.log(`✓ Text ENTERED: "${testText}"`);
  });
  
  // Verify
  getElement.should('have.value', testText).then(() => {
    cy.log(`✓ Value VERIFIED: "${testText}"`);
  });
  
  // Delete characters
  getElement.type('{backspace}{backspace}').then(() => {
    cy.log('✓ Characters DELETED');
  });
  
  // Final clear
  getElement.clear().should('have.value', '').then(() => {
    cy.log('✓ Field CLEARED and VERIFIED empty');
  });
  
  cy.log('**Advanced Input Field Verification Completed**');
});

/**
 * Custom command to check for broken links on the page
 * This command will not fail the test, only log broken links
 * Returns broken links data for reporting
 */
Cypress.Commands.add('checkBrokenLinks', () => {
  cy.log('**Starting Broken Links Check**');
  
  const brokenLinks = [];
  let totalLinksChecked = 0;
  
  cy.get('a[href]').each(($link) => {
    const href = $link.prop('href');
    
    // Skip empty, javascript:, mailto:, tel:, and hash links
    if (!href || 
        href.startsWith('javascript:') || 
        href.startsWith('mailto:') || 
        href.startsWith('tel:') || 
        href === '#' ||
        href.endsWith('#')) {
      return;
    }
    
    totalLinksChecked++;
    
    cy.request({
      url: href,
      failOnStatusCode: false,
      timeout: 10000
    }).then((response) => {
      if (response.status >= 400) {
        const brokenLink = {
          url: href,
          status: response.status,
          text: $link.text().trim() || 'No text'
        };
        brokenLinks.push(brokenLink);
        
        // Log to Cypress UI
        cy.log(`❌ BROKEN LINK FOUND: ${href} - Status: ${response.status} - Text: "${brokenLink.text}"`);
        
        // Log to terminal/CI output
        cy.task('log', `❌ BROKEN LINK: ${href} (Status: ${response.status}) - Text: "${brokenLink.text}"`);
      } else {
        cy.log(`✓ Valid link: ${href} - Status: ${response.status}`);
      }
    });
  }).then(() => {
    // Store results in a Cypress alias for access in step definitions
    cy.wrap({
      totalChecked: totalLinksChecked,
      brokenCount: brokenLinks.length,
      brokenLinks: brokenLinks
    }).as('brokenLinksResult');
    
    if (brokenLinks.length > 0) {
      cy.log('**========== BROKEN LINKS SUMMARY ==========**');
      cy.log(`Total links checked: ${totalLinksChecked}`);
      cy.log(`Total broken links found: ${brokenLinks.length}`);
      
      // Log to terminal
      cy.task('log', '\n========== BROKEN LINKS SUMMARY ==========');
      cy.task('log', `Total links checked: ${totalLinksChecked}`);
      cy.task('log', `Total broken links found: ${brokenLinks.length}`);
      
      brokenLinks.forEach((link, index) => {
        cy.log(`${index + 1}. URL: ${link.url}`);
        cy.log(`   Status: ${link.status}`);
        cy.log(`   Link Text: "${link.text}"`);
        
        // Log to terminal
        cy.task('log', `  ${index + 1}. URL: ${link.url} (Status: ${link.status}) - Text: "${link.text}"`);
      });
      
      cy.log('**=========================================**');
      cy.task('log', '==========================================\n');
    } else {
      cy.log(`✓ No broken links found. Total links checked: ${totalLinksChecked}`);
      cy.task('log', `✓ No broken links found. Total links checked: ${totalLinksChecked}`);
    }
  });
});

/**
 * Custom command to check for broken images on the page
 * This command will not fail the test, only log broken images
 * Returns broken images data for reporting
 */
Cypress.Commands.add('checkBrokenImages', () => {
  cy.log('**Starting Broken Images Check**');
  
  const brokenImages = [];
  let totalImagesChecked = 0;
  
  cy.get('img').each(($img) => {
    const src = $img.prop('src');
    const alt = $img.attr('alt') || 'No alt text';
    
    // Skip empty src or data URLs
    if (!src || src.startsWith('data:')) {
      return;
    }
    
    totalImagesChecked++;
    
    // Check if image loaded successfully using naturalWidth
    cy.wrap($img).then(($el) => {
      const img = $el[0];
      
      if (!img.complete || img.naturalWidth === 0) {
        const brokenImage = {
          src: src,
          alt: alt,
          dimensions: `${$img.width()}x${$img.height()}`
        };
        brokenImages.push(brokenImage);
        
        // Log to Cypress UI
        cy.log(`❌ BROKEN IMAGE FOUND: ${src}`);
        cy.log(`   Alt text: "${alt}"`);
        cy.log(`   Dimensions: ${brokenImage.dimensions}`);
        
        // Log to terminal/CI output
        cy.task('log', `❌ BROKEN IMAGE: ${src} - Alt: "${alt}" - Dimensions: ${brokenImage.dimensions}`);
      } else {
        cy.log(`✓ Valid image: ${src} - Size: ${img.naturalWidth}x${img.naturalHeight}`);
      }
    });
  }).then(() => {
    // Store results in a Cypress alias for access in step definitions
    cy.wrap({
      totalChecked: totalImagesChecked,
      brokenCount: brokenImages.length,
      brokenImages: brokenImages
    }).as('brokenImagesResult');
    
    if (brokenImages.length > 0) {
      cy.log('**========== BROKEN IMAGES SUMMARY ==========**');
      cy.log(`Total images checked: ${totalImagesChecked}`);
      cy.log(`Total broken images found: ${brokenImages.length}`);
      
      // Log to terminal
      cy.task('log', '\n========== BROKEN IMAGES SUMMARY ==========');
      cy.task('log', `Total images checked: ${totalImagesChecked}`);
      cy.task('log', `Total broken images found: ${brokenImages.length}`);
      
      brokenImages.forEach((img, index) => {
        cy.log(`${index + 1}. SRC: ${img.src}`);
        cy.log(`   Alt: "${img.alt}"`);
        cy.log(`   Dimensions: ${img.dimensions}`);
        
        // Log to terminal
        cy.task('log', `  ${index + 1}. SRC: ${img.src} - Alt: "${img.alt}" - Dimensions: ${img.dimensions}`);
      });
      
      cy.log('**==========================================**');
      cy.task('log', '==========================================\n');
    } else {
      cy.log(`✓ No broken images found. Total images checked: ${totalImagesChecked}`);
      cy.task('log', `✓ No broken images found. Total images checked: ${totalImagesChecked}`);
    }
  });
});

/**
 * Custom command for clicking with automatic retries and wait
 * Handles flakiness by retrying the click operation
 * @param {string} selector - Element selector
 * @param {object} options - Click options including timeout
 */
Cypress.Commands.add('clickWithRetry', (selector, options = {}) => {
  const defaultOptions = {
    timeout: 10000,
    force: false,
    multiple: false,
    ...options
  };
  
  cy.get(selector, { timeout: defaultOptions.timeout })
    .should('be.visible')
    .should('not.be.disabled')
    .click({ force: defaultOptions.force, multiple: defaultOptions.multiple });
});

/**
 * Custom command for typing with automatic retries
 * Handles flakiness by ensuring element is ready before typing
 * @param {string} selector - Element selector
 * @param {string} text - Text to type
 * @param {object} options - Type options
 */
Cypress.Commands.add('typeWithRetry', (selector, text, options = {}) => {
  const defaultOptions = {
    timeout: 10000,
    delay: 0,
    force: false,
    ...options
  };
  
  cy.get(selector, { timeout: defaultOptions.timeout })
    .should('be.visible')
    .should('not.be.disabled')
    .clear()
    .type(text, { delay: defaultOptions.delay, force: defaultOptions.force });
});

/**
 * Custom command to wait for element and verify it exists
 * More reliable than just cy.get() for flaky elements
 * @param {string} selector - Element selector
 * @param {object} options - Wait options
 */
Cypress.Commands.add('waitForElement', (selector, options = {}) => {
  const defaultOptions = {
    timeout: 15000,
    ...options
  };
  
  cy.get(selector, { timeout: defaultOptions.timeout })
    .should('exist')
    .should('be.visible');
});

/**
 * Custom command for selecting dropdown with retry logic
 * Handles flaky dropdowns by ensuring options are loaded
 * @param {string} dropdownSelector - Dropdown button selector
 * @param {string} optionText - Option text to select
 * @param {object} options - Options
 */
Cypress.Commands.add('selectDropdownWithRetry', (dropdownSelector, optionText, options = {}) => {
  const defaultOptions = {
    timeout: 10000,
    ...options
  };
  
  // Click dropdown
  cy.get(dropdownSelector, { timeout: defaultOptions.timeout })
    .should('be.visible')
    .click({ force: true });
  
  // Wait for dropdown options to load
  cy.wait(500);
  
  // Select option with retry
  cy.contains(optionText)
    .should('be.visible')
    .scrollIntoView()
    .click({ force: true });
});

/**
 * Custom command to handle API waiting with retries
 * Use this instead of cy.intercept when you need retry logic
 * @param {string} url - API URL pattern
 * @param {number} timeout - Wait timeout
 */
Cypress.Commands.add('waitForApiWithRetry', (url, timeout = 30000) => {
  cy.intercept(url).as('apiCall');
  cy.wait('@apiCall', { timeout: timeout, requestTimeout: timeout });
});

