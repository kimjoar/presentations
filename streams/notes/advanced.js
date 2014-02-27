TOSTRING
========

var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;

var fn = function(test, value) {
	console.log('hei!');
}

var args = fn.toString().match(FN_ARGS)[1].split(",");
var fnArgs = args.map(function(arg) {
    return modules[arg.trim()];
});

fn.apply(null, fnArgs);


FUNCTION
========

// NESTEN EVAL

new Function("console.log('hei')")(); // hei

new Function("a", "console.log('hei', a)")("js"); // hei js


RENDERING
=========

(function() {
    div(
        h1('Please fill out this form').id('header'),
        form(
            p('First name:', input({ type: 'text', name: 'firstName' })),
            p('Last name:',  input({ type: 'text', name: 'lastName' })),
            p(input({ type: 'submit', value: 'Save!' }))
        ),
        p('Thanks!')
    )
}).toString()