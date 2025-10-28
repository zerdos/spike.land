Feature: User Profile Management
  As a logged-in user,
  I want to view and manage my profile,
  so that I can customize my account details.

  Background:
    Given I am on the chat application
    And I am logged in with Google

  @fast @dropdown
  Scenario: User dropdown menu functionality
    When I click on my user avatar
    Then I should see a dropdown menu with the following options:
      | option           |
      | Profile Settings |
      | Dashboard        |
      | Sign Out         |
    And I should see my name and email in the dropdown header

  @slow @signout
  Scenario: Sign out functionality
    When I click on my user avatar
    And I click on "Sign Out" in the dropdown
    Then I should be signed out
    And I should be redirected to the home page
    And I should see the "Sign In" button

  @fast @profile-navigation
  Scenario: Navigate to profile page via avatar
    When I click on my user avatar
    And I click on "Profile Settings" in the dropdown
    Then I should be redirected to the profile page
    And I should see the profile settings form

  @slow @profile-signout
  Scenario: Sign out from profile page
    Given I am on the profile page
    When I click the "Sign Out" button in the danger zone
    Then I should be signed out
    And I should be redirected to the home page
