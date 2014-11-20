describe("Event", function() {

    it("has correct date", function() {
        for (var minutes = 0; minutes < 1440; minutes++) {
            var d = new Date(2014, 1, 1, 0, minutes, 0, 0)
            var event = new Event({ date: d });

            var mins = d.getMinutes();
            if (mins < 10) mins = "0" + mins;

            if (d.getHours() == 0 && d.getMinutes() == 0) {
                expect(event.date).toEqual("Midnight");
            }
            else if (d.getHours() == 12 && d.getMinutes() == 0) {
                expect(event.date).toEqual("Noon");
            }
            else if (d.getHours() == 0) {
                expect(event.date).toEqual("12:" + mins + " am");
            }
            else if (d.getHours() == 12) {
                expect(event.date).toEqual("12:" + mins + " pm");
            }
            else if (d.getHours() > 12) {
                expect(event.date).toEqual((d.getHours() - 12) + ":" + mins + " pm");
            }
            else {
                expect(event.date).toEqual(d.getHours() + ":" + mins + " am");
            }
        }
    });

    it("has correct date2", function() {
        for (var i = 0; i < 1440; i++) {
            var d = new Date(2014, 1, 1, 0, i, 0, 0)
            var event = new Event({ date: d });

            if (d.getHours() == 0 && d.getMinutes() == 0) {
                expect(event.date).toEqual("Midnight");
            }
            else if (d.getHours() == 12 && d.getMinutes() == 0) {
                expect(event.date).toEqual("Noon");
            }
            else {
                expect(event.date).toEqual(moment(d).format("h:mm a"));
            }
        }
    });

    it('handles noon', function() {
        var event = new Event({
            date: createDate({ hours: 12, mins: 0 })
        });

        expect(event.date).toEqual('Noon');
    });

    it('handles midnight', function() {
        var event = new Event({
            date: createDate({ hours: 0, mins: 0 })
        });

        expect(event.date).toEqual('Midnight');
    });

    it('handles minute after midnight', function() {
        var event = new Event({
            date: createDate({ hours: 0, mins: 1 })
        });

        expect(event.date).toEqual('12:01 am');
    });

    it('handles minute before midnight', function() {
        var event = new Event({
            date: createDate({ hours: 23, mins: 59 })
        });

        expect(event.date).toEqual('11:59 pm');
    });

    function createDate(opts) {
        var hours = opts.hours || 0;
        var mins = opts.mins || 0;
        return new Date(2014, 1, 1, hours, mins, 0, 0)
    }

});
