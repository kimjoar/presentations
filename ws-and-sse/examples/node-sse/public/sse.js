var source = new EventSource('/stream');

source.addEventListener('message', function(e) {
    console.log(e.data);
}, false);
source.onmessage = function(e) {
    console.log('on message', e.data);
};

source.addEventListener('userlogon', function(e) {
    console.log('login', e.data);
}, false);


source.addEventListener('open', function(e) {
    console.log('opened');
}, false);

source.addEventListener('error', function(e) {
    console.log('error');
}, false);
