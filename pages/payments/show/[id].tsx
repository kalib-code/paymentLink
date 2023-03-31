
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

import React from "react";
import { useShow } from "@refinedev/core";
import {
  Show,
  TagField,
  TextField,
  DateField,
  NumberField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export default function PaymentShow() {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
      <Show isLoading={isLoading}>
        <Title level={5}>Id</Title>
        <TextField value={record?.id} />
        <Title level={5}>Created At</Title>
        <DateField value={record?.created_at} />
        <Title level={5}>Name</Title>
        <TextField value={record?.name} />
        <Title level={5}>Description</Title>
        <TextField value={record?.description} />
        <Title level={5}>Amount</Title>
        <NumberField value={record?.amount ?? ""} />
        <Title level={5}>Info</Title>
        <TextField value={record?.info} />
      </Show>
  );
};


export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  if (!authenticated) {
    return {
      props: {},
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent("/links")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
