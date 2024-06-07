import '@testing-library/jest-dom';
import 'jest-fetch-mock';

// fetch mock 설정
beforeAll(() => {
    global.fetch = require('jest-fetch-mock');
});
