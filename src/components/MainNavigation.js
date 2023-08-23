import { css } from '@emotion/react';
import { NavLink } from 'react-router-dom';

const listCss = css({
  '& a': {
    color: 'black',
    textDecoration: 'none',
  },
  '& a:hover, & a.active': {
    color: 'steelblue',
    textDecoration: 'underline',
  },
});

const MainNavigation = () => {
  return (
    <header>
      <nav>
        <ul css={listCss}>
          <li>
            <NavLink to="/signup" className={({ isActive }) => (isActive ? 'active' : undefined)}>
              가입하기
            </NavLink>
          </li>
          <li>
            <NavLink to="/signin" className={({ isActive }) => (isActive ? 'active' : undefined)}>
              로그인하기
            </NavLink>
          </li>
          <li>
            <NavLink to="/todo" className={({ isActive }) => (isActive ? 'active' : undefined)}>
              할 일
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
