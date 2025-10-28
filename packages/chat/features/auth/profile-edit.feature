Feature: Edit User Profile
  As a logged-in user,
  I want to edit my profile information,
  so that I can keep my account details up to date.

  Background:
    Given I am on the chat application
    And I am logged in with Google

  @fast @profile-edit
  Scenario: Edit profile information
    Given I am on the profile page
    When I click the "Edit Profile" button
    Then the form fields should become editable
    And I should see "Save Changes" and "Cancel" buttons

  @slow @profile-edit
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

  @fast @profile-edit
  Scenario: Cancel profile editing
    Given I am on the profile page
    And I have clicked "Edit Profile"
    When I make changes to the form fields
    And I click "Cancel"
    Then the form should return to read-only mode
    And my changes should not be saved
    And the fields should show the original values
