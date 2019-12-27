import ReactDOM from 'react-dom';
import React, { ReactElement } from 'react';
import Unko from './_unko';

const Layouts: () => ReactElement = (): ReactElement => {
  return <Unko />;
};

const rootEl: HTMLElement = document.getElementById('app');
rootEl ? ReactDOM.render(<Layouts />, rootEl) : null;

