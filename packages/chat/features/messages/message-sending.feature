Feature: Message Sending
  As a user
  I want to send messages and receive AI responses
  So that I can have conversations with the AI assistant

  Background:
    Given I am logged in as a user
    And I am on the chat page
    And I have created a new conversation

  @smoke
  Scenario: Send a message and receive AI response
    When I type "Hello AI!" in the chat input
    And I press Enter
    Then I should see my message "Hello AI!" in the chat
    And I should see an AI response containing "Hello! How can I help you today?"

  Scenario: Show typing indicator while AI is responding
    When I send a message "Test message"
    Then I should see a typing indicator
    And the typing indicator should disappear when the response arrives

  Scenario: Disable input while sending message
    When I type "Test" in the chat input
    And I press Enter
    Then the chat input should be disabled
    And the send button should be disabled

  @parallel
  Scenario Outline: Send different types of messages
    When I type "<message>" in the chat input
    And I press Enter
    Then I should see my message "<message>" in the chat
    And I should receive an AI response

    Examples:
      | message                    |
      | What's the weather today?  |
      | Can you help me with code? |
      | Tell me a joke             |