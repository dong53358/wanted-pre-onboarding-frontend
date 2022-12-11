import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signUpAPI } from "../../../api/api";
import Auth from "../hoc/Auth";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: black;
  color: white;
  font-size: 40px;
  font-weight: 600;
  padding: 50px;
  margin-bottom: 50px;
`;

const SignUp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  margin: 10px;
  padding: 10px;
  h1 {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 10px;
  }
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  input {
    width: 100%;
    border-radius: 10px;
    padding: 15px;
    margin: 5px 0px;
    border: 0.1px solid #263238;
    font-size: 20px;
    &:focus {
      outline: 2px solid #1a73e8;
    }
    &:focus::placeholder {
      color: transparent;
    }
  }
`;

const SignupBtn = styled.button`
  font-size: 20px;
  font-weight: 600;
  padding: 15px;
  border-radius: 10px;
  margin-top: 10px;
  border: none;
  width: 100%;
  color: ${(props) => (props.disabled ? "#585858" : "white")};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  background-color: ${(props) => (props.disabled ? "#A9A9F5" : "#2E2EFE")};
`;

const SignIn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  margin: 10px;
  padding: 10px;

  h1 {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 10px;
  }
`;

const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
  input {
    width: 100%;
    border-radius: 10px;
    padding: 15px;
    margin: 5px 0px;
    border: 0.1px solid #263238;
    font-size: 20px;
    &:focus {
      outline: 2px solid #1a73e8;
    }
    &:focus::placeholder {
      color: transparent;
    }
  }
`;

const SignInBtn = styled.button`
  font-size: 20px;
  font-weight: 600;
  padding: 15px;
  border-radius: 10px;
  margin-top: 10px;
  border: none;
  width: 100%;
  color: ${(props) => (props.disabled ? "#585858" : "white")};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  background-color: ${(props) => (props.disabled ? "#A9A9F5" : "#2E2EFE")};
`;

const CheckErr = styled.span`
  color: red;
  padding: 5px 10px;
`;
function Sign() {
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpEmailCheck, setSignUpEmailCheck] = useState(false);
  const [signUpPasswordCheck, setSignUpPasswordCheck] = useState(false);
  const [signInEmailCheck, setSignInEmailCheck] = useState(false);
  const [signInPasswordCheck, setSignInPasswordCheck] = useState(false);
  const baseUrl = "https://pre-onboarding-selection-task.shop/";
  const navigate = useNavigate();
  const passwordCheck = /.{8,}$/;

  const signUpSubmitHandler = (event) => {
    event.preventDefault();
    fetch(`${baseUrl}auth/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: signUpEmail,
        password: signUpPassword,
      }),
    }).then((response) => response.json());
    setSignUpEmail("");
    setSignUpPassword("");
  };

  const signInSubmitHandler = (event) => {
    event.preventDefault();
    fetch(`${baseUrl}auth/signin`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.access_token) {
          navigate("/todo");
        }
        localStorage.setItem("token", res.access_token);
      });
    setSignInEmail("");
    setSignInPassword("");
  };

  const signUpChange = (event) => {
    if (event.target.type === "email") {
      setSignUpEmail(event.target.value);
      if (event.target.value.includes("@")) {
        setSignUpEmailCheck(true);
      } else {
        setSignUpEmailCheck(false);
      }
    } else {
      setSignUpPassword(event.target.value);
      if (passwordCheck.test(event.target.value)) {
        setSignUpPasswordCheck(true);
      } else {
        setSignUpPasswordCheck(false);
      }
    }
  };

  const signInChange = (event) => {
    if (event.target.type === "email") {
      setSignInEmail(event.target.value);
      if (event.target.value.includes("@")) {
        setSignInEmailCheck(true);
      } else {
        setSignInEmailCheck(false);
      }
    } else {
      setSignInPassword(event.target.value);
      if (passwordCheck.test(event.target.value)) {
        setSignInPasswordCheck(true);
      } else {
        setSignInPasswordCheck(false);
      }
    }
  };

  return (
    <Main>
      <Header>To Do List</Header>
      <SignUp>
        <h1>회원가입</h1>
        <SignUpForm onSubmit={signUpSubmitHandler}>
          <input
            placeholder="이메일"
            onInput={signUpChange}
            type="email"
            value={signUpEmail}
          />
          {signUpEmailCheck ? null : (
            <CheckErr>이메일 형식이 올바르지 않습니다</CheckErr>
          )}
          <input
            placeholder="비밀번호"
            onInput={signUpChange}
            type="password"
            value={signUpPassword}
          />
          {signUpPasswordCheck ? null : (
            <CheckErr>비밀번호는 8자 이상이여야 합니다 </CheckErr>
          )}
          <SignupBtn
            disabled={!(signUpEmailCheck && signUpPasswordCheck)}
            type="submit"
          >
            회원가입
          </SignupBtn>
        </SignUpForm>
      </SignUp>
      <SignIn>
        <h1>로그인</h1>
        <SignInForm onSubmit={signInSubmitHandler}>
          <input
            placeholder="이메일"
            onInput={signInChange}
            type="email"
            value={signInEmail}
          />
          {signInEmailCheck ? null : (
            <CheckErr>이메일 형식이 올바르지 않습니다</CheckErr>
          )}
          <input
            placeholder="비밀번호"
            onInput={signInChange}
            type="password"
            value={signInPassword}
          />
          {signInPasswordCheck ? null : (
            <CheckErr>비밀번호는 8자 이상이여야 합니다 </CheckErr>
          )}
          <SignInBtn disabled={!(signInEmailCheck && signInPasswordCheck)}>
            로그인
          </SignInBtn>
        </SignInForm>
      </SignIn>
    </Main>
  );
}

export default Auth(Sign);
