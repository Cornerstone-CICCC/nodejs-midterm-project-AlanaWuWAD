import { Daily } from "../type/daily";
import { v4 as uuidv4 } from 'uuid'

class DailyModel {
    dailys: Daily[] = []

    browseDaily() {
        return this.dailys
    }

    readDaily(id: string) {
        const foundDaily = this.dailys.find(daily => daily.id === id)
        if (!foundDaily) return false
        return foundDaily
    }
    searchDaily(title: string) {
        const foundKenny = this.dailys.filter(k => k.title.toLowerCase().includes(title.toLowerCase()))
        if (foundKenny.length === 0) return false
        return foundKenny
    }
    editDaily(id: string, update: Partial<Daily>
    ) {
        const foundDaily = this.dailys.findIndex(d => d.id === id)
        if (foundDaily === -1) return false
        this.dailys[foundDaily] = {
            ...this.dailys[foundDaily],
            title: update.title ?? this.dailys[foundDaily].title,
            date: update.date ?? this.dailys[foundDaily].date,
            // img: update.img ?? this.dailys[foundDaily].img,
            age: update.age ?? this.dailys[foundDaily].age,
            description: update.description ?? this.dailys[foundDaily].description
        }
        return this.dailys[foundDaily]

    }
    addDaily(newDaily: Omit<Daily, 'id'>) {
        // const { title, date, img, age, description } = newDaily
        const addId = { id: uuidv4(), ...newDaily }
        this.dailys.push(addId)
        return addId
    }
    deleteDaily(id: string) {
        const foundIndexDaily = this.dailys.findIndex(daily => daily.id === id)

        if (foundIndexDaily === -1) return false
        this.dailys.splice(foundIndexDaily, 1)
    }
}

export default new DailyModel