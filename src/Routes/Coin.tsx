import React from "react";
import { Helmet } from "react-helmet";

import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
  useHistory,
} from "react-router-dom";

import Chart from "./Chart";
import Price from "./Price";

import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";

const Container = styled.div`
  max-width: 480px;

  padding: 0 20px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 15vh;

  position: relative;
  button {
    position: absolute;

    border-radius: 10px;

    background-color: ${(props) => props.theme.contentBgc};

    cursor: pointer;

    &:nth-child(1) {
      left: 0%;

      display: flex;
      justify-content: center;
      align-items: center;

      width: 40px;
      height: 40px;
      border: none;

      font-size: 40px;
      color: ${(props) => props.theme.textColor};
      &:hover {
        color: ${(props) => props.theme.accentColor};
      }
    }
    &:nth-child(2) {
      top: 15px;
      right: 10px;

      border: none;
      padding: 5px;

      font-size: 20px;
    }
    &:hover {
      background-color: ${(props) => props.theme.hoverColor};
      transition: background-color 0.2s ease-in;
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 10px 20px;
  border-radius: 10px;

  background-color: ${(props) => props.theme.contentBgc};
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:nth-child(1) {
    margin-bottom: 5px;

    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
  }
`;

const Description = styled.p`
  border-radius: 10px;
  padding: 10px 20px;
  margin: 20px 0;

  background-color: ${(props) => props.theme.contentBgc};
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin: 25px 0;
`;

const Tab = styled.span<{ isActive: boolean }>`
  border-radius: 10px;

  text-align: center;
  text-transform: uppercase;

  font-size: 12px;
  font-weight: 400;
  color: ${(props) =>
    props.isActive ? props.theme.contentBgc : props.theme.textColor};
  background-color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.contentBgc};
  a {
    display: block;
    padding: 7px 0;
  }

  &:hover {
    color: ${(props) => props.theme.accentColor};
    background-color: ${(props) => props.theme.hoverColor};
  }
`;

interface RouteParams {
  coinId: string;
}

interface StateParams {
  name: string;
  id: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags: object;
  team: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
interface CoinProps {
  toggleTheme: () => void;
  theme: string;
}
const Coin = ({ toggleTheme, theme }: CoinProps) => {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<StateParams>();

  const chartMatch = useRouteMatch("/:coinId/chart");
  const priceMatch = useRouteMatch("/:coinId/price");

  const history = useHistory();

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId)
    //실시간을 원할 때
    // {
    //   refetchInterval: 5000,
    // }
  );

  const loading = infoLoading || tickersLoading;
  return (
    <>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Container>
        <Header>
          <button onClick={() => history.push("/")}>&lt;</button>
          <button onClick={toggleTheme}>
            {theme === "light" ? "🌚" : "🌝"}
          </button>

          <Title>
            {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
          </Title>
        </Header>
        {loading ? (
          <Loader> Loading...</Loader>
        ) : (
          <>
            <Overview>
              <OverviewItem>
                <span>Rank:</span>
                <span>{infoData?.rank}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Symbol:</span>
                <span>{infoData?.symbol}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Price</span>
                <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
              </OverviewItem>
            </Overview>
            <Description>{infoData?.description}</Description>
            <Overview>
              <OverviewItem>
                <span>Total Suply:</span>
                <span>{tickersData?.total_supply}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Max Supply:</span>
                <span>{tickersData?.max_supply}</span>
              </OverviewItem>
            </Overview>
            <Tabs>
              <Tab isActive={chartMatch !== null}>
                <Link to={`/${coinId}/chart`}>Chart</Link>
              </Tab>
              <Tab isActive={priceMatch !== null}>
                <Link to={`/${coinId}/price`}>Price</Link>
              </Tab>
            </Tabs>

            <Switch>
              <Route path={`/:coinId/chart`}>
                <Chart coinId={coinId} />
              </Route>
              <Route path={`/:coinId/price`}>
                <Price data={tickersData} />
              </Route>
            </Switch>
          </>
        )}
      </Container>
    </>
  );
};

export default Coin;
