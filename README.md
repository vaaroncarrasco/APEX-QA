# APEX QA Automation Exercise


For this exercise, I picked the home view and the search bar functionality.
I have discarded any user login/signup functionality because it requires
a verification code.


As we are testing a web app deployed in a production environment, I came across some issues like:


- Website rejecting my requests with a 403 forbidden status code


This has a workaround, which is basically modifying the
User-Agent from the request header, so the website stops
blocking cypress.


- Website source code typos messing up the test (I mean, this is the point of testing, right?)


## Best practices
1. Setting up a global baseUrl. This is very helpful as it avoids hard-coding and it can be easily modified from the cypress.config.js without having to go to each single file where it was used.


2. Tests with multiple assertions. Cypress is simply built different. It recommends not acting like we're writing unit tests. I did not apply this in all the tests at searchBar.cy.js as I think it would've made the code less readable. This can be improved, though.


3. State control.


4. Independent tests. Tests should not rely on the state of the previously executed test.


5. Specific Selectors. I have tried to use specific selectors as much as possible. By specifying the tag and its attribute's values, id's or classes; making sure it only matches one element (when required to do so).


6. Data-Driven Testing Philosophy. I wanted to try a DDT approach by selecting a random element from an array of Equivalence Partitioning values. This can be improved by abstracting the arrays into a different file.


## Code structure
In both files, my approach was setting the variables/libraries at the global scope. This makes it easier to understand and easier to modify the variables if needed.


If needed, a beforeEach is added. Then, inside the test cases, I set at the top of the block scope the variables I'll be using if any. Next, the selectors and finally the assertions.


## Selectors
In some cases, I have used selectors that yield multiple elements in order to follow the DRY (Don't repeat yourself) principle and save some execution time.


In some others, the elements were not using very specific attributes. So, the best I can do in these cases is to specify the tag and any possible attribute along with its value.


I try to avoid using vague selectors as this is a bad practice.


## Improvements
Well, in order to make the code more readable and reusable, Cypress has this cool feature of commands. That would definitely be helpful.  Some logic abstraction would save some lines of code and make the framework easier to modify when needed.


I'd start by abstracting some of the logic in the searchBar testing. There is a pattern that can be turned into a reusable command.


The other pattern I have observed is at the home.cy.js, specifically when getting multiple elements and then looping through each.


Of course, having the variables declared in the global scope can be improved. Maybe importing them from a designated file or coding some logic to generate variables automatically.


## Pros and cons of having used Cypress


### Pros
0. It focuses on end-to-end testing, but we can also do unit testing and even API testing!


1. As it is kind of a declarative framework, the coding experience is pretty good for newcomers. Also, the commands are very intuitive and the learning curve is gentle. Even if the person reading the code isn't a tester or developer, you can have a clue about what the code is doing.


2. It uses a real browser and it has support for Chrome-family browsers. This allows the tester to test web apps and even some mobile web-based apps!


3. It has a chef-kiss documentation and a very supportive community.


4. It can be integrated to CI/CD pipelines.


5. It can detect an element's visibility.


6. The Page Object Model can be used as Cypress uses javascript. But, it is recommended to follow the App Actions/Commands structure as it also makes the code easier to maintain.


7. It generates screenshots, screenrecordings, and its dashboard comes in pretty handy when debugging. This dashboard allows us to time travel through every action we perform.


8. Cypress reloads on every change.


### Cons


1. It is not compatible with Safari, nor with Internet Explorer.


2. Cypress only supports JavaScript and TypeScript


3. It cannot test multiple browsers concurrently.


4. It's limited to web-based apps and websites.

# CODE REFACTOR & FIXED FLAKYNESS

Implemented fixtures, commands with params and more!

Fixed the searchBar test with the test-retry feature.


      Spec                                              Tests  Passing  Failing  Pending  Skipped
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│ ✖  home.cy.js                               00:24        1        -        1        -        - │
├────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ✔  searchBar.cy.js                          01:00        5        5        -        -        - │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
  ✖  1 of 2 failed (50%)                      01:25        6        5        1        -        -