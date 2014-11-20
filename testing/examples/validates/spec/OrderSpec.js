describe("Order", function() {

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

    it('validates', function() {
        expect(order.isValid2()).toBe(true);
    });
    it('validates', function() {
        expect(order.isValid2()).toBe(true);
    });
    it('validates', function() {
        expect(order.isValid2()).toBe(true);
    });
    it('validates', function() {
        expect(order.isValid2()).toBe(true);
    });
    it('validates', function() {
        expect(order.isValid2()).toBe(true);
    });
    it('validates', function() {
        expect(order.isValid2()).toBe(true);
    });
    it('validates', function() {
        expect(order.isValid2()).toBe(true);
    });
    it('validates', function() {
        expect(order.isValid2()).toBe(true);
    });
    it('validates', function() {
        expect(order.isValid2()).toBe(true);
    });
    it('validates', function() {
        expect(order.isValid2()).toBe(true);
    });
    it('validates', function() {
        expect(order.isValid2()).toBe(true);
    });
    it('validates', function() {
        expect(order.isValid2()).toBe(true);
    });
    it('validates', function() {
        expect(order.isValid2()).toBe(true);
    });
    it('validates', function() {
        expect(order.isValid2()).toBe(true);
    });

    describe('with life insurance', function() {
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

        it('validates', function() {
            expect(order.isValid2()).toBe(true);
        });
        it('validates', function() {
            expect(order.isValid2()).toBe(true);
        });
        it('validates', function() {
            expect(order.isValid2()).toBe(true);
        });
        it('validates', function() {
            expect(order.isValid2()).toBe(true);
        });
        it('validates', function() {
            expect(order.isValid2()).toBe(true);
        });
        it('validates', function() {
            expect(order.isValid2()).toBe(true);
        });
        it('validates', function() {
            expect(order.isValid2()).toBe(true);
        });
        it('validates', function() {
            expect(order.isValid2()).toBe(true);
        });
        it('validates', function() {
            expect(order.isValid2()).toBe(true);
        });
        it('validates', function() {
            expect(order.isValid2()).toBe(true);
        });
        it('validates', function() {
            expect(order.isValid2()).toBe(true);
        });
        it('validates', function() {
            expect(order.isValid2()).toBe(true);
        });
        it('validates', function() {
            expect(order.isValid2()).toBe(true);
        });
        it('validates', function() {
            expect(order.isValid2()).toBe(true);
        });
        it('validates', function() {
            expect(order.isValid2()).toBe(true);
        });
        it('validates', function() {
            expect(order.isValid2()).toBe(true);
        });

        describe('with child insurance', function() {
            beforeEach(function() {
                var item = new CartItem({
                    type: 'BU',
                    price: 105
                });
                cart.addItem(item);
            });

            it('validates', function() {
                expect(order.isValid2()).toBe(true);
            });
            it('validates', function() {
                expect(order.isValid2()).toBe(true);
            });
            it('validates', function() {
                expect(order.isValid2()).toBe(true);
            });
            it('validates', function() {
                expect(order.isValid2()).toBe(true);
            });
            it('validates', function() {
                expect(order.isValid2()).toBe(true);
            });
            it('validates', function() {
                expect(order.isValid2()).toBe(true);
            });
            it('validates', function() {
                expect(order.isValid2()).toBe(true);
            });
            it('validates', function() {
                expect(order.isValid2()).toBe(true);
            });
            it('validates', function() {
                expect(order.isValid2()).toBe(true);
            });
            it('validates', function() {
                expect(order.isValid2()).toBe(true);
            });

            it('validates', function() {
                expect(order.isValid()).toBe(true);
            });

            it('validates', function() {
                expect(order.isValid2()).toBe(true);
            });
            it('validates', function() {
                expect(order.isValid2()).toBe(true);
            });
            it('validates', function() {
                expect(order.isValid2()).toBe(true);
            });
            it('validates', function() {
                expect(order.isValid2()).toBe(true);
            });
            it('validates', function() {
                expect(order.isValid2()).toBe(true);
            });
            it('validates', function() {
                expect(order.isValid2()).toBe(true);
            });
            it('validates', function() {
                expect(order.isValid2()).toBe(true);
            });
            it('validates', function() {
                expect(order.isValid2()).toBe(true);
            });
            it('validates', function() {
                expect(order.isValid2()).toBe(true);
            });
            it('validates', function() {
                expect(order.isValid2()).toBe(true);
            });
            it('validates', function() {
                expect(order.isValid2()).toBe(true);
            });
            it('validates', function() {
                expect(order.isValid2()).toBe(true);
            });
            it('validates', function() {
                expect(order.isValid2()).toBe(true);
            });
            it('validates', function() {
                expect(order.isValid2()).toBe(true);
            });
        });
    });
});
