@api @bookstore
Feature: Bookstore API

  Background:
    Given I log in a valid user

  @get @books
  Scenario: Retrieve book collection
    When I fetch the list of existing books
    Then the response status should be 200
    And the response contains a valid book catalog with unique ISBNs

  @get @books
  Scenario: Retrieve book information by ISBN
    When I fetch a book by ISBN "9781449325862"
    Then the response status should be 200
    And the response contains a valid book for ISBN "9781449325862"

  @get @books
  Scenario: ISBN not available
    When I fetch a book by ISBN "0000000000000"
    Then the response status should be 400
    And the response should contain message "ISBN supplied is not available in Books Collection!"

  @post @books
  Scenario: Add valid ISBNs to a user
    When I add ISBN "9781449325862" to the user
    Then the response status should be 201
    And the response should contain the ISBN "9781449325862"

  @post @books
  Scenario: ISBN not in the catalog
    When I add ISBN "0000000000000" to the user
    Then the response status should be 400
    And the response should contain message "ISBN supplied is not available in Books Collection!"

  @post @books
  Scenario: Empty collection of ISBNS
    When I add an empty list of ISBNs
    Then the response status should be 400
    And the response should contain message "Collection of books required."

  @post @books
  Scenario Outline: User is empty or not registered
    When I add ISBN "9781449325862" to userId "<userId>"
    Then the response status should be 401
    And the response should contain message "User Id not correct!"

    Examples:
      | userId             |
      | empty-userId       |
      | nonexistent-userId |

  @post @books
  Scenario: Same ISBN is sent twice to user
    When I add ISBN "9781449331818" to the user
    And I add ISBN "9781449331818" to the user
    Then the response status should be 400
    And the response should contain message "ISBN already present in the User's Collection!"

  @delete @books
  Scenario: Delete all books from user
    When I send a delete all books request using valid userId
    Then the response status should be 204

  @delete @books
  Scenario: User not correct when deleting all books
    When I send a delete all books request using invalid userId
    Then the response status should be 401
    And the response should contain message "User Id not correct!"

  @delete @books
  Scenario: Delete specific book from user
    Given I add ISBN "9781593275846" to the user
    When I send a delete request to delete ISBN "9781593275846"
    Then the response status should be 204

  @delete @books
  Scenario: ISBN not in user's catalog
    When I send a delete request to delete ISBN "0000000000000"
    Then the response status should be 400
    And the response should contain message "ISBN supplied is not available in User's Collection!"

  @delete @books
  Scenario: User not correct when deleting specific book
    When I send a delete specific book request using invalid userId
    Then the response status should be 401
    And the response should contain message "User Id not correct!"

  @put @books
  Scenario: Replace user's owned ISBN with a valid new ISBN
    Given I add ISBN "9781593277574" to the user
    When I replace ISBN "9781593277574" with new ISBN "9781491904244"
    Then the response status should be 200
    And the response should contain the ISBN "9781491904244"

  @put @books
  Scenario: Old ISBN not in user's catalog
    When I replace ISBN "9781491950296" with new ISBN "9781593277574"
    Then the response status should be 400
    And the response should contain message "ISBN supplied is not available in User's Collection!"

  @put @books
  Scenario: New ISBN not in books collection
    Given I add ISBN "9781593277574" to the user
    When I replace ISBN "9781593277574" with new ISBN "0000000000000"
    Then the response status should be 400
    And the response should contain message "ISBN supplied is not available in Books Collection!"

  @put @books
  Scenario Outline: Required fields empty or missing when replacing IBSN
    Given I add ISBN "9781593277574" to the user
    When I replace ISBN "9781593277574" with "<body>"
    Then the response status should be 400
    And the response should contain message "Request Body is Invalid!"

    Examples:
      | body              |
      | empty-userId      |
      | empty-isbn        |