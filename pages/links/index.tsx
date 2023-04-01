import React from "react";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

import { BaseRecord } from "@refinedev/core";
import {
  useTable,
  List,
  ShowButton,
  DateField,
} from "@refinedev/antd";
import { Table, Space, Typography } from "antd";
import { currencyFormatter } from "utils";

const { Paragraph } = Typography;

export default function Links() {
  const { tableProps } = useTable({
    syncWithLocation: true,
    sorters: {
      initial: [
          {
              field: "created_at",
              order: "desc",
          },
      ],
  },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex={["attributes", "checkout_url"]} title="Link" render={(value)=><Paragraph  copyable={{
          tooltips: ['click here', 'you clicked!!'],
        }}>{value}</Paragraph>} />
        <Table.Column
          dataIndex={["created_at"]}
          title="Created At"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column dataIndex={["attributes", "status"]} title="Status" />
        <Table.Column dataIndex={["attributes", "description"]} title="Description" />
        <Table.Column dataIndex={["attributes", "amount"]} title="Amount" render={(text) => {
         return  currencyFormatter(text)
        }} />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <ShowButton
                hideText
                size="small"
                recordItemId={record.id}
              />
            </Space>
          )}
          />
        </Table>
      </List>
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
