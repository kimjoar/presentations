Writing Beautiful JavaScript Tests
==================================

This is a talk about testing

---

Writing tests != TDD

---

TDD is a process for how to write tests

---

What will this talk not talk about?

- TDD
- Should we write tests?
- Some library or framework, such as Angular, React
- Some testing library or runner, such as Jasmine, QUnit and Karma

---

So, what is a test?

---

Kodeeksempel!

(diskuter automatisert vs manuell)

---

Vis kjøring av tester i terminalen

(video? IE7,8,9,10,iphone,android,osv)

---

Why do we test?

Three main reasons:

- Regressions (e.g. write code without being afraid)
- Communication (e.g. tests as documentation)
- Design (e.g. only implement what you need, separation of concerns, etc)

(Oppdage nettleser-feil? Sjelden et problem dersom man ikke skal støtte ancient browsers)

(App-ene våre blir større og mer komplekse)

(Vi tar til oss læring fra backend-verden)

---

Hva optimaliserer vi for?

(Decisions, Decisions av Dan North)

---

Writing tests is a learning process

Why?

---

Do we agree on how to write tests?

Example: dhh, martin, beck (https://plus.google.com/events/ci2g23mk0lh9too9bgbp3rbut0k)

---

Today will not depend on when you write your tests

However, it will show you my view on testing

---

It's important that you understand why I make the choices I make (they will not be the best choice for everyone)

---

Today I'm going show some of the things we want to achieve and some of the things we want to avoid

This is going to be part philosophy, part techniques, part horrible experiences

---

Some techniques will seem stupidly simple

(but believe me, they are easy to break)

---

What are we optimizing for in our tests?

---

Coding alone vs coding in a team

---

In a team, the first time you meet a test is usually when it fails

Why did it fail?

---

Treat your tests as you treat your application code

---

Refactor and clean up your tests regularly

---

Is having a 3:1 tests to code a good thing?

5 000 lines of app code, 20 000 lines of code to maintain

---

Testing getters and setters? Is 100% coverage a goal? Is coverage at all a goal?

---

You are allowed to delete tests

---

Static vs dynamic languages

Better tooling simplify working with many tests

---

Different types of tests -- unit, integration, ...

---

"... and I can't write a test for it because I don't even know what the inputs look like" -beck

---

What is a beautiful test?

(man kan nesten aldri se på en test for seg selv -- man må se på hele test suiten)

---

Beautiful?

- Maintainable?
- Fast?
- ...?

---

How do we get there?

(There is no definitive answer -- it depends. Team, context, type of application, etc)

---

Let's look at some techniques that have worked for me

---

Make the test obvious

---

`beforeEach`

---

Too long tests

---

Arrange, act, assert

(beware of too much setup)

---

Too much magic

---

Mocking what you don't own -- what happens when you update jQuery?

... mocks, returning mocks, returning mocks

(hvordan skal mocks introduseres? Har ikke mye tid til det)

---

Tooling

---

Don't stress TDD

Code the way that works for you

(it's more important to actually test than to be frustrated and throw it all away)

---

Throw away code vs throw away tests. Interesting perspective.

---

less complex code is simpler to test

---

code coverage

---

DOM?

---

Språk i describe,it

---

Verdien av gode matchere

(kan være verdi å lage egne også)

---

Stay far away from private methods

---

Summary:

- Learn from the backend devs
- Think about why you write tests
- Treat your tests as you treat your application code
- Expect to refactor your tests
- Use whatever testing tool you want (it doesn't actually matter that much)

