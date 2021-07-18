import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getServerSideSession } from "../utils/auth";

export default function ProfilePage(props: any) {
  return <div>Profile: {props.user?.username}</div>;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const user = await getServerSideSession(ctx);

  return {
    props: {
      user,
    },
  };
}
