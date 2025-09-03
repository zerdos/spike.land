Feature: WebSocket Real-time Features
  As a user
  I want real-time updates through WebSocket
  So that I can see live updates and notifications

  Background:
    Given I am logged in as a user
    And I am on the chat page

  @smoke
  Scenario: WebSocket connection status
    Then I should see the connection status as "connected"

  Scenario: Show typing indicators from other users
    Given another user is in the same conversation
    When the other user starts typing
    Then I should see a typing indicator for the other user

  @flaky
  Scenario: Reconnect on connection loss
    Given I have an active WebSocket connection
    When the connection is lost
    Then the connection status should show "reconnecting"
    And the connection should be restored within 10 seconds