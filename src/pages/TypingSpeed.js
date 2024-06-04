import React, { useEffect, useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/python/python";
import "codemirror/mode/clike/clike";
import styled from "styled-components";
import { dbService, doc, setDoc } from "../config/fbase";

const TypingSpeed = ({
  sampleCode,
  handleReset,
  text,
  handleChange,
  isComplete,
  setIsComplete,
  wordsPerMinute,
  accuracy,
  score,
}) => {
  const [nickname, setNickname] = useState("");
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);

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

  const handleRegister = async () => {
    setIsComplete(false);
    if (localStorage.getItem("nickname") === null) {
      setShowRegisterPopup(true);
    } else {
      if (score < wordsPerMinute * accuracy) {
        await setDoc(
          doc(dbService, "scores", localStorage.getItem("nickname")),
          {
            score: wordsPerMinute * accuracy,
          }
        );
      }
    }
  };

  const handleRegisterSubmit = async () => {
    setShowRegisterPopup(false);
    // handle nickname registration logic
    localStorage.setItem("nickname", nickname);
    await setDoc(doc(dbService, "scores", nickname), {
      score: wordsPerMinute * accuracy,
    });
    handleReset();
  };

  return (
    <Container>
      <Header>
        <h1>Typing Speed Test</h1>
      </Header>
      <CodeContainer>
        <pre>{renderCode()}</pre>
      </CodeContainer>
      <EditorContainer>
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
      </EditorContainer>
      {isComplete && (
        <Popup>
          <PopupContent>
            <h2>Result</h2>
            <MetricResult>
              <p>WPM: {wordsPerMinute}</p>
              <p>Accuracy: {accuracy}%</p>
              <Score>Score: {wordsPerMinute * accuracy}</Score>
            </MetricResult>
            <ButtonContainer>
              <Button onClick={handleReset}>Cancel</Button>
              <Button primary onClick={handleRegister}>
                Register
              </Button>
            </ButtonContainer>
          </PopupContent>
        </Popup>
      )}
      {showRegisterPopup && (
        <Popup>
          <PopupContent>
            <h2>Result</h2>
            <p>Type a Nickname</p>
            <NicknameInput
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <ButtonContainer>
              <Button primary onClick={handleRegisterSubmit}>
                OK
              </Button>
            </ButtonContainer>
          </PopupContent>
        </Popup>
      )}
    </Container>
  );
};

export default TypingSpeed;

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 20px;

  h1 {
    font-size: 24px;
    color: #333;
  }
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
  width: 100%;
  max-width: 800px;
  -webkit-user-select: none; /* For Safari */
  -moz-user-select: none; /* For Firefox */
  -ms-user-select: none; /* For Internet Explorer/Edge */
  user-select: none; /* Prevents text selection */
`;

const EditorContainer = styled.div`
  width: 100%;
  max-width: 800px;
  text-align: left;

  .CodeMirror {
    height: auto;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffb300;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const PopupContent = styled.div`
  text-align: center;

  h2 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  }

  p {
    margin: 10px 0;
    font-size: 18px;
  }
`;

const MetricResult = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  p {
    font-size: 20px;
    margin: 5px 0;
  }
`;

const Score = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  gap: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.primary ? "#28a745" : "#6c757d")};
  color: white;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.primary ? "#218838" : "#5a6268")};
  }
`;

const NicknameInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  width: 80%;
  max-width: 300px;
  text-align: center;
`;
