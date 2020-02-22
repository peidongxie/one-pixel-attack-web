import React from 'react';
import logo from '../../images/logo.svg';
import title from '../../images/title.svg'
import github from '../../images/github.svg';
import './index.css';

function NavigationBar() {
  return (
    <div id={'navigation-bar'}>
      <img alt={'logo'} id={'logo'} src={logo}/>
      <img alt={'title'} id={'title'} src={title}/>
      <a href={'https://github.com/peidongxie'} rel={'noopener noreferrer'} target={'_blank'}>
        <img alt={'github'} id={'github'} src={github}/>
      </a>
    </div>
  );
}

export default NavigationBar;
