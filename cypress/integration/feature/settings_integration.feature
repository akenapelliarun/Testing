Feature: Settings
  As a user
  I want to view my dashboard
  and want to validate broken links and data present on the dashboard page

  Scenario: TC_SET_01: Verify Test connection of Network
    Given I am logged in as a valid user
    Given I click on the settings tab
    When I click on the integration tab
    Then I should see the following supported networks:
      | Base     |
      | Bitcoin  |
      | Ethereum |
      | Tron     |

  Scenario:TC_SET_02: Verify Base Test Connection
    Given I am logged in as a valid user
    Given I click on the settings tab
    When I click on the integration tab
    When I click on the three dots for "Base"
    And I click on test connection
    Then I should see the connection success message

  Scenario:TC_SET_03: Verify Bitcoin Test Connection
    Given I am logged in as a valid user
    Given I click on the settings tab
    When I click on the integration tab
    When I click on the three dots for "Bitcoin"
    And I click on test connection
    Then I should see the connection success message

  Scenario: TC_SET_04 Verify Ethereum Test Connection
    Given I am logged in as a valid user
    Given I click on the settings tab
    When I click on the integration tab
    When I click on the three dots for "Ethereum"
    And I click on test connection
    Then I should see the connection success message

  Scenario: TC_SET_05; Verify Tron Test Connection
    Given I am logged in as a valid user
    Given I click on the settings tab
    When I click on the integration tab
    When I click on the three dots for "Tron"
    And I click on test connection
    Then I should see the connection success message
  
  Scenario: TC_SET_06: Verify Base Network update
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

    Scenario: TC_SET_07: Verify Bitcoin Network update
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

    Scenario: TC_SET_08: Verify Ethereum Network update
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

    Scenario: TC_SET_09: Verify Tron Network update
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