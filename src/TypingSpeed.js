// /src/TypingSpeed.js

import React, { useState, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/python/python";
import "codemirror/mode/clike/clike";
import styled from "styled-components";

const TypingSpeed = ({ sampleCode, handleReset, showBackButton }) => {
  const [text, setText] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

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

  const handleChange = (editor, data, value) => {
    setText(value);

    if (!startTime) {
      setStartTime(Date.now());
    }

    const words = value.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);
  };

  const wordsPerMinute = (wordCount / (timeElapsed / 60)).toFixed(2);

  const renderCode = () => {
    return sampleCode.split("").map((char, index) => {
      let color;
      if (index < text.length) {
        color = text[index] === char ? "green" : "red";
      } else {
        color = "gray";
      }
      return (
        <span key={index} style={{ color: color }}>
          {char}
        </span>
      );
    });
  };

  return (
    <Container>
      <h1>Typing Speed Test</h1>
      {showBackButton && <BackButton onClick={handleReset}>Back</BackButton>}
      <CodeContainer>
        <pre>{renderCode()}</pre>
      </CodeContainer>
      <CodeDiv>
        <CodeMirror
          value={text}
          options={{
            mode:
              sampleCode.includes("class") || sampleCode.includes("System.out")
                ? "text/x-java"
                : sampleCode.includes("printf")
                ? "text/x-csrc"
                : "python",
            theme: "material",
            lineNumbers: true,
            indentWithTabs: true,
            indentUnit: 4,
            tabSize: 4,
            smartIndent: true,
            extraKeys: {
              Tab: (cm) => {
                cm.replaceSelection("\t");
              },
            },
          }}
          onBeforeChange={(editor, data, value) => {
            handleChange(editor, data, value);
          }}
        />
      </CodeDiv>
      {isComplete && (
        <Popup>
          <PopupContent>
            <h2>Result</h2>
            <p>Words: {wordCount}</p>
            <p>Time Elapsed: {timeElapsed.toFixed(2)} seconds</p>
            <p>Words per Minute (WPM): {wordsPerMinute}</p>
            <button onClick={handleReset}>Reset</button>
          </PopupContent>
        </Popup>
      )}
      <div style={{ marginTop: "20px" }}>
        <p>Words: {wordCount}</p>
        <p>Time Elapsed: {timeElapsed.toFixed(2)} seconds</p>
        <p>Words per Minute (WPM): {wordsPerMinute}</p>
      </div>
    </Container>
  );
};

export default TypingSpeed;

const Container = styled.div`
  padding: 20px;
`;

const CodeContainer = styled.div`
  background-color: #f0f0f0;
  text-align: left;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  font-family: "Courier New", Courier, monospace;
  font-size: 16px;
  white-space: pre-wrap;
`;

const CodeDiv = styled.div`
  text-align: left;

  .CodeMirror {
    height: auto;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    margin-bottom: 20px;
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
  margin-bottom: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5a6268;
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const PopupContent = styled.div`
  text-align: center;
`;
