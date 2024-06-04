import React from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";

const Leaderboard = ({ handleBack }) => {
  const rankings = [
    { rank: 1, name: "A", score: 902 },
    { rank: 2, name: "munu", score: 435 },
    { rank: 3, name: "h", score: 420 },
    { rank: 4, name: "jw", score: 415 },
    { rank: 5, name: "na", score: 401 },
    { rank: 6, name: "test", score: 396 },
    { rank: 7, name: "rtrf", score: 395 },
    { rank: 8, name: "not ez", score: 386 },
    { rank: 9, name: "flqlr", score: 381 },
    { rank: 10, name: "d", score: 375 },
  ];

  return (
    <Container>
      <Content>
        <LeaderboardHeader>Leaderboard</LeaderboardHeader>
        <LeaderboardList>
          {rankings.map((player) => (
            <LeaderboardItem key={player.rank}>
              <span>
                {player.rank === 1
                  ? "🥇"
                  : player.rank === 2
                  ? "🥈"
                  : player.rank === 3
                  ? "🥉"
                  : `#${player.rank}`}
              </span>
              <span>{player.name}</span>
              <span>score: {player.score}</span>
            </LeaderboardItem>
          ))}
        </LeaderboardList>
      </Content>
    </Container>
  );
};

export default Leaderboard;

const Container = styled.div`
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const LeaderboardHeader = styled.h1`
  margin-bottom: 20px;
`;

const LeaderboardList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
`;

const LeaderboardItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  font-size: 18px;
  span:first-child {
    font-weight: bold;
  }
`;
