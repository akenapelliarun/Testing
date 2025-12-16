Feature: Login
    As a user
    I want to log in to the application
    So that I can access my account
    
    Scenario: TC_LOGIN_01: Successful login with valid credentials
        Given I am on the login page
        When I enter valid credentials
        And I click the login button
        Then I should be redirected to the dashboard
    
    Scenario: TC_LOGIN_02: Unsuccessful login with invalid credentials
        Given I am on the login page
        When I enter invalid credentials
        And I click the login button
        Then I should see an error message indicating invalid login
        
    Scenario: TC_LOGIN_03: Checking broken links on login page
        Given I am on the login page
        When I check all links on the page
        Then I should not find any broken links