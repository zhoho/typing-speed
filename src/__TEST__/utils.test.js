// src/__TEST__/utils.test.js

import { calculateWordsPerMinute, calculateAccuracy } from '../utils';

describe('calculateWordsPerMinute', () => {
    test('should return correct WPM given word count and time elapsed', () => {
        expect(calculateWordsPerMinute(10, 60)).toBe('10.00'); // 10 words in 1 minute
        expect(calculateWordsPerMinute(20, 60)).toBe('20.00'); // 20 words in 1 minute
        expect(calculateWordsPerMinute(30, 30)).toBe('60.00'); // 30 words in 30 seconds
    });

    test('should handle zero time elapsed', () => {
        expect(calculateWordsPerMinute(10, 0)).toBe('Infinity'); // should handle division by zero
    });

    test('should return 0 WPM when word count is 0', () => {
        expect(calculateWordsPerMinute(0, 60)).toBe('0.00'); // 0 words in 1 minute
    });

    test('should return negative WPM for negative word count', () => {
        expect(calculateWordsPerMinute(-10, 60)).toBe('NaN'); // -10 words in 1 minute
    });

    test('should return negative WPM for negative time elapsed', () => {
        expect(calculateWordsPerMinute(10, -60)).toBe('NaN'); // 10 words in -1 minute
    });

    test('should return NaN when both word count and time elapsed are zero', () => {
        expect(calculateWordsPerMinute(0, 0)).toBe('NaN'); // 0 words in 0 time
    });

    test('should return negative WPM for negative word count and time elapsed', () => {
        expect(calculateWordsPerMinute(-10, -60)).toBe('NaN'); // -10 words in -1 minute
    });
});

describe('calculateAccuracy', () => {
    test('should return correct accuracy given correct chars and total chars', () => {
        expect(calculateAccuracy(50, 100)).toBe('50.00'); // 50% accuracy
        expect(calculateAccuracy(75, 100)).toBe('75.00'); // 75% accuracy
        expect(calculateAccuracy(100, 100)).toBe('100.00'); // 100% accuracy
    });

    test('should return 0 accuracy when total chars is 0', () => {
        expect(calculateAccuracy(0, 0)).toBe('0');
    });

    test('should return 0 accuracy when correct chars is 0', () => {
        expect(calculateAccuracy(0, 100)).toBe('0.00'); // 0% accuracy
    });

    test('should handle negative correct chars', () => {
        expect(calculateAccuracy(-50, 100)).toBe('NaN'); // -50% accuracy
    });

    test('should handle negative total chars', () => {
        expect(calculateAccuracy(50, -100)).toBe('NaN'); // -50% accuracy
    });

    test('should return NaN when both correct chars and total chars are negative', () => {
        expect(calculateAccuracy(-50, -100)).toBe('NaN'); // -50% accuracy
    });

    test('should return NaN when total chars is negative and correct chars is 0', () => {
        expect(calculateAccuracy(0, -100)).toBe('NaN'); // 0% accuracy with negative total chars
    });

    test('should return NaN when correct chars is negative and total chars is 0', () => {
        expect(calculateAccuracy(-50, 0)).toBe('NaN'); // Infinity% accuracy with zero total chars
    });
});
