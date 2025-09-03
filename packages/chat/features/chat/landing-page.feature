Feature: Landing Page
  As a visitor
  I want to see the landing page
  So that I can understand the chat application and start using it

  Background:
    Given I am on the landing page

  @smoke
  Scenario: View landing page elements
    Then I should see the page title containing "Chat"
    And I should see the "Start Chatting" button

  Scenario: Navigate to chat after login
    When I click the "Login" button
    And I successfully authenticate
    Then I should be redirected to "/chat"