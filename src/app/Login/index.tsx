'use client';

import { useState } from 'react';
import AWS from '../../../aws-config';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styled from 'styled-components';

const StyledLoginContainer = styled.div`
  width: 400px;
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [session, setSession] = useState('');

  const handleLogin = async () => {
    const cognito = new AWS.CognitoIdentityServiceProvider();

    const params: CognitoIdentityServiceProvider.InitiateAuthRequest = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: process.env.NEXT_PUBLIC_CLIENT_ID ?? '',
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    };

    try {
      const result = await cognito.initiateAuth(params).promise();

      if (result.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
        setNewPassword('');
        setSession(result.Session ?? '');
      } else {
        console.log('Authentication successful:', result);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      const errorText =
        error instanceof Error ? error.message : 'Authentication failed';
      setError(errorText);
    }
  };

  const completeNewPasswordChallenge = async () => {
    const cognito = new AWS.CognitoIdentityServiceProvider();

    try {
      const result = await cognito
        .respondToAuthChallenge({
          ChallengeName: 'NEW_PASSWORD_REQUIRED',
          Session: session,
          ClientId: process.env.NEXT_PUBLIC_CLIENT_ID ?? '',
          ChallengeResponses: {
            NEW_PASSWORD: newPassword, // Provide the new password
            USERNAME: email, // Provide the username again
          },
        })
        .promise();
      console.log('New password set successfully', result);
    } catch (error) {
      console.error('New password error', error);
      const errorText =
        error instanceof Error ? error.message : 'Failed to set new password';
      setError(errorText);
    }
  };

  return (
    <StyledLoginContainer>
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
      {session && (
        <div>
          <h2>Set New Password</h2>
          <TextField
            label="new Password"
            variant="outlined"
            fullWidth
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button onClick={completeNewPasswordChallenge}>Set Password</Button>
        </div>
      )}
    </StyledLoginContainer>
  );
}
