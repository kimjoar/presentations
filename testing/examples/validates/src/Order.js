function PolicyHolder(obj) {
    this.obj = obj;
}

function Cart() {
    this.items = [];
}

Cart.prototype.addItem = function(item) {
    this.items.push(item);
}

function CartItem() {
}

function Order(obj) {
    this.obj = obj;
    this.beneficiaries = [];
}
Order.prototype.setPolicyHolder = function(policyHolder) {
    this.policyHolder = policyHolder;
}
Order.prototype.addBeneficiary = function(beneficiary) {
    this.beneficiaries.push(beneficiary);
}
Order.prototype.isValid = function() {
    return false;
}
Order.prototype.isValid2 = function() {
    return true;
}
