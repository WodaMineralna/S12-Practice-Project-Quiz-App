import headerPic from "/quiz-logo.png";

export default function Header() {
  return (
    <header>
      <img src={headerPic} alt="Header picture showing a quiz logo" />
      <h1>ReactQuiz</h1>
    </header>
  );
}
