Feature: Conversation Management
  As a user
  I want to manage my chat conversations
  So that I can organize and access my chat history

  Background:
    Given I am logged in as a user
    And I am on the chat page

  @smoke
  Scenario: Create a new conversation
    When I click the "New Chat" button
    Then I should see 1 conversation in the list
    And the conversation title should be "New Conversation"

  Scenario: List existing conversations
    Given I have the following conversations:
      | id     | title        | model       | created_at           |
      | conv-1 | First Chat   | llama-2-7b  | 2024-01-01T00:00:00Z |
      | conv-2 | Second Chat  | mistral-7b  | 2024-01-02T00:00:00Z |
    When I refresh the page
    Then I should see 2 conversations in the list
    And the first conversation should be titled "First Chat"
    And the second conversation should be titled "Second Chat"

  Scenario: Delete a conversation
    Given I have created a new conversation
    When I click the delete button for the conversation
    And I confirm the deletion
    Then I should see 0 conversations in the list

  Scenario: Select a conversation
    Given I have a conversation titled "Test Conversation"
    When I click on the conversation
    Then the conversation should be marked as active
    And the chat header should show "Test Conversation"