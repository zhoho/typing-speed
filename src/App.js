import React, { useState } from "react";
import TypingSpeed from "./TypingSpeed";
import pythonExamples from "./examples/python";
import javaExamples from "./examples/java";
import cExamples from "./examples/c";
import "./App.css";

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
    <div className="App">
      {!language ? (
        <div className="language-select">
          <h1>Select a Language to Practice</h1>
          <div className="button-container">
            <button
              className="language-button"
              onClick={() => handleLanguageSelect("python")}
            >
              Python
            </button>
            <button
              className="language-button"
              onClick={() => handleLanguageSelect("java")}
            >
              Java
            </button>
            <button
              className="language-button"
              onClick={() => handleLanguageSelect("c")}
            >
              C
            </button>
          </div>
        </div>
      ) : (
        <TypingSpeed
          sampleCode={sampleCode}
          handleReset={handleBack}
          showBackButton={true}
        />
      )}
    </div>
  );
};

export default App;
