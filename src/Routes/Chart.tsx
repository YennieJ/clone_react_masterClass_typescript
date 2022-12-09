import React from "react";
import { fetchCoinHistory } from "../api";

import { useQuery } from "react-query";

import styled from "styled-components";
import ApexChart from "react-apexcharts";

const Loader = styled.span`
  display: block;
  text-align: center;
`;

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
}
const Chart = ({ coinId }: ChartProps) => {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  return (
    <div>
      {isLoading ? (
        <Loader> Loading Chart...</Loader>
      ) : (
        <ApexChart
          type="candlestick"
          series={
            [
              {
                data: data?.map((price) => {
                  return {
                    x: price.time_close,
                    y: [
                      Number(price.open),
                      Number(price.high),
                      Number(price.low),
                      Number(price.close),
                    ],
                  };
                }),
              },
            ] as unknown as number[]
          }
          options={{
            theme: {
              mode: "light",
            },
            chart: {
              type: "candlestick",
              height: 350,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              width: 2,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              // 바텀
              type: "datetime",
              categories: data?.map((price) => price.time_close),
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
