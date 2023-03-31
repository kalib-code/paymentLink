import React from "react";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

import { BaseRecord, HttpError } from "@refinedev/core";
import {
  DateField,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { Space, Table } from "antd";
import { ILink } from "../../types";

export default function Payments() {
  const { tableProps, tableQueryResult } = useTable<ILink, HttpError>({
    resource: "links",
    syncWithLocation: true
  });

  const { data, isLoading } = tableQueryResult;

  if (isLoading) return <div>Loading...</div>;

  tableProps.dataSource = data?.data?.filter(
    (item: any) => item.attributes.payments.length > 0
  );

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex={["attributes", "payments", "0", "data", "id"]}
          title="ID"
        />
        <Table.Column
          dataIndex={[
            "attributes",
            "payments",
            "0",
            "data",
            "attributes",
            "created_at",
          ]}
          title="Created At"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex={[
            "attributes",
            "payments",
            "0",
            "data",
            "attributes",
            "status",
          ]}
          title="Status"
        />
        <Table.Column
          dataIndex={[
            "attributes",
            "payments",
            "0",
            "data",
            "attributes",
            "billing",
            "email",
          ]}
          title="Payer"
        />
        <Table.Column dataIndex={["attributes", "amount"]} title="Amount" render={(text)=>{
            const value = parseInt(text) / 100;
            return value.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' });
        }} />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
}

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
