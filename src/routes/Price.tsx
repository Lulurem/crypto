import { useRecoilValue } from "recoil";
import { fetchCoinPrice } from "../api";
import { isDarkAtom } from "./atoms";
import { useQuery } from "@tanstack/react-query";
import ApexCharts from "react-apexcharts";

interface IPrice {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface PriceProps {
  coinId: string;
}

function Price({ coinId }: PriceProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IPrice[]>(["price", coinId], () =>
    fetchCoinPrice(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading price..."
      ) : (
        <ApexCharts
          type="line"
          series={[
            {
              name: "price",
              data: data?.slice(0, 30).map(price => price.low) as number[],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
          }}
        />
      )}
    </div>
  );
}

export default Price;
