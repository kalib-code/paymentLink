import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";


import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker } from "antd";
import dayjs from "dayjs";

export default function PaymentEdit(){
  const { formProps, saveButtonProps, queryResult } = useForm();

  const linksData = queryResult?.data?.data;

  return (
      <Edit saveButtonProps={saveButtonProps}>
        <Form {...formProps} layout="vertical">
          <Form.Item
              label="Id"
              name={["id"]}
              rules={[
                {
                  required: true,
                },
              ]}

          >
              <Input readOnly disabled />
          </Form.Item>
              <Form.Item
                  label="Link"
                  name={["link"]}
                  rules={[
                      {
                          required: false,
                      },
                  ]}
              >
            <Input readOnly disabled />
          </Form.Item>
          {/*<Form.Item*/}
          {/*    label="Created At"*/}
          {/*    name={["created_at"]}*/}
          {/*    rules={[*/}
          {/*      {*/}
          {/*        required: true,*/}
          {/*      },*/}
          {/*    ]}*/}
          {/*    getValueProps={(value) => ({*/}
          {/*      value: value ? dayjs(value) : undefined,*/}
          {/*    })}*/}
          {/*>*/}
          {/*  <DatePicker />*/}
          {/*</Form.Item>*/}
          <Form.Item
              label="Name"
              name={["name"]}
              rules={[
                {
                  required: true,
                },
              ]}
          >
            <Input />
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
            <Input />
          </Form.Item>
          <Form.Item
              label="Amount"
              name={["amount"]}
              rules={[
                {
                  required: true,
                },
              ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label="Info"
              name={["info"]}
              rules={[
                {
                  required: true,
                },
              ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Edit>
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
