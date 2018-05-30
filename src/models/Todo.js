import { Model } from 'libx'
import { observable, computed } from 'mobx'
// import moment from 'moment' // just to show off, hehe

export default class Todo extends Model {
  @observable id
  @observable text = ''
  @observable completed = false
  @observable creatorId = null // the ID of the user that created this todo
  @observable createdAt

  @computed
  get creator() {
    // References the creator by ID. If you change the `creatorId`
    // this will automagically update.
    return this.rootStore.userStore.users.referenceOne(this.creatorId)
  }

  parse(json) {
    // Let's imagine the API response looks like
    // {
    //   "id": 1,
    //   "text": "Buy milk"
    //   "completed": false,
    //   "createdAt": "2017-20-02T14:45:12Z",
    //   "creator": {
    //     "_id": "abcd",
    //     "name": "Jeff Hansen"
    //   }
    // }

    // We want to set the `creator` ourselves, so slice it out of
    // the `json`.
    const { creator, ...rest } = json
    // Set the user in the user store, get a User (or undefined) back.
    // When created through a Store collection, models have access
    // to the Root Store.
    this.rootStore.userStore.users.set(creator)
    return {
      // All fields except `creator`.
      ...rest,
      // Assign the creator ID so we can look it up.
      creatorId: creator._id,
      // We want all our dates as `Moment`s.
      // createdAt: moment(json.createdAt)
      createdAt: new Date(json.createdAt)
    }
  }
}