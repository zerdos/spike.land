Feature: Google Authentication
  As a user
  I want to authenticate with my Google account
  So that I can access the chat application seamlessly

  Background:
    Given I am on the landing page
    And the application is running

  @auth @google @smoke
  Scenario: User signs in with Google for the first time
    Given I am not authenticated
    When I click the "Sign in with Google" button
    And I complete the Google OAuth flow
    Then I should be authenticated
    And I should see my user profile
    And I should have 100 credits as a new free user
    And my Google account information should be saved

  @auth @google
  Scenario: Existing user signs in with Google
    Given I have previously registered with Google
    When I click the "Sign in with Google" button
    And I complete the Google OAuth flow
    Then I should be authenticated
    And I should see my previous conversation history
    And my subscription tier should be preserved

  @auth @google
  Scenario: Google authentication is cancelled
    Given I am not authenticated
    When I click the "Sign in with Google" button
    And I cancel the Google OAuth flow
    Then I should not be authenticated
    And I should see the login prompt
    And I should see a message "Authentication cancelled"

  @auth @google @error
  Scenario: Google authentication fails
    Given I am not authenticated
    When I click the "Sign in with Google" button
    And the Google OAuth flow fails with an error
    Then I should not be authenticated
    And I should see an error message "Authentication failed. Please try again."
    And I should be able to retry authentication

  @auth @google @session
  Scenario: User signs out and signs back in with Google
    Given I am logged in with Google as a "free" user
    When I sign out
    And I click the "Sign in with Google" button
    And I complete the Google OAuth flow
    Then I should be authenticated
    And I should see my previous conversation history
    And my credits should be restored

  @auth @google @upgrade
  Scenario: Google authenticated user upgrades subscription
    Given I am logged in with Google as a "free" user
    When I navigate to the subscription page
    And I upgrade to "pro" subscription
    Then I should see the "pro" tier badge
    And I should have 2000 credits
    And my Google authentication should remain active

  @auth @google @mobile
  Scenario: Google authentication on mobile device
    Given I am using a mobile device
    And I am not authenticated
    When I click the "Sign in with Google" button
    And I complete the Google OAuth flow on mobile
    Then I should be authenticated
    And the mobile interface should adapt to authenticated state
    And I should be able to start a conversation

  @auth @google @persistence
  Scenario: Google authentication persists across sessions
    Given I am logged in with Google as a "pro" user
    When I close the browser
    And I open the application again
    Then I should still be authenticated
    And I should see my user profile
    And my conversation history should be available