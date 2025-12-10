Feature: Settings
  As a user
  I want to view my dashboard
  and want to validate broken links and data present on the dashboard page

  Scenario: Verify Test connection of Network
    Given I am logged in as a valid user
    Given I click on the settings tab
    When I click on the integration tab
    Then I should see the following supported networks:
      | Base     |
      | Bitcoin  |
      | Ethereum |
      | Tron     |

  Scenario: Verify Base Test Connection
    Given I am logged in as a valid user
    Given I click on the settings tab
    When I click on the integration tab
    When I click on the three dots for "Base"
    And I click on test connection
    Then I should see the connection success message

  Scenario: Verify Bitcoin Test Connection
    Given I am logged in as a valid user
    Given I click on the settings tab
    When I click on the integration tab
    When I click on the three dots for "Bitcoin"
    And I click on test connection
    Then I should see the connection success message

  Scenario: Verify Ethereum Test Connection
    Given I am logged in as a valid user
    Given I click on the settings tab
    When I click on the integration tab
    When I click on the three dots for "Ethereum"
    And I click on test connection
    Then I should see the connection success message

  Scenario: Verify Tron Test Connection
    Given I am logged in as a valid user
    Given I click on the settings tab
    When I click on the integration tab
    When I click on the three dots for "Tron"
    And I click on test connection
    Then I should see the connection success message
  
  Scenario: Verify Base Network update
    Given I am logged in as a valid user
    And I click on the settings tab
    When I click on the integration tab
    And I click on the three dots for "Base"
    And I click on edit
    And I type email in the server url input
    And I type username in the username input
    And I type password in the password input
    And I click on the save details
    Then I should see the "Node details saved successfully" message

    Scenario: Verify Bitcoin Network update
    Given I am logged in as a valid user
    And I click on the settings tab
    When I click on the integration tab
    And I click on the three dots for "Bitcoin"
    And I click on edit
    And I type email in the server url input
    And I type server key  in the server key input
    And I type username in the username input
    And I type password in the password input
    And I click on the save details
    Then I should see the "Node details saved successfully" message

    Scenario: Verify Ethereum Network update
    Given I am logged in as a valid user
    And I click on the settings tab
    When I click on the integration tab
    And I click on the three dots for "Ethereum"
    And I click on edit
    And I type email in the server url input
    And I type server key  in the server key input
    And I type username in the username input
    And I type password in the password input
    And I click on the save details
    Then I should see the "Node details saved successfully" message

    Scenario: Verify Tron Network update
    Given I am logged in as a valid user
    And I click on the settings tab
    When I click on the integration tab
    And I click on the three dots for "Tron"
    And I click on edit
    And I type email in the server url input
    And I type server key  in the server key input
    And I type username in the username input
    And I type password in the password input
    And I click on the save details
    Then I should see the "Node details saved successfully" message