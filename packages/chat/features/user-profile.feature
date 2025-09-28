Feature: User Profile Management
  As a logged-in user
  I want to view and manage my profile
  So that I can customize my account details

  Background:
    Given I am on the chat application
    And I am logged in with Google

  @avatar
  Scenario: User avatar is displayed in header
    When I navigate to the chat page
    Then I should see my user avatar in the header
    And the avatar should display my profile picture or initials

  @dropdown
  Scenario: User dropdown menu functionality
    When I click on my user avatar
    Then I should see a dropdown menu with the following options:
      | option           |
      | Profile Settings |
      | Dashboard        |
      | Sign Out         |
    And I should see my name and email in the dropdown header

  @signout
  Scenario: Sign out functionality
    When I click on my user avatar
    And I click on "Sign Out" in the dropdown
    Then I should be signed out
    And I should be redirected to the home page
    And I should see the "Sign In" button

  @profile-navigation
  Scenario: Navigate to profile page via avatar
    When I click on my user avatar
    And I click on "Profile Settings" in the dropdown
    Then I should be redirected to the profile page
    And I should see the profile settings form

  @profile-view
  Scenario: View profile information
    Given I am on the profile page
    Then I should see my profile avatar
    And I should see my email address
    And I should see input fields for:
      | field           |
      | Nickname        |
      | First Name      |
      | Last Name       |
      | GitHub Username |
    And the email field should be read-only

  @profile-edit
  Scenario: Edit profile information
    Given I am on the profile page
    When I click the "Edit Profile" button
    Then the form fields should become editable
    And I should see "Save Changes" and "Cancel" buttons

  @profile-save
  Scenario: Save profile changes
    Given I am on the profile page
    And I have clicked "Edit Profile"
    When I update my nickname to "TestUser123"
    And I update my first name to "John"
    And I update my last name to "Doe"
    And I update my GitHub username to "johndoe"
    And I click "Save Changes"
    Then I should see a success message "Profile updated successfully!"
    And the form should return to read-only mode
    And my changes should be saved

  @profile-cancel
  Scenario: Cancel profile editing
    Given I am on the profile page
    And I have clicked "Edit Profile"
    When I make changes to the form fields
    And I click "Cancel"
    Then the form should return to read-only mode
    And my changes should not be saved
    And the fields should show the original values

  @github-link
  Scenario: GitHub profile link
    Given I am on the profile page
    And I have a GitHub username set to "johndoe"
    Then I should see a GitHub link "@johndoe"
    When I click the GitHub link
    Then a new tab should open to "https://github.com/johndoe"

  @profile-signout
  Scenario: Sign out from profile page
    Given I am on the profile page
    When I click the "Sign Out" button in the danger zone
    Then I should be signed out
    And I should be redirected to the home page

  @avatar-fallback
  Scenario: Avatar fallback to initials
    Given I don't have a profile picture set
    When I navigate to the chat page
    Then my avatar should display my initials
    And the initials should be based on my name or email