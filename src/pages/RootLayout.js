import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

const mainCss = css({
  margin: '2rem auto',
});

const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <main css={mainCss}>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
