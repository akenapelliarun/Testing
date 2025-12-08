Feature: Dashboard
    As a user
    I want to view my dashboard
    and want to validate broken links and data present on the dashboard page
   
  Scenario: User views dashboard
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
   
  Scenario: Validate broken links on dashboard
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    When I check for broken links on the dashboard page
    Then there should be no broken links present
     
  Scenario: Validate data on dashboard
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    When I validate the presence of key data on the dashboard
    Then all key data elements should be present and correct
   
  Scenario: Validate widgets on dashboard
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    When I validate the presence of widgets on the dashboard
    Then all widgets should be present and functioning correctly
   
  Scenario: validate the value and data to be visible on "total payments" widget
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    Then i navigate to "total payments" widget
    When I check the "total payments" widget
    Then the "total payments" value and data should be visible and it should be greater than 0
   
  Scenario: validate the value and data to be visible on "payment in last 30 days" widget
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    Then i navigate to "payment in last 30 days" widget
    When I check the "payment in last 30 days" widget
    Then the "payment in last 30 days" value and data should be visible and it should be greater than 0
   
  Scenario: validate the value and data to be visible on "total paying users" widget
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    Then i navigate to "total paying users" widget
    When I check the "total paying users" widget and extract the value
    Then the "total paying users" value and data should be visible and it should be greater than 0
   
  Scenario: validate the value and data to be visible on "paying users in last 30 days" widget
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    Then i navigate to "paying users in last 30 days" widget
    When I check the "paying users in last 30 days" widget and extract the value
    Then the "paying users in last 30 days" value and data should be visible and it should be greater than 0
   
  Scenario: validate the value and data to be visible on "Total users requested payments" widget
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    Then i navigate to "Total users requested payments" widget
    When I check the "Total users requested payments" widget and extract the value
    Then the "Total users requested payments" value and data should be visible and it should be greater than 0
   
  Scenario: validate the value and data to be visible on "User attempted in last 30 days" widget
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    Then i navigate to "User attempted in last 30 days" widget
    When I check the "User attempted in last 30 days" widget and extract the value
    Then the "User attempted in last 30 days" value and data should be visible and it should be greater than 0
   
  Scenario: validate whether the user is able to select bitcoin from network dropdown
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    When I click on the network dropdown on dashboard
    Then I click on select none button
    And I select "bitcoin" from the network dropdown
    Then Bitcoin should be selected with a checkmark
   
  Scenario: validate whether the user is able to select ethereum from network dropdown
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    When I click on the network dropdown on dashboard
    Then I click on select none button
    And I select "ethereum" from the network dropdown
    Then I UNCHECK the default selected BITCOIN option
    Then Ethereum should be selected with a checkmark
   
  Scenario: validate whether the user is able to select tron from network dropdown
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    When I click on the network dropdown on dashboard
    Then I click on select none button
    And I select "tron" from the network dropdown
    Then I UNCHECK the default selected BITCOIN option
    Then Tron should be selected with a checkmark
   
  Scenario: validate whether the user is able to select base from network dropdown
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    When I click on the network dropdown on dashboard
    Then I click on select none button
    And I select "base" from the network dropdown
    Then I UNCHECK the default selected BITCOIN option
    Then Base should be selected with a checkmark
   
  Scenario: validate whether the user is able to search inside network selection dropdown
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    When I click on the network dropdown on dashboard
    And I type "eth" in the search box of network dropdown
    Then Only "ethereum" option should be visible in the dropdown
   
  Scenario: validate whether the user is able to see all time data for bitcoin network inside payment in usd graph for network filter
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    When I click on the time range dropdown
    And I select "all time" from the time range dropdown
    Then The dashboard should refresh and show data for all networks for all time range
    When I click on the network dropdown on dashboard
    Then I click on time select none button
    When I select "bitcoin" from the network dropdown
    Then I should see checkmark against bitcoin option
    When I validate the presence of bitcoin data on payment in usd graph
    Then The payment in usd graph should show data for bitcoin network for all time range
   
  Scenario: validate whether the user is able to see all time data for bitcoin network inside number of transactions graph for network filter
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    When I click on the time range dropdown
    And I select "all time" from the time range dropdown
    Then The dashboard should refresh and show data for all networks for all time range
    When I click on the network dropdown on dashboard
    Then I click on time select none button
    When I select "bitcoin" from the network dropdown
    Then I should see checkmark against bitcoin option
    When I validate the presence of bitcoin data on number of transactions graph
    Then The number of transactions graph should show data for bitcoin network for all time range
   
  Scenario: validate whether the user is able to see all time data for ethereum network inside payment in usd graph for network filter
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    When I click on the time range dropdown
    And I select "all time" from the time range dropdown
    Then The dashboard should refresh and show data for all networks for all time range
    When I click on the network dropdown on dashboard
    Then I click on time select none button
    When I select "ethereum" from the network dropdown
    Then I UNCHECK the default selected BITCOIN option
    Then I should see checkmark against ethereum option
    When I validate the presence of ethereum data on payment in usd graph
    Then The payment in usd graph should show data for ethereum network for all time range
   
  Scenario: validate whether the user is able to see all time data for ethereum network inside number of transactions graph for network filter
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    When I click on the time range dropdown
    And I select "all time" from the time range dropdown
    Then The dashboard should refresh and show data for all networks for all time range
    When I click on the network dropdown on dashboard
    Then I click on time select none button
    When I select "ethereum" from the network dropdown
    Then I UNCHECK the default selected BITCOIN option
    Then I should see checkmark against ethereum option
    When I validate the presence of ethereum data on number of transactions graph
    Then The number of transactions graph should show data for ethereum network for all time range
   
  Scenario: validate whether the user is able to see all time data for TRON network inside payment in usd graph for network filter
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    When I click on the time range dropdown
    And I select "all time" from the time range dropdown
    Then The dashboard should refresh and show data for all networks for all time range
    When I click on the network dropdown on dashboard
    Then I click on time select none button
    When I select "tron" from the network dropdown
    Then I UNCHECK the default selected BITCOIN option
    Then I should see checkmark against TRON option
    When I validate the presence of TRON data on payment in usd graph
    Then The payment in usd graph should show data for TRON network for all time range
   
  Scenario: validate whether the user is able to see all time data for TRON network inside number of transactions graph for network filter
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    When I click on the time range dropdown
    And I select "all time" from the time range dropdown
    Then The dashboard should refresh and show data for all networks for all time range
    When I click on the network dropdown on dashboard
    Then I click on time select none button
    When I select "tron" from the network dropdown
    Then I UNCHECK the default selected BITCOIN option
    Then I should see checkmark against TRON option
    When I validate the presence of TRON data on number of transactions graph
    Then The number of transactions graph should show data for TRON network for all time range
   
  Scenario: validate whether the user is able to see all time data for Base network inside payment in usd graph for network filter
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    When I click on the time range dropdown
    And I select "all time" from the time range dropdown
    Then The dashboard should refresh and show data for all networks for all time range
    When I click on the network dropdown on dashboard
    Then I click on time select none button
    When I select "base" from the network dropdown
    Then I UNCHECK the default selected BITCOIN option
    Then I should see checkmark against Base option
    When I validate the presence of Base data on payment in usd graph
    Then The payment in usd graph should show data for Base network for all time range

  Scenario: validate whether the user is able to see all time data for Base network inside number of transactions graph for network filter
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    When I click on the time range dropdown
    And I select "all time" from the time range dropdown
    Then The dashboard should refresh and show data for all networks for all time range
    When I click on the network dropdown on dashboard
    Then I click on time select none button
    When I select "base" from the network dropdown
    Then I UNCHECK the default selected BITCOIN option
    Then I should see checkmark against Base option
    When I validate the presence of Base data on number of transactions graph
    Then The number of transactions graph should show data for Base network for all time range

  Scenario: validate whether the user is able to select bitcoin from currency dropdown
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    When I click on the currency dropdown on dashboard
    Then I click on select none button
    And I select "bitcoin" from the currency dropdown
    Then Bitcoin should be selected with a checkmark

  Scenario: validate whether the user is able to select ethereum from currency dropdown
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    When I click on the currency dropdown on dashboard
    Then I click on select none button
    And I select "ethereum" from the currency dropdown
    Then I UNCHECK the default selected BITCOIN option
    Then Ethereum should be selected with a checkmark

  Scenario: validate whether the user is able to select tron from currency dropdown
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    When I click on the currency dropdown on dashboard
    Then I click on select none button
    And I select "tron" from the currency dropdown
    Then I UNCHECK the default selected BITCOIN option
    Then Tron should be selected with a checkmark

  Scenario: validate whether the user is able to select base from currency dropdown
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    When I click on the currency dropdown on dashboard
    Then I click on select none button
    And I select "base" from the currency dropdown
    Then I UNCHECK the default selected BITCOIN option
    Then Base should be selected with a checkmark
  
  Scenario: validate whether the user is able to search inside currency selection dropdown
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    When I click on the currency dropdown on dashboard
    And I type "eth" in the search box of currency dropdown
    Then Only "ethereum" option should be visible in the dropdown

  Scenario: validate whether the user is able to see all time data for bitcoin currency inside payment in usd graph for currency filter
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    When I click on the time range dropdown
    And I select "all time" from the time range dropdown
    When I click on the currency dropdown on dashboard
    Then I click on time select none button
    When I select "bitcoin" from the currency dropdown
    Then I should see checkmark against bitcoin option
    When I validate the presence of bitcoin data on payment in usd graph
    Then The payment in usd graph should show data for bitcoin currency for all time range

  Scenario: validate whether the user is able to see all time data for bitcoin currency inside number of transactions graph for currency filter
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    When I click on the time range dropdown
    And I select "all time" from the time range dropdown
    When I click on the currency dropdown on dashboard
    Then I click on time select none button
    When I select "bitcoin" from the currency dropdown
    Then I should see checkmark against bitcoin option
    When I validate the presence of bitcoin data on number of transactions graph
    Then The number of transactions graph should show data for bitcoin currency for all time range

  Scenario: validate whether the user is able to see all time data for ethereum currency inside payment in usd graph for currency filter
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    When I click on the time range dropdown
    And I select "all time" from the time range dropdown
    When I click on the currency dropdown on dashboard
    Then I click on time select none button
    When I select "ethereum" from the currency dropdown
    Then I UNCHECK the default selected BITCOIN option
    Then I should see checkmark against ethereum option
    When I validate the presence of ethereum data on payment in usd graph
    Then The payment in usd graph should show data for ethereum currency for all time range

  Scenario: validate whether the user is able to see all time data for ethereum currency inside number of transactions graph for currency filter
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    When I click on the time range dropdown
    And I select "all time" from the time range dropdown
    When I click on the currency dropdown on dashboard
    Then I click on time select none button
    When I select "ethereum" from the currency dropdown
    Then I UNCHECK the default selected BITCOIN option
    Then I should see checkmark against ethereum option
    When I validate the presence of ethereum data on number of transactions graph
    Then The number of transactions graph should show data for ethereum currency for all time range

  Scenario: validate whether the user is able to see all time data for TRON currency inside payment in usd graph for currency filter
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    When I click on the time range dropdown
    And I select "all time" from the time range dropdown
    When I click on the currency dropdown on dashboard
    Then I click on time select none button
    When I select "tron" from the currency dropdown
    Then I UNCHECK the default selected BITCOIN option
    Then I should see checkmark against TRON option
    When I validate the presence of TRON data on payment in usd graph
    Then The payment in usd graph should show data for TRON currency for all time range
  
  Scenario: validate whether the user is able to see all time data for TRON currency inside number of transactions graph for currency filter
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    When I click on the time range dropdown
    And I select "all time" from the time range dropdown
    When I click on the currency dropdown on dashboard
    Then I click on time select none button
    When I select "tron" from the currency dropdown
    Then I UNCHECK the default selected BITCOIN option
    Then I should see checkmark against TRON option
    When I validate the presence of TRON data on number of transactions graph
    Then The number of transactions graph should show data for TRON currency for all time range

  Scenario: validate whether the user is able to see all time data for Base currency inside payment in usd graph for currency filter
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    When I click on the time range dropdown
    And I select "all time" from the time range dropdown
    When I click on the currency dropdown on dashboard
    Then I click on time select none button
    When I select "base" from the currency dropdown
    Then I UNCHECK the default selected BITCOIN option
    Then I should see checkmark against Base option
    When I validate the presence of Base data on payment in usd graph
    Then The payment in usd graph should show data for Base currency for all time range

  Scenario: validate whether the user is able to see all time data for Base currency inside number of transactions graph for currency filter
    Given I am logged in as a valid user
    When I navigate to the home page
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    Then I click on the dashboard link
    Then I should see the dashboard page
    When I click on the time range dropdown
    And I select "all time" from the time range dropdown
    Then The dashboard should refresh and show data for all networks for all time range
    When I click on the currency dropdown on dashboard
    Then I click on time select none button
    When I select "base" from the currency dropdown
    Then I UNCHECK the default selected BITCOIN option
    Then I should see checkmark against Base option
    When I validate the presence of Base data on number of transactions graph
    Then The number of transactions graph should show data for Base currency for all time range
