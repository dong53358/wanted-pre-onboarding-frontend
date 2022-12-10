import React from "react";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";

const Main = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
const TodoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-left: 4px solid rgb(30, 55, 153);
  padding: 20px 30px;
  box-shadow: 3px 3px 5px rgba(50, 50, 50, 0.5);
  border-radius: 5px;
  margin-bottom: 15px;
  span {
    font-size: 20px;
    font-weight: 600;
  }
`;

const DeleteBtn = styled.div`
  cursor: pointer;
  font-size: 20px;
`;

function TodoList({ todo }) {
  const access_token = localStorage.getItem("token");
  const baseUrl = "https://pre-onboarding-selection-task.shop/";
  const onDeleteBtnClick = async (id) => {
    await fetch(`${baseUrl}todos/:${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${access_token}` },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <Main>
      <TodoItem key={todo.id}>
        <span>{todo.todo}</span>
        <DeleteBtn onClick={() => onDeleteBtnClick(todo.id)}>
          <FaTrashAlt />
        </DeleteBtn>
      </TodoItem>
    </Main>
  );
}

export default TodoList;
