import React, { useState } from "react";

function Sign() {
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const signUpSubmitHandler = (event) => {
    event.preventDefault();
    fetch("https://pre-onboarding-selection-task.shop/auth/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: signUpEmail,
        password: signUpPassword,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
      });
  };
  const signInSubmitHandler = (event) => {
    event.preventDefault();
  };
  const signUpChange = (event) => {
    if (event.target.type === "email") {
      setSignUpEmail(event.target.value);
    } else {
      setSignUpPassword(event.target.value);
    }
  };
  const signInChange = (event) => {
    if (event.target.type === "email") {
      setSignInEmail(event.target.value);
    } else {
      setSignInPassword(event.target.value);
    }
  };

  return (
    <>
      <div>
        <h1>SignUp</h1>
        <form onSubmit={signUpSubmitHandler}>
          <input onChange={signUpChange} type="email" value={signUpEmail} />
          <input
            onChange={signUpChange}
            type="password"
            value={signUpPassword}
          />
          <button type="submit">회원가입</button>
        </form>
      </div>
      <div>
        <h1>SignIn</h1>
        <form>
          <input onChange={signInChange} type="email" value={signInEmail} />
          <input
            onChange={signInChange}
            type="password"
            value={signInPassword}
          />
          <button onSubmit={signInSubmitHandler}>로그인</button>
        </form>
      </div>
    </>
  );
}

export default Sign;
