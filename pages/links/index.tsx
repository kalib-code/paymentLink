import React from "react";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

import { BaseRecord } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DateField,
} from "@refinedev/antd";
import {Table, Space, InputNumber, Badge} from "antd";

export default function Links () {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
      <List>
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex={["attributes","checkout_url"]} title="Link" />
          <Table.Column
              dataIndex={["created_at"]}
              title="Created At"
              render={(value: any) => <DateField value={value} />}
          />
          <Table.Column dataIndex={["attributes","status"]} title="Status" />
          <Table.Column dataIndex={["attributes","description"]} title="Description" />
          <Table.Column  dataIndex={["attributes","amount"]} title="Amount" render={(text)=>{
            const value = parseInt(text) / 100;
            return value.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' });
          }} />
          {/*<Table.Column dataIndex="info" title="Info" />*/}
          {/*<Table.Column*/}
          {/*    title="Actions"*/}
          {/*    dataIndex="actions"*/}
          {/*    render={(_, record: BaseRecord) => (*/}
          {/*        <Space>*/}
          {/*          <EditButton*/}
          {/*              hideText*/}
          {/*              size="small"*/}
          {/*              recordItemId={record.id}*/}
          {/*          />*/}
          {/*          <ShowButton*/}
          {/*              hideText*/}
          {/*              size="small"*/}
          {/*              recordItemId={record.id}*/}
          {/*          />*/}
          {/*        </Space>*/}
          {/*    )}*/}
          {/*/>*/}
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
