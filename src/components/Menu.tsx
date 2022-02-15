import React from 'react';
import '../styles/menu.css';
const Menu = () => {
  return (
    <>
      <input type={'checkbox'} className="hidden__check" />
      <div id="menu__icon">
        =
        <ul id="menu__dropdown">
          <li className="menu__dropdown__item">
            <a href="https://www.google.com/"> 1</a>
          </li>
          <li className="menu__dropdown__item">
            <a href="https://www.google.com/"> 2</a>
          </li>
          <li className="menu__dropdown__item">
            <a href="https://www.google.com/"> 3</a>
          </li>
          <li className="menu__dropdown__item">
            <a href="https://www.google.com/"> 4</a>
          </li>
          <li className="menu__dropdown__item">
            <a href="https://www.google.com/"> 5</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Menu;
