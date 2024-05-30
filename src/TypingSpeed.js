import React, { useState, useEffect, useRef } from "react";
import "./TypingSpeed.css";

const sampleCode = `
for i in range(5):
    for j in range(i + 1):
        print("*", end="")
    print("")
`.trim();

const TypingSpeed = () => {
  const [text, setText] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (startTime) {
        setTimeElapsed((Date.now() - startTime) / 1000);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [startTime]);

  const handleChange = (e) => {
    const { value } = e.target;
    setText(value);

    if (!startTime) {
      setStartTime(Date.now());
    }

    const words = value.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      setText((prevText) => {
        const newText =
          prevText.substring(0, start) + "\t" + prevText.substring(end);
        setTimeout(() => {
          e.target.selectionStart = e.target.selectionEnd = start + 1;
        }, 0);
        return newText;
      });
    }
  };

  const handleReset = () => {
    setText("");
    setStartTime(null);
    setWordCount(0);
    setTimeElapsed(0);
    inputRef.current.focus();
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
      <div className="code-container">
        <pre>{renderCode()}</pre>
      </div>
      <textarea
        ref={inputRef}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows="10"
        cols="50"
        placeholder="Start typing..."
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          fontFamily: "monospace",
        }}
      ></textarea>
      <div style={{ marginTop: "20px" }}>
        <p>Words: {wordCount}</p>
        <p>Time Elapsed: {timeElapsed.toFixed(2)} seconds</p>
        <p>Words per Minute (WPM): {wordsPerMinute}</p>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default TypingSpeed;
