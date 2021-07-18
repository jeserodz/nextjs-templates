import { signIn } from 'next-auth/client';
import { useEffect } from 'react';

export default function MobileSignin() {
  useEffect(() => {
    signIn('auth0', { callbackUrl: `${location.origin}/mobile-auth/session` });
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
      Signing In...
    </div>
  );
}
