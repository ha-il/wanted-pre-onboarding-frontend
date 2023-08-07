import { css } from '@emotion/react';
import MainNavigation from '../components/MainNavigation';

const mainCss = css({
  margin: '2rem auto',
});

const ErrorPage = () => {
  return (
    <>
      <MainNavigation />
      <main css={mainCss}>
        <h1>404</h1>
        <p>404 Could not find this page!</p>
      </main>
    </>
  );
};

export default ErrorPage;
