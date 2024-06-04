import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TypingSpeed from "./pages/TypingSpeed";
import Leaderboard from "./pages/Leaderboard";
import Sidebar from "./common/Sidebar";
import pythonExamples from "./examples/python";
import javaExamples from "./examples/java";
import cExamples from "./examples/c";
import logo from "./assets/logo.png";
import { collection, getDocs, query, dbService, orderBy } from "./config/fbase";

const App = () => {
  const [sampleCode, setSampleCode] = useState("");
  const [text, setText] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [correctChars, setCorrectChars] = useState(0);
  const [view, setView] = useState("home");
  const [scores, setScores] = useState([]);
  const [myScore, setMyScore] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          query(collection(dbService, "scores"), orderBy("score", "desc"))
        );
        const newScores = [];
        querySnapshot.docs.forEach((doc, i) => {
          newScores.push({
            rank: i + 1,
            nickname: doc.id,
            score: doc.data().score,
          });
          if (localStorage.getItem("nickname") === doc.id) {
            setMyScore({
              rank: i + 1,
              nickname: doc.id,
              score: doc.data().score,
            });
            setScore(doc.data().score);
          }
        });
        setScores(newScores);
      } catch (error) {
        alert("Fetching Data Failed: ", error);
      }
    };

    fetchData();
  }, [view]);

  useEffect(() => {
    let timer;
    if (startTime && !isComplete) {
      timer = setInterval(() => {
        setTimeElapsed((Date.now() - startTime) / 1000);
      }, 100);
    }
    return () => clearInterval(timer);
  }, [startTime, isComplete]);

  useEffect(() => {
    if (text === sampleCode) {
      setIsComplete(true);
    }
  }, [text, sampleCode]);

  const handleLanguageSelect = (lang) => {
    let examples;
    switch (lang) {
      case "python":
        examples = pythonExamples;
        break;
      case "java":
        examples = javaExamples;
        break;
      case "c":
        examples = cExamples;
        break;
      default:
        examples = [];
    }
    const randomExample = examples[Math.floor(Math.random() * examples.length)];
    setSampleCode(randomExample.trim());
    resetState();
    setView("typing");
  };

  const handleBack = () => {
    setSampleCode("");
    resetState();
    setView("home");
  };

  const resetState = () => {
    setText("");
    setStartTime(null);
    setWordCount(0);
    setTimeElapsed(0);
    setIsComplete(false);
    setCorrectChars(0);
  };

  const handleChange = (editor, data, value) => {
    setText(value);

    if (!startTime) {
      setStartTime(Date.now());
    }

    const words = value.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);

    let correct = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === sampleCode[i]) {
        correct++;
      }
    }
    setCorrectChars(correct);
  };

  const wordsPerMinute = (wordCount / (timeElapsed / 60)).toFixed(2);
  const accuracy =
    text.length > 0 ? ((correctChars / text.length) * 100).toFixed(2) : 0;

  const showLeaderboard = () => {
    setView("leaderboard");
  };

  return (
    <AppContainer>
      <Sidebar
        timeElapsed={timeElapsed}
        wordsPerMinute={wordsPerMinute}
        accuracy={accuracy}
        handleLanguageSelect={handleLanguageSelect}
        showLeaderboard={showLeaderboard}
        view={view}
        handleBack={handleBack}
        myScore={myScore}
      />
      <Content>
        {view === "home" && (
          <LanguageSelectContainer>
            <Logo src={logo} alt="Taco Typing Code" />
            <SelectText>Select the Code File</SelectText>
          </LanguageSelectContainer>
        )}
        {view === "typing" && (
          <TypingSpeed
            sampleCode={sampleCode}
            handleReset={handleBack}
            text={text}
            handleChange={handleChange}
            isComplete={isComplete}
            setIsComplete={setIsComplete}
            wordsPerMinute={wordsPerMinute}
            accuracy={accuracy}
            score={score}
          />
        )}
        {view === "leaderboard" && <Leaderboard scores={scores} />}
      </Content>
    </AppContainer>
  );
};

export default App;

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LanguageSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SelectText = styled.h1`
  margin-top: 20px;
`;

const Logo = styled.img`
  width: 250px;
`;
