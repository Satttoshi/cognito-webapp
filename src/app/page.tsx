'use client';

import styles from './page.module.css';
import styled from 'styled-components';

const StyledHeader = styled.h1`
  color: hotpink;
`;

export default function Home() {
  return (
    <main className={styles.main}>
      <StyledHeader>Hello World</StyledHeader>
    </main>
  );
}
