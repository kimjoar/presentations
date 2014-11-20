describe("Player", function() {

    it("increments count when song is finished", function(done) {
        var player = new Player();

        expect(player.countDone).toBe(0);

        player.play('song name', function() {
            expect(player.countDone).toBe(3);
            done();
        });
    });

});
