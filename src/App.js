import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TypingSpeed from "./pages/TypingSpeed";
import Leaderboard from "./pages/Leaderboard";
import Sidebar from "./common/Sidebar";
import pythonExamples from "./examples/python";
import javaExamples from "./examples/java";
import cExamples from "./examples/c";
import logo from "./assets/logo.png";

const App = () => {
  const [language, setLanguage] = useState(null);
  const [sampleCode, setSampleCode] = useState("");
  const [text, setText] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [correctChars, setCorrectChars] = useState(0);
  const [view, setView] = useState("home");

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
    setLanguage(lang);
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
    setLanguage(null);
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
            wordsPerMinute={wordsPerMinute}
            accuracy={accuracy}
          />
        )}
        {view === "leaderboard" && (
          <Leaderboard
            handleBack={handleBack}
            timeElapsed={timeElapsed}
            wordsPerMinute={wordsPerMinute}
            accuracy={accuracy}
            handleLanguageSelect={handleLanguageSelect}
            showLeaderboard={showLeaderboard}
          />
        )}
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
