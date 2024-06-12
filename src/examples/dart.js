const dartExamples = [
  `void printTriangle() {
\tfor (int i = 0; i < 5; i++) {
\t\tString line = '';
\t\tfor (int j = 0; j < i + 1; j++) {
\t\t\tline += '*';
\t\t}
\t\tprint(line);
\t}
}

void main() {
\tprintTriangle();
}`,
  // 다른 자바 예제들 추가
];

export default dartExamples;
