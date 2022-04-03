import { fetchCoinExchange } from "../api";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

interface RouteParams {
  coinId: string;
}

interface IExchange {
  exchange_id: string;
  exchange_name: string;
  pair: string;
  base_currency_id: string;
  base_currency_name: string;
  quote_currency_id: string;
  quote_currency_name: string;
  market_url: string;
  category: string;
  fee_type: string;
  outlier: boolean;
  adjusted_volume_24h_share: number;
  quotes: {
    BTC: {
      price: number;
      volume_24h: number;
    };
    CAD: {
      price: number;
      volume_24h: number;
    };
    ETH: {
      price: number;
      volume_24h: number;
    };
    EUR: {
      price: number;
      volume_24h: number;
    };
    GBP: {
      price: number;
      volume_24h: number;
    };
    JPY: {
      price: number;
      volume_24h: number;
    };
    KRW: {
      price: number;
      volume_24h: number;
    };
    PLN: {
      price: number;
      volume_24h: number;
    };
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
    ["allCoin", coinId],
    () => fetchCoinExchange(coinId),
    {
      refetchInterval: 10000,
    }
  );

  const dataPlus = data?.map((newData) => newData.quotes);
  /* const dataPair = data?.map((newData) =>
    newData.pair.split("/")
  ) as string[][]; */
  const dataPriceBTC = data?.map(
    (newData) => newData.quotes.BTC.price
  ) as number[];
  const dataPriceCAD = data?.map(
    (newData) => newData.quotes.CAD.price
  ) as number[];
  const dataPriceETH = data?.map(
    (newData) => newData.quotes.ETH.price
  ) as number[];
  const dataPriceEUR = data?.map(
    (newData) => newData.quotes.EUR.price
  ) as number[];
  const dataPriceGBP = data?.map(
    (newData) => newData.quotes.GBP.price
  ) as number[];
  const dataPriceJPY = data?.map(
    (newData) => newData.quotes.JPY.price
  ) as number[];
  const dataPriceKRW = data?.map(
    (newData) => newData.quotes.KRW.price
  ) as number[];
  const dataPricePLN = data?.map(
    (newData) => newData.quotes.PLN.price
  ) as number[];
  const dataPriceUSD = data?.map(
    (newData) => newData.quotes.USD.price
  ) as number[];

  /*   const count = [];
  for (var i = 0; i < dataBCI?.length; i++) {
    if (dataBCI[i] === coinId) {
      count.push(dataPrice[i] + " ");
      count.push(dataQCN[i]);
      count.push("\n");
    }
  }  */
  //console.log(count);
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <div>
          <span>{coinId}은/는</span>
          <br />
          <span></span>
          <p>{dataPriceBTC[0].toFixed(3)} BTC</p>
          <p>{dataPriceCAD[0].toFixed(3)} CAD</p>
          <p>{dataPriceETH[0].toFixed(3)} ETH</p>
          <p>{dataPriceEUR[0].toFixed(3)} EUR</p>
          <p>{dataPriceGBP[0].toFixed(3)} GBP</p>
          <p>{dataPriceJPY[0].toFixed(3)} JPY</p>
          <p>{dataPriceKRW[0].toFixed(3)} KRW</p>
          <p>{dataPricePLN[0].toFixed(3)} PLN</p>
          <p>{dataPriceUSD[0].toFixed(3)} USD</p>
        </div>
      )}
    </div>
  );
}

export default Price;
