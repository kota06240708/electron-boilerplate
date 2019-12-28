import ReactDOM from 'react-dom';
import React, { ReactElement } from 'react';
import Example from './_example';

const Layouts: () => ReactElement = (): ReactElement => {
  return <Example />;
};

const rootEl: HTMLElement = document.getElementById('app');
rootEl ? ReactDOM.render(<Layouts />, rootEl) : null;

