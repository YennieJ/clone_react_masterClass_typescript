import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import { fetchCoins } from "../api";

import styled from "styled-components";

const Container = styled.div`
  max-width: 480px;

  padding: 0 20px;
  margin: 0 auto;
`;

const Header = styled.header`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 15vh;
  button {
    position: absolute;
    top: 15px;
    right: 10px;

    border: none;
    border-radius: 10px;
    padding: 5px;

    font-size: 20px;
    background-color: ${(props) => props.theme.contentBgc};

    cursor: pointer;

    &:hover {
      background-color: ${(props) => props.theme.hoverColor};
      transition: background-color 0.2s ease-in;
    }
  }
`;

const CoinList = styled.ul``;

const CoinStyle = styled.li`
  border-radius: 15px;
  margin-bottom: 10px;

  color: ${(props) => props.theme.bgColor};
  background-color: ${(props) => props.theme.contentBgc};
  a {
    display: flex;
    align-items: center;

    padding: 20px;
    color: ${(props) => props.theme.textColor};
  }
  &:hover {
    background-color: ${(props) => props.theme.hoverColor};
    transition: background-color 0.2s ease-in;
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

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface CoinsProps {
  toggleTheme: () => void;
  theme: string;
}

const Coins = ({ toggleTheme, theme }: CoinsProps) => {
  const { isLoading, data } = useQuery<ICoins[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
        <button onClick={toggleTheme}>{theme === "light" ? "🌚" : "🌝"}</button>
      </Header>
      {isLoading ? (
        <Loader> Loading...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <CoinStyle key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  alt="IMG"
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </CoinStyle>
          ))}
        </CoinList>
      )}
    </Container>
  );
};

export default Coins;
