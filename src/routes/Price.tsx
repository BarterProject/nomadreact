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
  const { isLoading, data } = useQuery<IExchange[]>(
    "allCoins",
    fetchCoinExchange
  );
  //console.log(data);
  const dataPair = data?.map((newData) =>
    newData.pair.split("/")
  ) as string[][];
  const dataBCI = data?.map((newData) => newData.base_currency_id) as string[];
  const dataQCN = data?.map(
    (newData) => newData.quote_currency_name
  ) as string[];
  const dataPrice = data?.map(
    (newData) => newData.quotes.USD.price
  ) as number[];

  const count = [];
  for (var i = 0; i < dataBCI?.length; i++) {
    if (dataBCI[i] === coinId) {
      count.push(dataPrice[i] + " ");
      count.push(dataQCN[i]);
      count.push("\n");
    }
  }
  console.log(count);

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <div>
          <span>{coinId}은/는</span>
          <br />
          <span>{count}</span>
        </div>
      )}
    </div>
  );
}

export default Price;
