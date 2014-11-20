function Event(opts) {
    var d = opts.date;

    if (d.getHours() == 12 && d.getMinutes() == 0) {
        this.date = "Noon";
    }
    else if (d.getHours() == 0 && d.getMinutes() == 0) {
        this.date = "Midnight";
    }
    else {
        this.date = moment(d).format('h:mm a');
    }
}
