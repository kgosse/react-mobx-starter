import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {rootStore} from './stores';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App rootStore={rootStore}/>, document.getElementById('root'));
registerServiceWorker();
