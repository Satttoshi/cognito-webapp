'use client';

import styled from 'styled-components';
import Login from '@/app/Login';

const StyledHeader = styled.h1`
  color: hotpink;
`;

export default function Home() {
  return (
    <main>
      <StyledHeader>Hello World</StyledHeader>
      <Login />
    </main>
  );
}
