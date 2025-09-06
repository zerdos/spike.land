Feature: Subscription and Credits
  As a user
  I want to manage my subscription and credits
  So that I can use the chat service according to my needs

  Background:
    Given I am logged in as a user
    And I am on the chat page

  @smoke
  Scenario: Display subscription status
    Given I have a "Pro" subscription
    And I have 450 credits remaining
    Then I should see "Pro" as my subscription tier
    And I should see "450" credits remaining

  Scenario: Open Stripe checkout for subscription upgrade
    Given I have a "free" subscription
    When I click "Upgrade to Pro"
    Then I should be redirected to Stripe checkout

  Scenario Outline: Different subscription tiers
    Given I have a "<tier>" subscription
    Then I should see "<features>" available
    And my credit limit should be <limit>

    Examples:
      | tier     | features                          | limit |
      | free     | Basic chat, 10 messages per day   | 10    |
      | pro      | Unlimited chat, priority support  | 1000  |
      | business | All features, API access          | 10000 |

  @payment
  Scenario: Purchase additional credits
    When I click "Buy Credits"
    And I select "100 credits for $10"
    And I complete the payment
    Then my credit balance should increase by 100