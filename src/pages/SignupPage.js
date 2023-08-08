import { css } from '@emotion/react';
import { useState } from 'react';
import useInput from '../hooks/use-input';

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

const SignupPage = () => {
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

  const handleFormSubmit = e => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    resetNameInput();
    resetPasswordInput();
  };

  return (
    <>
      <h1>회원가입</h1>
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
          <button disabled={!formIsValid} data-testid="signup-button">
            회원가입
          </button>
        </div>
      </form>
    </>
  );
};

export default SignupPage;
