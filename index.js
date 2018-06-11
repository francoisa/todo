import React from 'react';
import ReactDOM from 'react-dom';
import './client/css/index.css';
import App from './client/components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
