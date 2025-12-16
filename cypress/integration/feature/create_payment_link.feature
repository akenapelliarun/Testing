Feature: Create Payment Link
    As a user
    I want to create a payment link
    So that I can share it with others to receive payments
 
  Scenario: Successfully checking able to search member by email while creating payment link
    Given I login to the application with valid credentials
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    When I clicked on payment links option from the side menu
    And I clicked on create payment link button
    And I check landed to create payment link page
    And I click on search member by email option
    Then I should be able to search member by email
    When I search for a member with email "ankit@payram.com"
    And I select the member from the search results
    Then I should see the member details like email and customer id populated in the respective fields
  
  Scenario: Successfully is able to add new member while creating payment link
    Given I login to the application with valid credentials
    Then I click on the projects dropdown
    And I select "test project 3" from the dropdown
    When I clicked on payment links option from the side menu
    And I clicked on create payment link button
    And I check landed to create payment link page
    Then I click on search member by email option
    And I click on add new member option
    Then I enter the mail "ankit@payram.com" inside mail field
    When I click on project dropdown inside add new member popup and select "test project 3"
    Then I click on add member button
    And I should see the newly added member details like email and customer id populated in the respective fields

 

