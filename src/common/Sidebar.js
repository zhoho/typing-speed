import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";

const Sidebar = ({
  timeElapsed = 0,
  wordsPerMinute = 0,
  accuracy = 0,
  handleLanguageSelect,
  showLeaderboard,
  view,
  handleBack,
  myScore,
}) => {
  const [selectLanguage, setSelectLanguage] = useState("");

  return (
    <SidebarContainer>
      <LogoContainer>
        <Logo src={logo} alt="Taco Typing Code" />
      </LogoContainer>
      {view !== "leaderboard" ? (
        <>
          <Explorer>
            <h2>Explorer</h2>
            <LanguageList>
              <LanguageItem
                onClick={() => {
                  handleLanguageSelect("c");
                  setSelectLanguage("c");
                }}
                style={{ fontWeight: selectLanguage === "c" ? "bold" : "" }}
              >
                C/C++
              </LanguageItem>
              <LanguageItem
                onClick={() => {
                  handleLanguageSelect("python");
                  setSelectLanguage("python");
                }}
                style={{
                  fontWeight: selectLanguage === "python" ? "bold" : "",
                }}
              >
                Python
              </LanguageItem>
              <LanguageItem
                onClick={() => {
                  handleLanguageSelect("java");
                  setSelectLanguage("java");
                }}
                style={{ fontWeight: selectLanguage === "java" ? "bold" : "" }}
              >
                Java
              </LanguageItem>
              <LanguageItem
                onClick={() => {
                  handleLanguageSelect("javascript");
                  setSelectLanguage("javascript");
                }}
                style={{
                  fontWeight: selectLanguage === "javascript" ? "bold" : "",
                }}
              >
                Javascript
              </LanguageItem>
              <LanguageItem
                onClick={() => {
                  handleLanguageSelect("typescript");
                  setSelectLanguage("typescript");
                }}
                style={{
                  fontWeight: selectLanguage === "typescript" ? "bold" : "",
                }}
              >
                Typescript
              </LanguageItem>
              <LanguageItem
                onClick={() => {
                  handleLanguageSelect("dart");
                  setSelectLanguage("dart");
                }}
                style={{ fontWeight: selectLanguage === "dart" ? "bold" : "" }}
              >
                Dart
              </LanguageItem>
              <LanguageItem
                onClick={() => {
                  handleLanguageSelect("go");
                  setSelectLanguage("go");
                }}
                style={{ fontWeight: selectLanguage === "go" ? "bold" : "" }}
              >
                Go
              </LanguageItem>
              <LanguageItem
                onClick={() => {
                  handleLanguageSelect("ruby");
                  setSelectLanguage("ruby");
                }}
                style={{ fontWeight: selectLanguage === "ruby" ? "bold" : "" }}
              >
                Ruby
              </LanguageItem>
              <LanguageItem
                onClick={() => {
                  handleLanguageSelect("rust");
                  setSelectLanguage("rust");
                }}
                style={{ fontWeight: selectLanguage === "rust" ? "bold" : "" }}
              >
                Rust
              </LanguageItem>
              <LanguageItem
                onClick={() => {
                  handleLanguageSelect("kotlin");
                  setSelectLanguage("kotlin");
                }}
                style={{
                  fontWeight: selectLanguage === "kotlin" ? "bold" : "",
                }}
              >
                Kotlin
              </LanguageItem>
              <LanguageItem
                onClick={() => {
                  handleLanguageSelect("swift");
                  setSelectLanguage("swift");
                }}
                style={{ fontWeight: selectLanguage === "swift" ? "bold" : "" }}
              >
                Swift
              </LanguageItem>
            </LanguageList>
          </Explorer>
          <DebugInfo>
            <DebugItem>
              Time Elapsed: {timeElapsed.toFixed(2)} seconds
            </DebugItem>
            <DebugItem>Words per Minute (WPM): {wordsPerMinute}</DebugItem>
            <DebugItem>Accuracy: {accuracy}%</DebugItem>
          </DebugInfo>
          <LeaderboardButton onClick={showLeaderboard}>
            Leaderboard
          </LeaderboardButton>
        </>
      ) : (
        <>
          <Ranking>
            <h2>Ranking</h2>
            {myScore === null ? (
              <PlayerRank>
                <p>You don't have a ranking yet.</p>
              </PlayerRank>
            ) : (
              <PlayerRank>
                <p>#{myScore.rank}</p>
                <p>{myScore.nickname}</p>
                <p>score: {myScore.score}</p>
              </PlayerRank>
            )}
          </Ranking>
          <BackButton onClick={handleBack}>Back</BackButton>
        </>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #ffb300;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  width: 200px;
`;

const Explorer = styled.div`
  width: 100%;
`;

const LanguageList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const LanguageItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #ff8c00;
  }
`;

const DebugInfo = styled.div`
  margin-top: auto;
  text-align: right;
`;

const DebugItem = styled.p`
  margin: 5px 0;
`;

const LeaderboardButton = styled.button`
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #6c757d;
  color: white;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5a6268;
  }
`;

const Ranking = styled.div`
  width: 100%;
  text-align: left;
`;

const PlayerRank = styled.div`
  background-color: #ff8c00;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  font-size: 18px;
  text-align: center;

  p {
    margin: 5px 0;
  }
`;

const BackButton = styled.button`
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #6c757d;
  color: white;
  cursor: pointer;
  margin-top: auto;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5a6268;
  }
`;
