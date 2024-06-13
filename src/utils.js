// src/utils/utils.js

export const calculateWordsPerMinute = (wordCount, timeElapsed) => {
    if (wordCount < 0 || timeElapsed < 0) {
        return "NaN";
    }
    return ((wordCount / (timeElapsed / 60)).toFixed(2));
};

export const calculateAccuracy = (correctChars, totalChars) => {
    if (correctChars < 0 || totalChars < 0) {
        return "NaN";
    }
    return totalChars > 0 ? ((correctChars / totalChars) * 100).toFixed(2) : '0';
};
