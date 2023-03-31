import {ThemedLayout, notificationProvider , Title} from "@refinedev/antd";
import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, {
  UnsavedChangesNotifier,
} from "@refinedev/nextjs-router";

import { CreditCardOutlined, LinkOutlined } from "@ant-design/icons";

import type { NextPage } from "next";
import { AppProps } from "next/app";

import { Header } from "@components/header";
import { ColorModeContextProvider } from "@contexts";
import "@refinedev/antd/dist/reset.css";
import { dataProvider } from "@refinedev/supabase";
import {nextDataProvider} from "../utils/nextDataProvider";
import { authProvider } from "src/authProvider";
import { supabaseClient } from "src/utility";
import {Typography} from "antd";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};



function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />;
    }

    return (
      <ThemedLayout Header={Header}  >
        <Component {...pageProps} />
      </ThemedLayout>
    );
  };

  return (
    <>
      <RefineKbarProvider>
        <ColorModeContextProvider>
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
                name: "links",
                list: "/links",
                create: "/links/create",
                edit: "/links/edit/:id",
                show: "/links/show/:id",
                meta: {
                  canDelete: true,
                  icon: <LinkOutlined />,
                },
              },{
                name: "payments",
                list: "/payments",
                create: "/payments/create",
                edit: "/payments/edit/:id",
                show: "/payments/show/:id",
                meta: {
                  canDelete: true,
                  icon: <CreditCardOutlined />,
                },
              },
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
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </>
  );
}

export default MyApp;
