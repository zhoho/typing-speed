const goExamples = [
  `package main

import "fmt"

func printTriangle() {
\tfor i := 0; i < 5; i++ {
\t\tline := ""
\t\tfor j := 0; j < i+1; j++ {
\t\t\tline += "*"
\t\t}
\t\tfmt.Println(line)
\t}
}

func main() {
\tprintTriangle()
}`,
  // 다른 자바 예제들 추가
];

export default goExamples;
