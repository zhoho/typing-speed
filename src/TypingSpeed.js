import React, { useState, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/python/python";
import "codemirror/mode/clike/clike";
import "./TypingSpeed.css";

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
    <div style={{ padding: "20px" }}>
      <h1>Typing Speed Test</h1>
      {showBackButton && (
        <button className="back-button" onClick={handleReset}>
          Back
        </button>
      )}
      <div className="code-container">
        <pre>{renderCode()}</pre>
      </div>
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
      {isComplete && (
        <div className="popup">
          <div className="popup-content">
            <h2>Result</h2>
            <p>Words: {wordCount}</p>
            <p>Time Elapsed: {timeElapsed.toFixed(2)} seconds</p>
            <p>Words per Minute (WPM): {wordsPerMinute}</p>
            <button onClick={handleReset}>Reset</button>
          </div>
        </div>
      )}
      <div style={{ marginTop: "20px" }}>
        <p>Words: {wordCount}</p>
        <p>Time Elapsed: {timeElapsed.toFixed(2)} seconds</p>
        <p>Words per Minute (WPM): {wordsPerMinute}</p>
        {/* <button onClick={handleReset}>Reset</button> */}
      </div>
    </div>
  );
};

export default TypingSpeed;
