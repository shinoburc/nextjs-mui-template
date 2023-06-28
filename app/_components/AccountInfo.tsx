'use client';

import React from 'react';
import Button from '@mui/material/Button';

import { useSession, signIn, signOut } from 'next-auth/react';
import PersonIcon from '@mui/icons-material/Person';

const AccountInfo = () => {
  const { data: session, status } = useSession();
  return (
    <>
      {status === 'authenticated' && (
        <>
          <PersonIcon />
          <span>Signed in as {session?.user?.name}</span>
          <Button onClick={() => signOut()} variant='contained' color='secondary'>
            Sign out
          </Button>
        </>
      )}
      {status !== 'authenticated' && (
        <Button onClick={() => signIn()} variant='contained' color='secondary'>
          Sign in
        </Button>
      )}
    </>
  );
};

export default AccountInfo;
