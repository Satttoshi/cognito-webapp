'use client';

import styles from './page.module.css';
import styled from 'styled-components';
import Login from '@/app/Login';

const StyledHeader = styled.h1`
  color: hotpink;
`;

export default function Home() {
  return (
    <main className={styles.main}>
      <StyledHeader>Hello World</StyledHeader>
      <Login />
      <button onClick={() => console.log(process.env.NEXT_PUBLIC_TEST)}>
        Hey
      </button>
    </main>
  );
}
