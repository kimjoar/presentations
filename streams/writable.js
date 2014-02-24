var writable = process.stdout;

writable.write('beep ');

setTimeout(function () {
    writable.write('boop\n');
}, 1000);
