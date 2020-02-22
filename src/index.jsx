import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './utils/serviceWorker';

ReactDOM.render(<App/>, document.getElementById('root'));

serviceWorker.register();
