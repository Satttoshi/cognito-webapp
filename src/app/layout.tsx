import type { Metadata } from 'next';
import StyledComponentsRegistry from '../lib/registry';
import React from 'react';

export const metadata: Metadata = {
  title: 'cognito-webapp',
  description: 'cognito login for testing',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
