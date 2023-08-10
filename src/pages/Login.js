import styles from './Login.module.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setIsLogin }) => {
  // input 기본값
  const [loginid, setLoginId] = useState('');
  const [loginpw, setLoginPw] = useState('');

  // input 변경 시 useState 적용
  const ChangeLoginInfo = (e, inputType) => {
    const value = e.target.value;
    if (inputType === 'id') {
      setLoginId(value);
    } else if (inputType === 'pw') {
      setLoginPw(value);
    }
  };

  // 로그인 시 입력한 정보와 DB의 정보 대조
  const SubmitLogin = (e) => {
    e.preventDefault();

    const user = {
      email: loginid,
      password: loginpw,
    };

    axios
      .post(
        'https://6e32-2406-5900-103c-d815-f572-5dff-7e00-d937.ngrok-free.app/member/login',
        user
      )
      .then((response) => {
        console.log(response);
        if (response.data === 1) {
          // 존재하지 않는 회원
          setLoginId('');
          setLoginPw('');
          alert('존재하지 않는 아이디입니다.');
        } else if (response.data === 2) {
          // 비밀번호 틀림
          setLoginPw('');
          alert('비밀번호를 다시 확인해주세요.');
        } else if (response.data === 3) {
          // 로그인 성공
          alert('로그인이 완료되었습니다.');
          setIsLogin(true);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="Login">
      <div className="text-center mb-5">
        <h1 className="fw-bolder">최애의 아이돌 💜</h1>
        <p>당신의 최애를 알리고 새로운 최애를 만나보세요!</p>
      </div>
      <form className="text-black-50" onSubmit={SubmitLogin}>
        <div className="mb-3">
          <label htmlFor="emailinput" className="form-label">
            아이디
          </label>
          <input
            type="email"
            id="emailinput"
            className="form-control"
            placeholder="아이디를 입력하세요."
            value={loginid}
            onChange={(e) => ChangeLoginInfo(e, 'id')}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">
            비밀번호
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="비밀번호를 입력하세요."
            id="passwordInput"
            value={loginpw}
            onChange={(e) => ChangeLoginInfo(e, 'pw')}
          />
        </div>
        <button type="submit" className={styles.submitBtn}>
          로그인
        </button>
      </form>
      <div className="d-flex justify-content-evenly mt-4">
        <div className="text-black-50">아직 계정이 없으신가요?</div>
        <div className="joinText">
          <Link to={'/join'} className={styles.text}>
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
