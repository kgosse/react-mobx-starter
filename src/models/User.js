import { Model } from 'libx';
import {observable, computed} from 'mobx';

export default class User extends Model {
  @observable _id
  @observable name

  // Let's create a getter for the user's created todos.
  // .. cause we can!
  @computed
  get todos() {
    return this.rootStore.todoStore.todos.referenceMany(this._id, 'creatorId')
  }
}