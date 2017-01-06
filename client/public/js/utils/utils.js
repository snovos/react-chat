export default {
    getActiveTime(time) {
        var preffix = ' Active for ';
        var units = [
            {name: "second", limit: 60, in_seconds: 1},
            {name: "minute", limit: 3600, in_seconds: 60},
            {name: "hour", limit: 86400, in_seconds: 3600},
        ];
        var diff = (new Date() - new Date(time)) / 1000;
        if (diff < 5) return "";

        var i = 0, unit;
        while (unit = units[i++]) {
            if (diff < unit.limit || !unit.limit) {
                diff = Math.floor(diff / unit.in_seconds);
                return preffix + diff + " " + unit.name + (diff > 1 ? "s" : "");
            }
        }
    },

    formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        return hours + ':' + minutes + ' ' + ampm;
}
}