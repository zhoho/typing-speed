const cExamples = [
  `#include <stdio.h>

int main() {
\tfor (int i = 0; i < 5; i++) {
\t\tfor (int j = 0; j < i + 1; j++) {
\t\t\tprintf("*");
\t\t}
\t\tprintf("\\n");
\t}
\treturn 0;
}`,
  // 다른 C 예제들 추가
];

export default cExamples;
