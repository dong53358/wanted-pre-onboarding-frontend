import React, { useState } from "react";
import Auth from "../Auth";
import TodoList from "./TodoList";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

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
  margin-bottom: 20px;
`;
const LogoutBtn = styled.button`
  padding: 8px 17px;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  background-color: rgb(30, 55, 153);
`;

const Add = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  margin: 10px;
  padding: 10px;
`;

const TodoForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    width: 100%;
    border-radius: 10px;
    padding: 15px;
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

const TodoAddBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  padding: 15px;
  border-radius: 10px;
  border: none;
  margin-left: 30px;
  color: white;
  cursor: pointer;
  background-color: rgb(30, 55, 153);
`;

const Todo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  width: 100%;
  margin-top: 20px;
  padding: 20px;
  width: 500px;
`;

function ToDo() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const baseUrl = "https://pre-onboarding-selection-task.shop/";
  const access_token = localStorage.getItem("token");
  const navigate = useNavigate();
  useState(() => {
    fetch(`${baseUrl}todos`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setTodos([...res]);
        console.log(res);
      });
  }, [todos]);
  const onSubmit = async (event) => {
    event.preventDefault();

    await fetch(`${baseUrl}todos`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        todo: text,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
      });
    await fetch(`${baseUrl}todos`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setTodos([...res]);
        console.log(res);
      });
    setText("");
  };
  const onChange = (event) => {
    setText(event.target.value);
  };
  const onLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <Main>
      <Header>To Do List</Header>
      <LogoutBtn onClick={onLogout}>로그아웃</LogoutBtn>
      <Add>
        <TodoForm onSubmit={onSubmit}>
          <input
            placeholder="To Do"
            onChange={onChange}
            type="text"
            value={text}
          />
          <TodoAddBtn type="submit">
            <FaPlus />
          </TodoAddBtn>
        </TodoForm>
      </Add>

      <Todo>
        {todos.map((todo) => (
          <TodoList key={todo.id} todo={todo} />
        ))}
      </Todo>
    </Main>
  );
}

export default Auth(ToDo);
