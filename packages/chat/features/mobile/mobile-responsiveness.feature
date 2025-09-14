@mobile
Feature: Mobile Responsiveness
  As a mobile user
  I want the chat application to work well on my device
  So that I can chat on the go

  Background:
    Given I am using a mobile device
    And I am logged in as a user
    And I am on the chat page

  Scenario: Show mobile menu on small screens
    Then I should see the mobile menu button
    And the desktop sidebar should not be visible
    When I click the mobile menu button
    Then the sidebar should slide in

  Scenario: Touch-friendly buttons
    Then all interactive buttons should be at least 44px tall
    And tap targets should have adequate spacing

  Scenario Outline: Test on different mobile devices
    Given I am using a "<device>" device
    When I navigate to the chat page
    Then the layout should be responsive
    And all features should be accessible

    Examples:
      | device         |
      | iPhone 12      |
      | Pixel 5        |
      | iPad Mini      |
      | Galaxy S21     |