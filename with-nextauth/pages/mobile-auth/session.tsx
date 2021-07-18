import { GetServerSidePropsContext } from 'next';
import { getSession, Session } from 'next-auth/client';
import { useEffect } from 'react';

declare namespace window {
  export const ReactNativeWebView: any;
}

interface Props {
  session: Session | null;
  sessionToken: string | null;
}

export default function MobileAuthSession(props: Props) {
  // If the page is loaded from React Native, send session data.
  useEffect(() => {
    window.ReactNativeWebView?.postMessage(JSON.stringify(props));
  }, []);

  return <div>{JSON.stringify(props, null, 2)}</div>;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getSession({ ctx });
  return {
    props: {
      session,
      sessionToken: session && ctx.req.cookies['next-auth.session-token'],
    },
  };
}
