Feature: View User Profile
  As a logged-in user,
  I want to view my profile information,
  so that I can see my account details.

  Background:
    Given I am on the chat application
    And I am logged in with Google

  @fast @profile-view
  Scenario: User avatar is displayed in header
    When I navigate to the chat page
    Then I should see my user avatar in the header
    And the avatar should display my profile picture or initials

  @fast @profile-view
  Scenario: Avatar fallback to initials
    Given I don't have a profile picture set
    When I navigate to the chat page
    Then my avatar should display my initials
    And the initials should be based on my name or email

  @slow @profile-view
  Scenario: GitHub profile link
    Given I am on the profile page
    And I have a GitHub username set to "johndoe"
    Then I should see a GitHub link "@johndoe"
    When I click the GitHub link
    Then a new tab should open to "https://github.com/johndoe"
