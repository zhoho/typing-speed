import React from "react";
import styled from "styled-components";

const Leaderboard = ({ scores }) => {
  return (
    <Content>
      <LeaderboardHeader>Leaderboard</LeaderboardHeader>
      <LeaderboardList>
        {scores.map((player) => (
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
            <span>{player.nickname}</span>
            <span>score: {player.score}</span>
          </LeaderboardItem>
        ))}
      </LeaderboardList>
    </Content>
  );
};

export default Leaderboard;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 30%;
`;

const LeaderboardHeader = styled.h1`
  margin-bottom: 20px;
`;

const LeaderboardList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
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
