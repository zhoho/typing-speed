// src/utils/utils.js

export const calculateWordsPerMinute = (wordCount, timeElapsed) => {
    return ((wordCount / (timeElapsed / 60)).toFixed(2));
};

export const calculateAccuracy = (correctChars, totalChars) => {
    return totalChars > 0 ? ((correctChars / totalChars) * 100).toFixed(2) : '0';
};
