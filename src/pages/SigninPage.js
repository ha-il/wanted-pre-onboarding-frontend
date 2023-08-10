import { css } from '@emotion/react';
import useInput from '../hooks/use-input';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../store/authContext';

const formControlCss = css({
  marginBottom: '1rem',
  '& input:focus': {
    outline: 'none',
  },
  '& label': {
    display: 'block',
  },
});

const invalidInputCss = css({
  '& input': {
    border: '1px solid #b40e0e',
    backgroundColor: '#fddddd',
  },
  '& input:focus': {
    borderColor: '#ff8800',
    backgroundColor: '#fbe8d2',
  },
});

const errorParagraph = css({
  color: '#b40e0e',
});

const SigninPage = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (ctx.userData && ctx.userData.token) {
      navigate('/todo');
    }
  }, [ctx.userData, navigate]);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    handleInputChange: handleEmailInputChange,
    hadleInputBlur: hadleEmailInputBlur,
    reset: resetNameInput,
  } = useInput(value => value.includes('@'));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInpuHasError,
    handleInputChange: hadlePasswordInputChange,
    hadleInputBlur: hadlePasswordInputBlur,
    reset: resetPasswordInput,
  } = useInput(value => value.length >= 8);

  let formIsValid = false;

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const handleFormSubmit = async e => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    if (!formIsValid) {
      return;
    }

    const user = {
      email: enteredEmail,
      password: enteredPassword,
    };

    try {
      const response = await fetch('http://localhost:8000/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': `application/json`,
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('로그인 과정에서 문제가 발생했습니다.');
      }

      if (response.ok) {
        const data = await response.json();
        const token = data.access_token;
        const userData = JSON.stringify({
          token,
        });

        ctx.onLogin(userData);
        navigate('/todo');
      }

      resetNameInput();
      resetPasswordInput();
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  let content = '';

  if (error) {
    content = error;
  }

  if (isLoading) {
    content = '로그인 진행 중...';
  }

  return (
    <>
      <h1>로그인</h1>
      <form onSubmit={handleFormSubmit}>
        <div css={[formControlCss, emailInputHasError && invalidInputCss]}>
          <label htmlFor="email">메일 주소</label>
          <input
            id="email"
            type="email"
            data-testid="email-input"
            onChange={handleEmailInputChange}
            onBlur={hadleEmailInputBlur}
            value={enteredEmail}
          />
          {emailInputHasError && (
            <p css={errorParagraph}>이메일 주소에 '@'를 포함해 주세요.</p>
          )}
        </div>
        <div css={[formControlCss, passwordInpuHasError && invalidInputCss]}>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            data-testid="password-input"
            onChange={hadlePasswordInputChange}
            onBlur={hadlePasswordInputBlur}
            value={enteredPassword}
          />
        </div>
        {passwordInpuHasError && (
          <p css={errorParagraph}>비밀번호를 8자 이상 입력해 주세요.</p>
        )}
        <div className="form-actions">
          <button disabled={!formIsValid} data-testid="signin-button">
            로그인
          </button>
        </div>
      </form>
      <p>{content}</p>
    </>
  );
};

export default SigninPage;
