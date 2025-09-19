@api @account
Feature: Account API

    @post @user
    Scenario: Create user with valid username and password
        When I register an account with unique username and valid password
        Then the response status should be 201
        And the response should contain a non-empty "userID"
        And the response should contain "username"
        And the response should not contain the "password"

    @post @user
    Scenario: Username already exists
        Given I register an account with unique username and valid password
        When I register an account with the same username
        Then the response status should be 406
        And the response should contain message "User exists!"

    @post @user
    Scenario Outline: Password not following policy
        When I register an account with password "<password>"
        Then the response status should be 400
        And the response should contain message "Passwords must have at least"

        Examples:
        | password        |
        | s1!A            |
        | lowercase123!   |
        | UPPERCASE123!   |
        | Missingnumbers! |
        | Nocharacter1    |

    @post @user
    Scenario Outline: Required fields empty or missing when creating user
        When I register an account with "<body>"
        Then the response status should be 400
        And the response should contain message "UserName and Password required."

        Examples:
        | body             |
        | no-body          |
        | missing-username |
        | missing-password |
        | empty-username   |
        | empty-password   |
        | null-username    |
        | null-password    |

    @post @token
    Scenario: Success to generate token with valid credentials
        Given I register an account with unique username and valid password
        When I generate a token using valid credentials
        Then the response status should be 200
        And the response should contain status "Success"
        And the response should contain message "User authorized successfully."
        And the response should contain the token

    @post @token
    Scenario: Required fields empty or missing when generating token
        When I generate a token with "<body>"
        Then the response status should be 400
        And the response should contain message "UserName and Password required."

        Examples:
        | body             |
        | no-body          |
        | missing-username |
        | missing-password |
        | empty-username   |
        | empty-password   |
        | null-username    |
        | null-password    |

    @post @token
    Scenario: Failed status when password is incorrect
        Given I register an account with unique username and valid password
        When I generate a token with incorrect password
        Then the response status should be 200
        And the response should contain status "Failed"
        And the response should contain message "User authorization failed."
        And the response should not contain the token

    @post @token 
    Scenario: Failed status when user is not registered
        When I generate a token using invalid credentials
        Then the response status should be 200
        And the response should contain status "Failed"
        And the response should contain message "User authorization failed."
        And the response should not contain the token

    @post @authorized
    Scenario: Authorized when valid user has a not-expired token
        Given I register an account with unique username and valid password
        And I generate a token using valid credentials
        When I check authorization for the user
        Then the response status should be 200
        #And the response should equal "true"

    @post @authorized
    Scenario: Not authorized for valid user without token
        Given I register an account with unique username and valid password
        When I check authorization for the user
        Then the response status should be 200
        #And the response should equal "false"

    @post @authorized
    Scenario: Not authorized for not registered user
        When I check authorization using invalid user credentials
        Then the response status should be 404
        And the response should contain message "User not found!"

    @post @authorized
    Scenario: Not authorized with incorrect password
        Given I register an account with unique username and valid password
        When I check authorization with incorrect password
        Then the response status should be 404
        And the response should contain message "User not found!"

    @post @authorized
    Scenario Outline: Required fields empty or missing for authorization
        When I check authorization with "<body>"
        Then the response status should be 400
        And the response should contain message "UserName and Password required."

        Examples:
        | body             |
        | no-body          |
        | missing-username |
        | missing-password |
        | empty-username   |
        | empty-password   |
        | null-username    |
        | null-password    |

    @get @user
    Scenario: Retrieve user information successfully
        Given I register an account with unique username and valid password
        And I generate a token using valid credentials
        When I send a get request using valid userId
        Then the response status should be 200
        And the response should contain user information

    @get @user
    Scenario: Get error when userId does not exist
        Given I register an account with unique username and valid password
        And I generate a token using valid credentials
        When I send a get request using invalid userId
        Then the response status should be 401
        And the response should contain message "User not found!"

    @delete @user
    Scenario: Delete user successfully
        Given I register an account with unique username and valid password
        And I generate a token using valid credentials
        When I send a delete request using valid userId
        Then the response status should be 204

    @delete @user
    Scenario: Delete error when userId does not exist
        Given I register an account with unique username and valid password
        And I generate a token using valid credentials
        When I send a delete request using invalid userId
        Then the response status should be 200
        And the response should contain message "User Id not correct!"