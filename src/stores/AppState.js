import { observable, action, map} from 'mobx';

class AppState {

  @observable user;
  @observable requests;
  @observable errors;
  @observable success;

  constructor() {

    this.user = {
      authenticated: false
    };

    this.requests = {

    };

    this.errors = {

    };

    this.success = {

    };

  }

}

export default AppState;
