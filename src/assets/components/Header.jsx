import React from "react";

import pic from "/quiz-logo.png";

export default function Header() {
  return (
    <header>
      <img src={pic} alt="pic" />
      <h1>ReactQuiz</h1>
    </header>
  );
}
