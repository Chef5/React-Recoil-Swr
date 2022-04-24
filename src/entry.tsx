import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './Mock/Index';

import App from './App';
var reactapp = document.createElement("div");
document.body.appendChild(reactapp);

// ReactDOM.render(<App/>, reactapp);

const root = createRoot(reactapp!); // createRoot(container!) if you use TypeScript
root.render(<App/>);