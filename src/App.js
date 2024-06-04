import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TypingSpeed from "./TypingSpeed";
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
  };

  const handleBack = () => {
    setLanguage(null);
    setSampleCode("");
    resetState();
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

  return (
    <AppContainer>
      <Sidebar>
        <LogoContainer>
          <Logo src={logo} alt="Taco Typing Code" />
        </LogoContainer>
        <Explorer>
          <h2>Explorer</h2>
          <LanguageList>
            <LanguageItem onClick={() => handleLanguageSelect("c")}>
              C/C++
            </LanguageItem>
            <LanguageItem onClick={() => handleLanguageSelect("python")}>
              Python
            </LanguageItem>
            <LanguageItem onClick={() => handleLanguageSelect("java")}>
              Java
            </LanguageItem>
          </LanguageList>
        </Explorer>
        <DebugInfo>
          <DebugItem>Time Elapsed: {timeElapsed.toFixed(2)} seconds</DebugItem>
          <DebugItem>Words per Minute (WPM): {wordsPerMinute}</DebugItem>
          <DebugItem>Accuracy: {accuracy}%</DebugItem>
        </DebugInfo>
      </Sidebar>
      <Content>
        {!language ? (
          <LanguageSelectContainer>
            <Logo src={logo} alt="Taco Typing Code" large />
            <SelectText>Select the Code File</SelectText>
          </LanguageSelectContainer>
        ) : (
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

const Sidebar = styled.div`
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
  width: ${(props) => (props.large ? "300px" : "200px")};
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
  text-align: center;
`;

const DebugItem = styled.p`
  margin: 5px 0;
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
