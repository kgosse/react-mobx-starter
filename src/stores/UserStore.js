import { Store } from 'libx'
import User from '../models/User'

export default class UserStore extends Store {
  users = this.collection({
    model: User,
    idAttribute: '_id' // easy - to the pub!
  })
}