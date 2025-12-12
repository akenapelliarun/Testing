Feature: Account Settings
  As a user
  I want to manage my projects and redirection URLs
  
  Scenario: Verify Account page and project list
    Given I am logged in as a valid user
    And I click on the settings tab
    When I click on the account tab
    Then the account page should be displayed
    And I scroll to and click on Test Project 3
  
  Scenario: Upadte project details and save
    Given I am logged in as a valid user
    And I click on the settings tab
    When I click on the account tab
    And I scroll to and click on Test Project 3
    Then the project details edit save button should be visible
    When I enter the project name
    When the website url should be entered correctly
    Then the project details edit save button should be visible

  Scenario: Update Redirection URL
    Given I am logged in as a valid user
    And I click on the settings tab
    When I click on the account tab
    And I scroll to and click on Test Project 3
    Then the redirection edit save button should be visible
    When I enter the success url from fixture
    When I enter the cancel url from fixture
    Then the success url should be entered correctly
    Then the cancel url should be entered correctly
    Then the redirection edit save button should be visible


