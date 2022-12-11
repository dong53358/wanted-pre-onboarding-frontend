import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useRecoilState } from "recoil";
import TodoList from "./TodoList";
import Auth from "../hoc/Auth";
import { todoList } from "../../../Recoil/atoms";

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
  const [recoilTodo, setRecoilTodo] = useRecoilState(todoList);
  const [text, setText] = useState("");
  const inputRef = useRef();
  const baseUrl = "https://pre-onboarding-selection-task.shop/";
  const navigate = useNavigate();
  useState(() => {
    fetch(`${baseUrl}todos`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setRecoilTodo([...res]);
      });
  }, [recoilTodo]);

  const onSubmit = async (event) => {
    event.preventDefault();

    await fetch(`${baseUrl}todos`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        todo: text,
      }),
    }).then((response) => response.json());

    fetch(`${baseUrl}todos`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setRecoilTodo([...res]);
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
            ref={inputRef}
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
        {recoilTodo.map((todo) => (
          <TodoList key={todo.id} todo={todo} />
        ))}
      </Todo>
    </Main>
  );
}

export default Auth(ToDo);
