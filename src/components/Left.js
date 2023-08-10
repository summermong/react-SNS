import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Left.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Left = () => {
  return (
    <div className={styles.leftnav}>
      <ul className={`nav ${styles.menu}`}>
        <h3 className="fw-bolder">최애의 아이돌</h3>
        <li className="nav-item">
          <div className="navIcon">
            <Link className="nav-link" aria-current="page" to="/join">
              <i className="bi bi-house-heart-fill"></i>
              <span>홈</span>
            </Link>
          </div>
        </li>

        <li className="nav-item">
          <div className="navIcon">
            <Link className="nav-link" aria-current="page" to="/">
              <i className="bi bi-search-heart"></i>
              <span>검색</span>
            </Link>
          </div>
        </li>
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/">
            <i className="bi bi-heart-fill"></i>
            <span>좋아요</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/">
            <i className="bi bi-person-fill"></i>
            <span>내 프로필</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Left;
