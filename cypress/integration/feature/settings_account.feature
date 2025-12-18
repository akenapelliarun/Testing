Feature: Account Settings
  As a user
  I want to manage my projects and redirection URLs

  Background:
    Given I am logged in as a valid user
    And I click on the settings tab
    When I click on the account tab

  #TC_SET_01, TC_SET_02
  Scenario: TC_SET_01: Verify Account page and project list
   
    Then the account page should be displayed
    And I scroll to and click on Test Project 3
    Then I should see the PayRam connection QR code card with correct details
    Then I should Logout from the user

  Scenario: TC_SET_07: Update project name and save
   
    And I scroll to and click on Test Project 3
    Then the project details edit save button should be visible
    When I enter the project name
    Then the project details edit save button should be visible
    Then I should Logout from the user

  Scenario: TC_SET_08: Update Website Url and save
   
    And I scroll to and click on Test Project 3
    Then the project details edit save button should be visible
    When I enter the website url
    Then the website url should be entered correctly
    Then the project details edit save button should be visible
    Then I should Logout from the user

  Scenario: TC_SET_09: Update Success URL
   
    And I scroll to and click on Test Project 3
    Then the redirection edit save button should be visible
    When I enter the success url from fixture
    Then the success url should be entered correctly
    Then the redirection edit save button should be visible
    Then I should Logout from the user

  Scenario: TC_SET_10: Update Cancel URL
   
    And I scroll to and click on Test Project 3
    Then the redirection edit save button should be visible
    When I enter the cancel url from fixture
    Then the cancel url should be entered correctly
    Then the redirection edit save button should be visible
    Then I should Logout from the user
  
  Scenario: Update Branding with specific Brand Color and Logo
    And I scroll to and click on Test Project 3 
    When I click on Branding Tab
    And I click on Logo edit
    And I upload the logo "cypress/fixtures/images/logo.png"
    # Brand color is set and verified inside the upload step implementation
  
  Scenario: Update Social Links successfully
    And I scroll to and click on Test Project 3 
    When I click on Branding Tab
    When I click the edit button for Social Links
    And I update the Twitter handle
    And I update the Discord link
    And I update the LinkedIn URL
    And I update the Telegram link
    And I click the save button
    Then the Twitter handle should be updated correctly 
  
  Scenario: Update Support Contact Information
    And I scroll to and click on Test Project 3
    When I click on Branding Tab
    When I click the edit button for Support Information
    And I update the Support Email
    And I update the Reply-To Email
    And I update the From Email
    And I save the Support Information
    Then the Support Email should be updated correctly