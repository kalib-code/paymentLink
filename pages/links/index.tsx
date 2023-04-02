import React from "react";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

import { BaseRecord, HttpError } from "@refinedev/core";
import {
  useTable,
  List,
  ShowButton,
  DateField,
  useModal,
  useForm,
} from "@refinedev/antd";
import { Table, Space, Typography, Tag, Modal, Button, Form, Input, InputNumber } from "antd";
import { currencyFormatter } from "utils";
import { ILinkRow } from "types";
import TextArea from "antd/es/input/TextArea";

const { Paragraph, Link } = Typography;

export default function Links() {
  const { tableProps } = useTable<ILinkRow, HttpError>({
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

  const { formProps, saveButtonProps, queryResult } = useForm({
    resource: "pay/link",
    dataProviderName: "next",
    onMutationSuccess: async () => {
      close();
    },
    successNotification: (data, values, resource) => {
      return {
        message: "Paylink Successfully Created.",
        description: "Success with no errors",
        type: "success",
      };
    },
  });


  const { modalProps, show, close } = useModal({
    modalProps: {
      title: "Create Paylink",
      okButtonProps: { ...saveButtonProps }
    }
  });



  return (
    <List
      headerProps={{
        extra: <Button type="primary" onClick={show}>Create</Button>
      }}
    >

      <Modal {...modalProps}>
        <Form {...formProps} layout="vertical">
          <Form.Item
            label="Amount"
            name={["amount"]}
            rules={[
              {
                required: true,
                validator: (_, value) => {
                  if (value < 100) {
                    return Promise.reject("Amount must be greater than 100");
                  }
                },
              }
            ]}
          >
            <InputNumber
              addonBefore="PHP"
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name={["description"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label="Remarks"
            name={["remarks"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>

      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex={["attributes", "checkout_url"]} title="Link" render={(value) => <Paragraph copyable={{
          tooltips: ['click here', 'you clicked!!'],
        }}><Link href={value} target="_blank">
            {value}
          </Link></Paragraph>} />
        <Table.Column
          dataIndex={["created_at"]}
          title="Created At"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column dataIndex={["attributes", "status"]} title="Status" render={(value) => {
          return value === "paid" ? <Tag color="success">Paid</Tag> : <Tag color="warning">Unpaid</Tag>
        }} />
        <Table.Column dataIndex={["attributes", "description"]} title="Description" />
        <Table.Column dataIndex={["attributes", "amount"]} title="Amount" render={(text) => {
          return currencyFormatter(text)
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
