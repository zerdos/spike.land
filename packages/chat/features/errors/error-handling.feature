Feature: Error Handling
  As a user
  I want proper error handling
  So that I understand when something goes wrong and what to do

  Background:
    Given I am logged in as a user
    And I am on the chat page

  Scenario: Show error when message fails to send
    Given the message API returns an error
    When I try to send "This will fail"
    Then I should see an error message "Failed to send message"
    And the message should not appear in the chat

  @critical
  Scenario: Handle insufficient credits error
    Given I have 0 credits remaining
    When I try to send "Need more credits"
    Then I should see an error message "Insufficient credits"
    And I should see a "Buy Credits" button

  Scenario: Show network error on connection failure
    Given the network connection is offline
    When I try to send a message
    Then I should see an error message "Network error. Please check your connection"

  @retry
  Scenario: Retry failed message sending
    Given the message API fails once then succeeds
    When I send a message "Retry this"
    Then the message should be retried automatically
    And I should eventually see my message in the chat