import { AuthPage } from "@refinedev/antd";
import Image from "next/image";

import { GetServerSideProps } from "next";

import { authProvider } from "src/authProvider";

export default function Login() {
  return (
    <AuthPage
      type="login"
      title={<Image src="/maglinksLG.png" width={250} height={120} alt="Refine" />}
    />
  );
}

Login.noLayout = true;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated } = await authProvider.check(context);

  if (authenticated) {
    return {
      props: {},
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
