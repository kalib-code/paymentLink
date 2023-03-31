import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";
import { useRouter } from "next/router";

export default function LinkCreate() {
  const router = useRouter();
  const { formProps, saveButtonProps, queryResult } = useForm({
    resource: "pay/link",
    dataProviderName: "next",
    onMutationSuccess: async () => {
      await router.push("/links");
    },
    successNotification: (data, values, resource) => {
      return {
        message: "Paylink Successfully Created.",
        description: "Success with no errors",
        type: "success",
      };
    },
  });
  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
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
          label="remarks"
          name={["remarks"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Create>
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
