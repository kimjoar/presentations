Writing Beautiful JavaScript Tests
==================================

This is a talk about writing tests

---

When I mention "testing", people tend to think a couple of specific things. This talk will be about writing and maintaining tests, but I will not focus on

- TDD
- Should we write tests?
- Some library or framework, such as Angular, React
- Some testing library or runner, such as Jasmine, QUnit and Karma

---

Writing tests != TDD

---

TDD is a prescriptive process for how to write tests

---

So, what is a test?

---

Video-eksempel: Manuell test i nettleseren

Kodeeksempel: Automatisert test som kjøres i terminalen.

(diskuter automatisert vs manuell)

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

We need to treat tests as we treat production code

---

Do we agree on how to write tests?

Example:

- dhh, martin, beck (https://plus.google.com/events/ci2g23mk0lh9too9bgbp3rbut0k)
- http://www.rbcs-us.com/documents/Why-Most-Unit-Testing-is-Waste.pdf
- http://henrikwarne.com/2014/09/04/a-response-to-why-most-unit-testing-is-waste/

---

What is the cost of testing?

What is the value of testing?

---

Today will not depend on *when* you write your tests

However, it will show you my view on testing

---

It's important that you understand why I make the choices I make (they will not be the best choice for everyone)

---

A little bit about me

---

Today I'm going show some of the things we want to achieve and some of the things we want to avoid

This is going to be part philosophy, part techniques, part horrible experiences, part amazing experiences

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

Vis et eksempel på horribel test-failure

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

DRYing up lines, not concepts

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

---

Too long tests
Too much detail
Unnecessary detail

```
it("displays input section for children if a BU product is chosen", function() {
    var buCartItem = new CartItem({
        price: 198,
        quantity: 2,
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

```
it('validates', function() {
    expect(order.isValid()).toBe(true);
});
```

Fails with:

```
expected true to be false
```

Why did it fail? (Faktisk: Nye valideringsregler, person for gammel til å ha livsforsikring av type 2)

Gå opp til nærmeste beforeEach:

```
beforeEach(function() {
    var item = new CartItem({
        type: 'li2',
        productGroup: 'LI',
        quantity: 1,
        price: 105
    });
    cart.addItem(item);
});
```

So … why did it fail?

Neste beforeEach:

```
beforeEach(function() {
    var item = new CartItem({
        type: 'UL',
        quantity: 3,
        price: 401
    });

    cart.addItem(item);

    order = new Order({
        beneficiaries: beneficiaries3,
        cart: cart
    });
});
```

So … why did it fail?

Første beforeEach:

```
beforeEach(function() {
    // mye stuff
});
```

UL: Disability pension
LI: Life insurance

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

Less complex code is simpler to test

---

Code coverage

---

DOM?

---

Språk i describe,it

---

Verdien av gode matchere

(kan være verdi å lage egne også)

---

Prefer one assertion per test

---

Stay far away from private methods

---

Your tests *need* to be stupidly simple

What happens when our tests are wrong? What happens when we don't understand our tests? What happens when our tests slow us down?

---

Summary:

- Learn from the backend devs
- Think about why you write tests
- Treat your tests as you treat your application code
- Expect to refactor your tests
- Use whatever testing tool you want (it doesn't actually matter that much)

