Feature: Chat API Functionality
  As a user
  I want to interact with the chat API
  So that I can have conversations with the AI assistant

  Background:
    Given I am logged in to the chat application
    And I am on the chat page

  @api @conversation
  Scenario: Create a new conversation
    When I click the "New Chat" button
    Then a new conversation should be created
    And the conversation should appear in the sidebar
    And the chat interface should be ready for input

  @api @message
  Scenario: Send a message and receive AI response
    Given I have an active conversation
    When I type "Hello! Can you help me understand what is React?" in the message input
    And I click the send button
    Then my message should appear in the chat
    And I should receive an AI response about React
    And my credits should be decremented

  @api @persistence
  Scenario: Conversation persistence
    Given I have a conversation with messages
    When I refresh the page
    And I select the same conversation
    Then I should see all previous messages
    And the conversation history should be intact

  @api @delete
  Scenario: Delete a conversation
    Given I have multiple conversations
    When I click the delete button on a conversation
    Then the conversation should be removed from the sidebar
    And the conversation should no longer be accessible

  @api @subscription
  Scenario: Check subscription status
    When I view my subscription information
    Then I should see my current tier as "Free"
    And I should see my remaining credits as "10"
    And I should see the daily message limit

  @api @multiple
  Scenario: Handle multiple conversations
    When I create 3 different conversations
    Then all 3 conversations should appear in the sidebar
    And I should be able to switch between them
    And each conversation should maintain its own message history

  @api @ai-response
  Scenario: AI responds to different topics
    Given I have an active conversation
    When I send messages about different topics:
      | message                           | expected_response_contains |
      | What is JavaScript?               | programming language       |
      | Hello, how are you?               | AI assistant              |
      | Can you explain React hooks?      | React                     |
    Then I should receive appropriate AI responses for each topic

  @api @error-handling
  Scenario: Handle API errors gracefully
    Given the API is experiencing issues
    When I try to send a message
    Then I should see an error message
    And the application should not crash
    And I should be able to retry the action