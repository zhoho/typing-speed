// /src/App.js

import React, { useState } from "react";
import styled from "styled-components";
import TypingSpeed from "./TypingSpeed";
import pythonExamples from "./examples/python";
import javaExamples from "./examples/java";
import cExamples from "./examples/c";

const App = () => {
  const [language, setLanguage] = useState(null);
  const [sampleCode, setSampleCode] = useState("");

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
  };

  const handleBack = () => {
    setLanguage(null);
    setSampleCode("");
  };

  return (
    <AppContainer>
      {!language ? (
        <LanguageSelectContainer>
          <h1>Select a Language to Practice</h1>
          <ButtonContainer>
            <LanguageButton onClick={() => handleLanguageSelect("python")}>
              Python
            </LanguageButton>
            <LanguageButton onClick={() => handleLanguageSelect("java")}>
              Java
            </LanguageButton>
            <LanguageButton onClick={() => handleLanguageSelect("c")}>
              C
            </LanguageButton>
          </ButtonContainer>
        </LanguageSelectContainer>
      ) : (
        <>
          <TypingSpeed
            sampleCode={sampleCode}
            handleReset={handleBack}
            showBackButton={true}
          />
        </>
      )}
    </AppContainer>
  );
};

export default App;

const AppContainer = styled.div`
  text-align: center;
  font-family: Arial, sans-serif;
  padding: 20px;
`;

const LanguageSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LanguageButton = styled.button`
  font-size: 18px;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
