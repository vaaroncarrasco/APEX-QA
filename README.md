# APEX QA Automation Exercise


For this exercise, I picked the home view and the search bar functionality.
I have discarded any user login/signup functionality because it requires
a verification code.


As we are testing a web app deployed in a production environment, I came across some issues like:


- Website rejecting my requests with a 403 forbidden status code


This has a workaround, which is basically modifying the User-Agent from the request header, 
so the website stops blocking cypress. This can be done in the config file or inside each visit()


- Website source code typos messing up the test (I mean, this is the point of testing, right?)


## Best practices
1. Setting up a global baseUrl and User-Agent. This is very helpful as it avoids hard-coding and it can be easily modified from the cypress.config.js without having to go to each single file where it was used.


2. Tests with multiple assertions. Cypress is simply built different. It recommends not acting like we're writing unit tests. I did not apply this in all the tests at searchBar.cy.js as I think it would've made the code less readable. This can be improved, though.


3. State control.


4. Independent tests. Tests should not rely on the state of the previously executed test.


5. Specific Selectors. I have tried to use specific selectors as much as possible. By specifying the 
tag and its attribute's values, children/parent elements, id or classes; making sure it 
only matches one element (when required to do so).


6. Data-Driven Testing Philosophy. I wanted to try a DDT approach by selecting a random element from an array of Equivalence Partitioning values from a fixture. In a development environment, data can be taken from databases.


## Code structure
In both files, my approach was getting the data from the fixtures and setting a variable at the highest scope; so the rest of the tests can access to that data.

Cypress hooks and commands are used to follow the DRY principle. Then I collect the elements by using specific selectors and finally doing the assertions.


## Selectors
In some cases, I have used selectors that yield multiple elements to avoid code repetition.

In some others, the elements were not using very specific attributes. So, the best I can do in these cases is to specify the parent, children, the tag or any possible attribute along with its value.

I try to avoid using vague selectors as this is a bad practice.

## Improvements
In a development environment, test data can be imported from real databases instead of hard coding it.

Having a bigger test coverage and getting some statistics with the cypress dashboard to find out what tests are failing the most and where the team could focus.

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

## Tests failing on purpose
1. Home:Typo in href
2. SearchBar: double space input renders a different page
