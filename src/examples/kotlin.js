const kotlinExamples = [
  `fun printTriangle() {
\tfor (i in 0 until 5) {
\t\tvar line = ""
\t\tfor (j in 0 until i + 1) {
\t\t\tline += "*"
\t\t}
\t\tprintln(line)
\t}
}

fun main() {
\tprintTriangle()
}`,
  // 다른 자바 예제들 추가
];

export default kotlinExamples;
