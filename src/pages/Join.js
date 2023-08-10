import styles from './Join.module.css';
import axios from 'axios';
import React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Join = () => {
  // input 기본값
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  // 이메일 중복 확인 기본값
  const [emailConfirmed, setEmailConfirmed] = useState(false);

  // focus 기본값
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const RepasswordInput = useRef(null);

  // 정규표현식 기본값
  const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegEx =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

  // input 변경 시 useState 적용
  const ChangeJoinInfo = (e, inputType) => {
    const value = e.target.value;
    if (inputType === 'id') {
      setEmail(value);
    } else if (inputType === 'displayName') {
      setDisplayName(value);
    } else if (inputType === 'password') {
      setPassword(value);
    } else if (inputType === 'rePassword') {
      setRePassword(value);
    }
  };

  // 이메일 유효성 검사
  const confirmEmail = async (e) => {
    e.preventDefault();
    try {
      // 유효하지 않은 이메일
      if (!emailRegEx.test(email)) {
        alert('이메일을 다시 입력해주세요.');
        setEmail('');
        emailInput.current.focus();
        return;
      }

      // 유효한 경우 DB에서 해당 이메일 중복 체크
      const response = await axios.post(
        'https://6e32-2406-5900-103c-d815-f572-5dff-7e00-d937.ngrok-free.app/member/emailcheck',
        {
          email: email,
        }
      );

      // 동일한 이메일을 가진 정보가 있을 경우 리셋
      if (!response.data) {
        alert('중복된 이메일입니다.');
        setEmail('');
      } else {
        setEmailConfirmed(true);
        alert('사용 가능한 이메일입니다.');
      }
    } catch (error) {
      const firstError = error.response.data.errors[0]; // 에러 중 첫 번째 에러
      const defaultMessage = firstError.defaultMessage; // defaultMessage에 접근

      // 오류 메세지
      if (defaultMessage) {
        alert(defaultMessage);
        setEmail('');
      }
    }
  };

  const navigate = useNavigate();

  // 회원 가입
  const SubmitJoinInfo = async (e) => {
    e.preventDefault();

    // 이메일 중복 확인 여부
    if (!emailConfirmed) {
      alert('이메일 중복 확인을 해주세요.');
      return;
    }

    // 비밀번호 유효성 검사
    if (!passwordRegEx.test(password)) {
      alert('비밀번호를 다시 설정해주세요.');
      setPassword('');
      setRePassword('');
      passwordInput.current.focus();
      return;
    }

    // 비밀번호 일치 여부
    if (password !== rePassword) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      setRePassword('');
      RepasswordInput.current.focus();
      return;
    }

    // 모든 정보가 제대로 입력될 경우 DB로 정보 전송
    await axios
      .post(
        'https://6e32-2406-5900-103c-d815-f572-5dff-7e00-d937.ngrok-free.app/member/signup',
        {
          email: email,
          displayName: displayName,
          password: password,
        }
      )
      .then((response) => {
        if (response.data) {
          // true
          alert('회원가입이 완료되었습니다.');
          navigate('/');
        }
      })
      // 회원 가입 오류 발생
      .catch((error) => {
        console.log(error);
        if (error) {
          const firstError = error.response.data.errors[0]; // 에러 중 첫 번째 에러
          const defaultMessage = firstError.defaultMessage; // defaultMessage에 접근

          // 오류 메세지
          if (defaultMessage) {
            alert(defaultMessage);
            setEmail('');
          } else {
            alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
          }
        } else {
          console.error('Error:', error);
        }
      });
  };

  return (
    <div className={styles.Join}>
      <div className="text-center mb-5">
        <h1 className="fw-bolder">로고</h1>
        <div>계정 정보를 입력해주세요.</div>
      </div>
      <form onSubmit={SubmitJoinInfo}>
        <div className={styles.emailAndConfirmBtn}>
          <div className={styles.emailinput}>
            <label htmlFor="idInput" className="form-label">
              이메일
            </label>
            <input
              type="text"
              id="idInput"
              className="form-control"
              required
              placeholder="아이디로 사용할 이메일을 입력해주세요."
              value={email}
              onChange={(e) => ChangeJoinInfo(e, 'id')}
              ref={emailInput}
            />
          </div>
          <button
            type="button"
            className={styles.confirmBtn}
            onClick={confirmEmail}
          >
            이메일 확인
          </button>
        </div>

        <div className="mb-3">
          <label htmlFor="displayNameInput" className="form-label">
            닉네임
          </label>
          <input
            type="text"
            id="displayNameInput"
            className="form-control"
            placeholder="닉네임을 입력해주세요."
            value={displayName}
            onChange={(e) => ChangeJoinInfo(e, 'displayName')}
          />
        </div>
        <div className="mb-3">
          <div className={styles.passwordCondition}>
            <label htmlFor="passwordInput" className="form-label">
              비밀번호
            </label>
            <div className={styles.passwordDesc}>
              영문/숫자/특수문자가 모두 들어간 8~16자
            </div>
          </div>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(e) => ChangeJoinInfo(e, 'password')}
            ref={passwordInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="repasswordInput" className="form-label">
            비밀번호 확인
          </label>
          <input
            type="password"
            className="form-control"
            id="repasswordInput"
            placeholder="비밀번호를 다시 입력하세요."
            value={rePassword}
            onChange={(e) => ChangeJoinInfo(e, 'rePassword')}
            ref={RepasswordInput}
          />
        </div>
        <button type="submit" className={styles.submitBtn}>
          회원 가입 완료
        </button>
      </form>
    </div>
  );
};

export default Join;
