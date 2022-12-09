import React from "react";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 220px;
  padding: 20px 15px;

  border-radius: 10px;

  background-color: ${(props) => props.theme.contentBgc};
`;

const Header = styled.div`
  div {
    &:nth-child(1) {
      font-size: 35px;
      margin-bottom: 15px;
    }
    &:nth-child(2) {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      height: 40px;
      span {
        &:nth-child(1) {
          font-weight: 400;
        }
        &:nth-child(2) {
          font-size: 18px;
          font-weight: 200;
        }
      }
    }
  }
`;

const Items = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  span {
    &:nth-child(1) {
      padding: 10px 0;
      border-bottom: 1px solid #606060;
      font-weight: 400;
    }
    &:nth-child(2) {
      padding-top: 10px;
      font-size: 18px;
      font-weight: 200;
    }
  }
`;

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

interface PriceProps {
  data?: PriceData;
}

const Price = ({ data }: PriceProps) => {
  const USD = data?.quotes.USD;
  const Price = USD?.price.toLocaleString();
  const hoursChange = USD?.percent_change_1h;
  const dayChange = USD?.percent_change_24h;
  const weekChange = USD?.percent_change_7d;
  const dayVolume = USD?.volume_24h.toLocaleString();
  const marketCap = USD?.market_cap.toLocaleString();

  return (
    <>
      <Container>
        <Header>
          <div>${Price}</div>
          <div>
            <span>Market Cap</span>
            <span>${marketCap}</span>
          </div>
        </Header>
        <Items>
          <Item>
            <span>1h %</span>
            <span>{hoursChange}%</span>
          </Item>
          <Item>
            <span>24h %</span>
            <span>{dayChange}%</span>
          </Item>
          <Item>
            <span>7d %</span>
            <span>{weekChange}%</span>
          </Item>
          <Item>
            <span>24H Volume</span>
            <span>${dayVolume}</span>
          </Item>
        </Items>
      </Container>
    </>
  );
};

export default Price;
