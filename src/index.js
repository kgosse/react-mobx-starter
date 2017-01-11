import './assets/scss/styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import {Router, hashHistory} from 'react-router';
import {RouterStore, syncHistoryWithStore} from 'mobx-react-router';
import stores from './stores';
import routes from './routes';

const routingStore = new RouterStore();

stores.routing = routingStore;

const history = syncHistoryWithStore(hashHistory, routingStore);

ReactDOM.render((
    <Provider {...stores}>
      <div>
        <Router history={history}>
          {routes}
        </Router>
      </div>
    </Provider>
  ),
  document.getElementById('root')
);


