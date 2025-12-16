Feature: Account Settings
  As a user
  I want to manage my projects and redirection URLs

  #TC_SET_01, TC_SET_02
  Scenario: TC_SET_01: Verify Account page and project list
    Given I am logged in as a valid user
    And I click on the settings tab
    When I click on the account tab
    Then the account page should be displayed
    And I scroll to and click on Test Project 3
    Then I should see the PayRam connection QR code card with correct details
    Then I should Logout from the user

  Scenario: TC_SET_07: Update project name and save
    Given I am logged in as a valid user
    And I click on the settings tab
    When I click on the account tab
    And I scroll to and click on Test Project 3
    Then the project details edit save button should be visible
    When I enter the project name
    Then the project details edit save button should be visible
    Then I should Logout from the user

  Scenario: TC_SET_08: Update Website Url and save
    Given I am logged in as a valid user
    And I click on the settings tab
    When I click on the account tab
    And I scroll to and click on Test Project 3
    Then the project details edit save button should be visible
    When I enter the website url
    Then the website url should be entered correctly
    Then the project details edit save button should be visible
    Then I should Logout from the user

  Scenario: TC_SET_09: Update Success URL
    Given I am logged in as a valid user
    And I click on the settings tab
    When I click on the account tab
    And I scroll to and click on Test Project 3
    Then the redirection edit save button should be visible
    When I enter the success url from fixture
    Then the success url should be entered correctly
    Then the redirection edit save button should be visible
    Then I should Logout from the user

  Scenario: TC_SET_10: Update Cancel URL
    Given I am logged in as a valid user
    And I click on the settings tab
    When I click on the account tab
    And I scroll to and click on Test Project 3
    Then the redirection edit save button should be visible
    When I enter the cancel url from fixture
    Then the cancel url should be entered correctly
    Then the redirection edit save button should be visible
    Then I should Logout from the user