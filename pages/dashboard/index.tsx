import React from "react";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";
import dayjs from "dayjs";
import dynamic from 'next/dynamic';
const Line = dynamic(() => import('@ant-design/plots').then(({ Line }) => Line),
    { ssr: false }
);


import {HttpError, useList } from "@refinedev/core";

import { Col, Row, Statistic } from "antd";
import { IPaymentRow } from "../../types";
import { currencyFormatter } from "utils";

export default function Payments() {

    const sevenDaysAgo = dayjs().subtract(7, 'day');

    const {data} = useList<IPaymentRow, HttpError>({
        resource: 'payments',
        dataProviderName: 'default',
        filters: [
            {
                field: 'created_at',
                operator: 'gte',
                value: sevenDaysAgo.format('YYYY-MM-DD')
            }
        ],

    })
   const dataMap = data?.data.map((item) => {
        return {
            grossAmount: (parseInt(item.grossAmount as string) / 100),
            created_at: dayjs(item.created_at).format('YYYY-MM-DD')
        }
   })

    // group by date and add the gross amount output array of object
    const groupByDate = dataMap?.reduce((acc, curr) => {
        const date = curr.created_at
        const grossAmount = curr.grossAmount
        const found = acc.find((item) => item.Date === date)
        if (found) {
            found.Amount += grossAmount
        } else {
            acc.push({Date: date, Amount: grossAmount})
        }
        return acc
    }, [] as {Date: string, Amount: number}[])

    const config = {
        data:groupByDate,
        padding: 'auto',
        xField: 'Date',
        yField: 'Amount',
        xAxis: {
            // type: 'timeCat',
            tickCount: 5,
          },
      };

    // compute total gross amount in array grossAmount is string
    const totalGross = data?.data.reduce((acc, curr) => {
        return acc + parseInt(curr.grossAmount as string)
    }, 0) as number

  return (
   <Row>
    <Col span={24}>
      <Statistic title="Net Gross" value={currencyFormatter(totalGross)} />
    </Col>
    <Col span={20}>

      {/* @ts-ignore */}
   <Line {...config} />
    </Col>
        
   </Row>


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
