import React from "react";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";
import dayjs from "dayjs";
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { ApexOptions } from "apexcharts";

import { HttpError, useList } from "@refinedev/core";

import { Col, Row, Statistic } from "antd";
import { IPaymentRow } from "../../types";
import { currencyFormatter } from "utils";

export default function Payments() {

  const sevenDaysAgo = dayjs().subtract(7, 'day');

  const { data } = useList<IPaymentRow, HttpError>({
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
        acc.push({ Date: date, Amount: grossAmount })
    }
    return acc
  }, [] as { Date: string, Amount: number }[])

  // get the date of the last 7 days and put in array and sorted by date
  const lastSevenDays = Array.from({ length: 7 }, (_, i) => {
    return dayjs().subtract(i, 'day').format('YYYY-MM-DD')

  }).sort((a, b) => {
    return dayjs(a).diff(dayjs(b))
  })

  // get the gross amount of the last 7 days and put in array 
  const lastSevenDaysGross = lastSevenDays.map((item) => {
    const found = groupByDate?.find((date) => date.Date === item)
    if (found) {
      return found.Amount
    } else {
      return 0
    }
  })


  const getMonthName = lastSevenDays.map((item) => {
    return dayjs(item).format('MMM-DD')
  })


  const options:ApexOptions = {
    chart: {
      id: "Days",
      type: "line",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: getMonthName
    },
    stroke: {
      width: 2,
    },
    colors: ['#F44336'],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100]
      }
    },


  }
  const series = [
    {
      name: "Net Gross",
      data: lastSevenDaysGross
    }
  ]


  // compute total gross amount in array grossAmount is string
  const totalGross = data?.data.reduce((acc, curr) => {
    return acc + parseInt(curr.grossAmount as string)
  }, 0) as number

  // compute total net amount in array netAmount is string
  const totalNet = data?.data.reduce((acc, curr) => {
    return acc + parseInt(curr.netAmount as string)
  }, 0) as number

  // compute total fees amount in array fees is string
  const totalFees = data?.data.reduce((acc, curr) => {
    return acc + parseInt(curr.fees as string)
  }, 0) as number

  return (
    <Row>
      <Col span={4}>
        <Statistic title="Net Gross" value={currencyFormatter(totalGross)} />
      </Col>
      <Col span={4}>
        <Statistic title="Net Fees / Deduction" value={currencyFormatter(totalFees)} />
      </Col>
      <Col span={4}>
        <Statistic title="Net Revenue" value={currencyFormatter(totalNet)} />
      </Col>
      <Col span={20}>
        {(typeof window !== 'undefined') ? <Chart
          options={options}
          series={series}
          type="line"
          width="80%"
          height="300"
        /> : null}

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
