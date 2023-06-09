import { ThemedLayout, notificationProvider } from "@refinedev/antd";
import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, {
  UnsavedChangesNotifier,
} from "@refinedev/nextjs-router";

import { ConfigProvider } from "antd";

import { CreditCardOutlined, LinkOutlined, DashboardOutlined } from "@ant-design/icons";

import type { NextPage } from "next";
import { AppProps } from "next/app";

import { Header } from "@components/header";
import "@refinedev/antd/dist/reset.css";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { nextDataProvider } from "../utils/nextDataProvider";
import { authProvider } from "src/authProvider";
import { supabaseClient } from "src/utility";

import Image from "next/image";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const customTitle = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Image src="/maglinksLG.png" width={130} height={70} alt="Maglicks" />
    </div>
  )
}


function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />;
    }

    return (
      <ThemedLayout Header={Header} Title={customTitle}  >
        <Component {...pageProps} />
      </ThemedLayout>
    );
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASEURL

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#F44336',
          },
        }}
      >
        <RefineKbarProvider>
          {/* <ColorModeContextProvider> */}

          <Refine
            routerProvider={routerProvider}
            dataProvider={{
              default: dataProvider(supabaseClient),
              next: nextDataProvider(`${baseUrl}/api`),
            }}
            authProvider={authProvider}
            liveProvider={liveProvider(supabaseClient)}
            notificationProvider={notificationProvider}
            resources={[
              {
                name: "dashboard",
                list: "/dashboard",
                meta: {
                  icon: <DashboardOutlined />,
                },
              },
              {
                name: "links",
                list: "/links",
                create: "/links/create",
                show: "/links/show/:id",
                meta: {
                  icon: <LinkOutlined />,
                },
              }, {
                name: "payments",
                list: "/payments",
                show: "/payments/show/:id",
                meta: {
                  icon: <CreditCardOutlined />,
                },
              }
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              liveMode: "auto",
            }}
          >
            {renderComponent()}
            <RefineKbar />
            <UnsavedChangesNotifier />
          </Refine>
          {/* </ColorModeContextProvider> */}
        </RefineKbarProvider>
      </ConfigProvider>
    </>
  );
}

export default MyApp;