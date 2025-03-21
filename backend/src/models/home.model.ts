import bcrypt from 'bcrypt'
import { User } from '../type/user'
import { v4 as uuidv4} from 'uuid'

class UserModel {
    users: User[] = [
        { id: uuidv4(), username: 'jay', password: '123'}
    ]

    findAll(){
        return this.users
    }

    findByUsername( username: string){
        const user = this.users.find( u => u.username === username)
        if(!username) return null
        return user
    }

    async createUser(newUser: Omit<User, 'id'>) {
        const {username, password} = newUser
        const foundIndex = this.users.findIndex( u => u.username === username)
        if(foundIndex !== -1) return false
        const hashedPassword = await bcrypt.hash(password, 12)

        const user = {
            id: uuidv4(),
            username,
            password: hashedPassword
        }
        this.users.push(user)
        return user
    }

    async logIn( username: string, password: string){
        const user = this.users.find( u => u.username === username)
        if(!user) return false

        const isMatch: boolean = await bcrypt.compare(password, user.password)
        if(!isMatch) return false

        return user
    }
}

export default new UserModel