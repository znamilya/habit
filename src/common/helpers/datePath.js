const datePath = {
    _formatMonth(month) {
        return `0${month + 1}`.slice(-2);
    },

    _formatHref(year, month) {
        return `/${year}/${this._formatMonth(month)}`;
    },

    _shiftDate(dir, year, month) {
        const actualDate = new Date(year, month - 1);
        const actualMonth = actualDate.getMonth();

        actualDate.setMonth(actualMonth + dir);

        const prevYear = actualDate.getFullYear();
        const prevMonth = actualDate.getMonth();

        return this._formatHref(prevYear, prevMonth);
    },

    getNow() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();

        return this._formatHref(year, month);
    },

    getPathTo(year, month) {
        const actualMonth = Number(month - 1);

        return this._formatHref(year, actualMonth);
    },
};

datePath.getPrevPathTo = datePath._shiftDate.bind(datePath, -1);
datePath.getNextPathTo = datePath._shiftDate.bind(datePath, 1);


module.exports = datePath;
