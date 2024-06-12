const rustExamples = [
  `fn print_triangle() {
\tfor i in 0..5 {
\t\tlet mut line = String::new();
\t\tfor _ in 0..i + 1 {
\t\t\tline.push('*');
\t\t}
\t\tprintln!("{}", line);
\t}
}

fn main() {
\tprint_triangle();
}`,
  // 다른 자바 예제들 추가
];

export default rustExamples;
