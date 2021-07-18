import { signIn, signOut } from 'next-auth/client';
import { useEffect } from 'react';

export default function MobileSignout() {
  useEffect(() => {
    signOut({ callbackUrl: `${location.origin}/mobile-auth/session` });
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      Signing Out...
    </div>
  );
}
