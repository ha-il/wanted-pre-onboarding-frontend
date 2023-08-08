import { css } from '@emotion/react';
import { useState } from 'react';

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
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false);

  const enteredEmailIsValid = enteredEmail.includes('@');
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  const enteredPasswordIsValid = enteredPassword.length >= 8;
  const passwordInputIsInvalid =
    !enteredPasswordIsValid && enteredPasswordTouched;

  let formIsValid = false;
  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const handleEmailInputChange = e => {
    setEnteredEmail(e.target.value);
  };
  const hadlePasswordInputChange = e => {
    setEnteredPassword(e.target.value);
  };

  const hadleEmailInputBlur = () => {
    setEnteredEmailTouched(true);
  };
  const hadlePasswordInputBlur = () => {
    setEnteredPasswordTouched(true);
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    setEnteredEmailTouched(true);
    setEnteredPasswordTouched(true);

    if (!formIsValid) {
      return;
    }

    setEnteredEmail('');
    setEnteredPassword('');
    setEnteredEmailTouched(false);
    setEnteredPasswordTouched(false);
  };

  return (
    <>
      <h1>회원가입</h1>
      <form onSubmit={handleFormSubmit}>
        <div css={[formControlCss, emailInputIsInvalid && invalidInputCss]}>
          <label htmlFor="email">메일 주소</label>
          <input
            id="email"
            type="email"
            data-testid="email-input"
            onChange={handleEmailInputChange}
            onBlur={hadleEmailInputBlur}
            value={enteredEmail}
          />
          {emailInputIsInvalid && (
            <p css={errorParagraph}>이메일 주소에 '@'를 포함해 주세요.</p>
          )}
        </div>
        <div css={[formControlCss, passwordInputIsInvalid && invalidInputCss]}>
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
        {passwordInputIsInvalid && (
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
