import {ThemedLayout, notificationProvider} from "@refinedev/antd";
import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, {
  UnsavedChangesNotifier,
} from "@refinedev/nextjs-router";

import {ConfigProvider } from "antd";

import { CreditCardOutlined, LinkOutlined, DashboardOutlined } from "@ant-design/icons";

import type { NextPage } from "next";
import { AppProps } from "next/app";

import { Header } from "@components/header";
import { ColorModeContextProvider } from "@contexts";
import "@refinedev/antd/dist/reset.css";
import { dataProvider } from "@refinedev/supabase";
import {nextDataProvider} from "../utils/nextDataProvider";
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
    <div style={{display: "flex", alignItems: "center"}}>
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
              default:dataProvider(supabaseClient),
              next: nextDataProvider('http://localhost:3000/api'),
            }}
            authProvider={authProvider}
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
                edit: "/links/edit/:id",
                show: "/links/show/:id",
                meta: {
                  icon: <LinkOutlined />,
                },
              },{
                name: "payments",
                list: "/payments",
                create: "/payments/create",
                edit: "/payments/edit/:id",
                show: "/payments/show/:id",
                meta: {
                  icon: <CreditCardOutlined />,
                },
              }
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
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
