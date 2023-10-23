'use client';

import { useState } from 'react';
import AWS from '../../../aws-config';
import { CognitoIdentityServiceProvider } from 'aws-sdk';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
      console.log('Authentication successful:', result);
      // Redirect or set authentication state here
    } catch (err) {
      console.error('Authentication error:', err);
      const errorText =
        err instanceof Error ? err.message : 'Authentication failed';
      setError(errorText);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
