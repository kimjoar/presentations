Writing Beautiful JavaScript Tests
==================================

This is a talk about writing tests

---

When I mention "testing", people tend to think a couple of specific things.

This talk is not about

- TDD
- Whether or not we should write tests
teardown Some library or framework, such as Angular, React
- Some testing library or runner, such as Jasmine, QUnit and Karma

---

This is a talk about writing tests

---

Writing tests != TDD

---

TDD is a prescriptive process for how to write tests

---

So, what is a test?

---

Video-eksempel: Manuell test i nettleseren

This is a test. It's not necessarily a good one.

---

Kodeeksempel: Automatisert test som kjøres i terminalen.

Noen hundre av disse:

```
test(function(t) {
    var cart = new Cart();

    cart.addItem({ name: "Sleeping bag", price: 299, quantity: 2 });
    cart.addItem({ name: "Tent", price: 499, quantity: 1 });

    t.equal(cart.totalPrice(), 1097);
});
```

---

Vis kjøring av tester i terminalen

(video! IE7,8,9,10,iphone,android,osv)

---

Why do we test?

- Oppdage nettleser-feil? Sjelden et problem dersom man ikke skal støtte ancient browsers
- App-ene våre blir større og mer interaktive
- "wtf did that fail?"
- We're working in a team. How do you ensure you didn't kill someone else's code?
- Because debugging in production sucks

In the end, to me there are three main reasons:

- Regressions (e.g. we want to know that the code works as expected, change code without being afraid)
- Communication (e.g. tests as documentation, understand the intention)
- Design (e.g. only implement what you need, separation of concerns, etc)

---

Focus on the reader!

Time spent reading code > Time spent writing code

---

Reproduserbarhet. Kjør samme test hver gang — istedenfor å gjøre console.logs
hver gang.

---

Hva optimaliserer vi for?

(Decisions, Decisions av Dan North)

Hvordan vi skriver tester har en impact på hvordan testene ser ut.

---

Writing tests is a learning process

Why?

---

Because we still don't agree on how to write tests

Example:

- dhh, martin, beck (https://plus.google.com/events/ci2g23mk0lh9too9bgbp3rbut0k)
- http://www.rbcs-us.com/documents/Why-Most-Unit-Testing-is-Waste.pdf
- http://henrikwarne.com/2014/09/04/a-response-to-why-most-unit-testing-is-waste/

---

It's important that you understand why I make the choices I make (they will not be the best choice for everyone)

---

A little bit about me

JavaScript lead, Consultant.

---

Today I'm going show some of the things we want to achieve and some of the things we want to avoid

This is going to be part philosophy, part techniques, part horrible experiences, part amazing experiences

---

Some techniques will seem stupidly simple

(but believe me, they are easy to break)

---

First of,

we need to treat tests as we treat production code

---

What is the cost of testing?

What is the value of testing?

---

Today will not depend on *when* you write your tests

However, it will show you my view on testing

---

You will, at some point, hate your tests

---

What are we optimizing for in our tests?

---

Coding alone vs coding in a team

---

Failing is the most important thing your test does

---

In a team, the first time you meet a test is usually when it fails

Why did it fail?

Vis et eksempel på horribel test-failure

Write the test you'd be happy to debug yourself

Do we read more tests than we write? What are we optimizing for?

You need to see a test fail!
(Eksempel med expect i async: examples/async-fail/SpecRunner.html)

"A test that can never fail is probably worse than not having that test,
as it creates a false sense of security."

---

Treat your tests as you treat your application code

"Test code is just as important as the production code, and it needs to be
refactored just as often."

"We need to apply as much care and attention to the tests as we do to the
production code"

Poor quality tests can slow development to a crawl

Tests as a burden

---

Refactor and clean up your tests regularly

---

Is having a 3:1 tests-to-code ratio a good thing?

5 000 lines of app code, 20 000 lines of code to maintain

---

Testing getters and setters? Is 100% coverage a goal? Is coverage at all a goal?

"Having 100% coverage doesn’t guarantee the lack of defects—it only
guarantees that all of your code was executed"

Don't look for tools to tell you about your tests. You live with them each and
every day. When you feel pain, something is wrong.

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

(man kan nesten aldri se på en test for seg selv -- man må se på hele test-suiten)

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

Make the test glaringly obvious

(This is actually very difficult, especially as the complexity increases)

---

No ifs, fors or whiles. No conditional logic.

---

Don't be to clever.

---

`beforeEach`

DRYing up lines, not concepts

Reducing character duplication at the expense of readability

"Using a Setup method is basically like hiding your junk in the closet." - wewut

"Programming is not about typing… it’s about thinking." –Rich Hickey

---

create tiny universes with minimal conceptual overhead -- wewut

---

Creation helpers

```
it("displays input section for children if a BU product is chosen", function() {
    var buCartItem = createCartItem({ type: 'BU' });
    var cart = createCart({ items: [buCartItem] });

    var registrationView = new RegistrationView({
        order: createOrder({ cart: cart })
    });

    registrationView.render();

    expect(registrationView.$('.content').text()).toContain('Opplysninger om barna');
});
```

```
it("returns error message when negative quality", function() {
    var cart = createCart({
        items: [createCartItem({ quantity: -10 })]
    });

    var errors = cart.validate();

    expect(error.length).toBe(1);
    expect(error[0]).toEqual("Quantity must be positive");
});
```

Wrap the actual object creation. What happens if you need a new parameter?

Object mother. Test data builders.

---

I have not had good experience with Selenium type tests

---

When making implementation changes it’s easy to see the value of unit tests

making changes to the public API often results in spending as much or more time working with the test code.

---

The key is to test the areas that you are most worried about going wrong. That
way you get the most benefit for your testing effort. –Martin Fowler,

Refactoring

---

Too long tests
Too much detail
Unnecessary detail

```
it("displays input section for children if a BU product is chosen", function() {
    var buCartItem = new CartItem({
        price: 198,
        type: 'BU'
    });
    var cart = new Cart();
    cart.add(buCartItem);

    var beneficiary = new Beneficiary({
        fullName: 'Kim Joar Bekkelund',
        ssn: '0123456789',
        sum: 10000
    })
    var beneficiaries = new Beneficiaries();
    Beneficiaries.add(beneficiary);

    var order = new Order = new Order({
        withdrawalDay: 15,
        type: 'applet',
        avtaleGiro: false,
        cart: cart,
        beneficiaries: beneficiaries
    });

    var registrationView = new RegistrationView({
        order: order
    });

    registrationView.render();

    expect(registrationView.$('.content').text()).toContain('Opplysninger om barna');
});
```

---

Arrange, act, assert

(beware of too much setup)

```
it("displays input section for children if a BU product is chosen", function() {
    expect(registrationView.$('.content').text()).toContain('Opplysninger om barna');
});
```

---

Too much magic

Okay, I get to work, start up my computer, pull down the latest code changes, run the tests

```
it('validates', function() {
    expect(order.isValid()).toBe(true);
});
```

Fails with:

```
expected true to be false
```

It ran on the build server (Jenkins) yesterday when everyone left. But it doesn't run on my machine now.

Kanskje noe a la dette via describes:

```
order with ul with bu validates
```

(Vis eksempel med Jasmine i nettleseren?)

Why did it fail? (Faktisk: brukeren som er registrert er now for gammel for
barne-/ungdomsforsikring. Lagd med unix-timestamp, vanskelig å forstå)

(beforeEach må være off-screen)

Gå opp til nærmeste beforeEach:

```
beforeEach(function() {
    var item = new CartItem({
        type: 'BU',
        price: 105
    });
    cart.addItem(item);
});
```

So … why did it fail?

Neste beforeEach:

```
beforeEach(function() {
    beneficiary1.amount = 1500000;
    beneficiary2.amount = 500000;

    var item = new CartItem({
        type: 'UL',
        price: 399,
        amount: beneficiary1.amount
            + beneficiary2.amount
    });

    cart.addItem(item);
    order.setPolicyHolder(policyHolder2);
    order.addBeneficiary(beneficiary1);
    order.addBeneficiary(beneficiary2);
});
```

So … why did it fail?

Første beforeEach:

```
beforeEach(function() {
    policyHolder1 = new PolicyHolder({
        name: "Ola Nordmann",
        ssn: 07099451429,
        telephoneNumber: "+4795732501",
        email: "me@example.org",
        address: {
            street: "Toftes gate 17",
            postCode: 0556,
            postalArea: "Oslo"
        }
    });
    policyHolder2 = new PolicyHolder({
        name: "Testy Testeson",
        ssn: 22098426629,
        telephoneNumber: "+4743032501",
        email: "me2@example.org",
        address: {
            street: "Ravnkollbakken 3",
            postCode: 0970,
            postalArea: "Oslo"
        }
    });

    beneficiary1 = {
        name: "Testy2",
        ssn: "04037335466"
    }
    beneficiary2 = {
        name: "Testy3",
        ssn: "18049938744"
    }
    beneficiary3 = {
        name: "Testy4",
        ssn: "21050682312"
    }

    cart = new Cart();

    order = new Order({
        cart: cart,
        policyHolder: policyHolder1,
        withdrawalDay: 15
    });
});
```

So … why did it fail?

(Mulig å være avhengig av en svær fixture?)

How would I write this test?

```
describe('order with youth insurance', function() {
    it('is valid when policy holder is young enough', function() {
        var order = createOrder({
            cartItems: [createCartItem({ type: 'BU' })],
            policyHolder: createPolicyHolder({ age: 29 })
        });

        expect(order.isValid()).toBe(true);
    });

    it('is valid when policy holder is young enough', function() {
        var order = createOrder({
            cartItems: [createCartItem({ type: 'BU' })],
            policyHolder: createPolicyHolder({ age: 31 })
        });

        expect(order.isValid()).toBe(false);
    });
});
```

UL: Disability pension
LI: Life insurance
BU: Barne- og ungdomsforsikring

---

Mocking what you don't own -- what happens when you update jQuery?

... mocks, returning mocks, returning mocks

(hvordan skal mocks introduseres? Har ikke mye tid til det)

---

Tooling

You need to understand the tool. Sync vs async (e.g. expect in async)

The cleaner and more understandable your test is, the better. The problem with too much magic, is actually understanding what happens.

---

Don't stress TDD

Code the way that works for you

(it's more important to actually test than to be frustrated and throw it all away)

---

Throw away code vs throw away tests. Interesting perspective.

---

Less complex code is simpler to test

---

Less complex tests are easier to read and understand

---

Less complex code and tests are easier to debug

---

(Code coverage?)

---

DOM?

The DOM can be difficult to work with. But we can also make it simple for ourselves.

---

The more functional, the easier it is to test.

The fewer dependencies, the easier it is to test.

---

Språk i describe,it

Remember `isValid?`

Reveal intent!

Why, not how

What is the value of a comment?

---

"Impurity is the nemesis of test repeatability. Crossing boundaries is the nemesis of test speed." - wewut

---

"Few things kill productivity and motivation faster than cascading test failures." - wewut

---

Verdien av gode matchere

(kan være verdi å lage egne også)

---

Prefer one assertion per test

---

Stay far away from private methods

The more you couple yours tests to your implementation, the harder it is to change the implementation

---

Don't reimplement logic

---

The pain of globals. Suddenly tests start failing somewhere else.

---

Deterministic

---

the best kind of teardown code is the nonexistent kind

---

No logic

---

Your tests *need* to be stupidly simple

What happens when our tests are wrong? What happens when we don't understand our tests? What happens when our tests slow us down?

---

Positiv vs negativ testing. Selv om alle kodelinjer blir kjørt, har vi ikke nødvendigvis testet alt.

---

GOOS: "we value code that is easy to maintain over code that is easy to write"

Simple made easy

---

describe('tests', function() {
    beforeEach(function() {
        // called before every test
        // (often called setup)
    });

    it('runs', function() {
        // the actual test

        var value = true;

        // assertions
        expect(value).toBeDefined();
        expect(value).toBe(true);
        expect(value).not.toBe(false);
        expect(value).toEqual(true);
    });

    afterEach(function() {
        // called after every test
        // (often called teardown)
    });
});

---

Summary:

- Learn from the backend devs
- Think about why you write tests
- Treat your tests as you treat your application code
- Expect to refactor your tests
- Use whatever testing tool you want (it doesn't actually matter that much)
- Start learning on new code
- Practice!

