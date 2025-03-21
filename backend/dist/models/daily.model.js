"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class DailyModel {
    constructor() {
        this.dailys = [];
    }
    browseDaily() {
        return this.dailys;
    }
    readDaily(id) {
        const foundDaily = this.dailys.find(daily => daily.id === id);
        if (!foundDaily)
            return false;
        return foundDaily;
    }
    searchDaily(title) {
        const foundKenny = this.dailys.filter(k => k.title.toLowerCase().includes(title.toLowerCase()));
        if (foundKenny.length === 0)
            return false;
        return foundKenny;
    }
    editDaily(id, update) {
        var _a, _b, _c, _d;
        const foundDaily = this.dailys.findIndex(d => d.id === id);
        if (foundDaily === -1)
            return false;
        this.dailys[foundDaily] = Object.assign(Object.assign({}, this.dailys[foundDaily]), { title: (_a = update.title) !== null && _a !== void 0 ? _a : this.dailys[foundDaily].title, date: (_b = update.date) !== null && _b !== void 0 ? _b : this.dailys[foundDaily].date, 
            // img: update.img ?? this.dailys[foundDaily].img,
            age: (_c = update.age) !== null && _c !== void 0 ? _c : this.dailys[foundDaily].age, description: (_d = update.description) !== null && _d !== void 0 ? _d : this.dailys[foundDaily].description });
        return this.dailys[foundDaily];
    }
    addDaily(newDaily) {
        // const { title, date, img, age, description } = newDaily
        const addId = Object.assign({ id: (0, uuid_1.v4)() }, newDaily);
        this.dailys.push(addId);
        return addId;
    }
    deleteDaily(id) {
        const foundIndexDaily = this.dailys.findIndex(daily => daily.id === id);
        if (foundIndexDaily === -1)
            return false;
        this.dailys.splice(foundIndexDaily, 1);
    }
}
exports.default = new DailyModel;
