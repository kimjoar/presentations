function Player() {
    this.countDone = 0;
}
Player.prototype.play = function(name, cb) {
    // play, then trigger callback when done

    setTimeout(function() {
        this.countDone++;
        cb();
    }, 0);
};

