import { fetchCoinExchange } from "../api";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

interface RouteParams {
  coinId: string;
}

interface IExchange {
  pair: string;
  base_currency_id: string;
  base_currency_name: string;
  quote_currency_id: string;
  quote_currency_name: string;
  market_url: string;
  category: string;
  fee_type: string;
  outlier: boolean;
  reported_volume_24h_share: number;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
    };
  };
  trust_score: string;
  last_updated: string;
}

function Price() {
  const { coinId } = useParams<RouteParams>();
  const { isLoading, data } = useQuery<IExchange>(
    ["exchanges", coinId],
    () => fetchCoinExchange(),
    {
      // refetchInterval: 100000000,
    }
  );
  console.log(data);
  const newData = JSON.stringify(data?.pair);
  console.log(newData);
  return <div>{isLoading ? "Loading chart..." : <div>Price</div>}</div>;
}

export default Price;
