import React, { useState } from "react";
import styled from "styled-components";
import {
  FaCheck,
  FaEdit,
  FaRegCheckCircle,
  FaRegCircle,
  FaTrashAlt,
  FaWindowClose,
} from "react-icons/fa";
import { useRecoilState } from "recoil";
import { todoList } from "../../../Recoil/atoms";

const Main = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
const TodoItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-left: 4px solid rgb(30, 55, 153);
  padding: 20px 30px;
  box-shadow: 3px 3px 5px rgba(50, 50, 50, 0.5);
  border-radius: 5px;
  margin-bottom: 15px;
`;
const TodoText = styled.div`
  width: 1100px;
  font-size: 20px;
  font-weight: 600;
  margin: 0px 20px;
  word-break: break-all;
`;

const Check = styled.div`
  display: flex;
  font-size: 30px;
  cursor: pointer;
`;

const DeleteBtn = styled.div`
  cursor: pointer;
  font-size: 20px;
`;

const EditBtn = styled.div`
  cursor: pointer;
  font-size: 20px;
  margin-right: 10px;
`;

const EditForm = styled.form`
  display: flex;
  width: 1100px;
  font-size: 20px;
  font-weight: 600;
  margin: 0px 20px;
  word-break: break-all;
  input {
    width: 100%;
    padding: 10px;
    border: 0.1px solid #263238;
    border-radius: 10px;
    margin-right: 5px;
    &:focus {
      outline: 2px solid #1a73e8;
    }
    &:focus::placeholder {
      color: transparent;
    }
  }
`;
const EditSubmitBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 20px;
  &:hover {
    background-color: green;
  }
  margin-right: 5px;
`;

const EditCloseBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 20px;
  &:hover {
    background-color: red;
  }
`;

function TodoList({ todo }) {
  const baseUrl = "https://pre-onboarding-selection-task.shop/";
  const [isEditClickd, setIsEditClicked] = useState(false);
  const [editText, setEditText] = useState(todo.todo);
  const [recoilTodo, setRecoilTodo] = useRecoilState(todoList);

  const onChange = (event) => {
    setEditText(event.target.value);
  };

  const onDeleteBtnClick = async (id) => {
    await fetch(`${baseUrl}todos/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });

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
  };

  const onClick = async (id, isCompleted) => {
    await fetch(`${baseUrl}todos/${id}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        todo: todo.todo,
        isCompleted: isCompleted ? false : true,
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
  };

  const onEditBtnClick = () => {
    setIsEditClicked((prev) => !prev);
    setEditText(todo.todo);
  };

  const onEditSubmit = async (id, isCompleted, text) => {
    await fetch(`${baseUrl}todos/${id}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        todo: text,
        isCompleted: isCompleted,
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

    setIsEditClicked((prev) => !prev);
  };

  return (
    <Main>
      <TodoItem key={todo.id}>
        <Check onClick={() => onClick(todo.id, todo.isCompleted)}>
          {todo.isCompleted ? <FaRegCheckCircle /> : <FaRegCircle />}
        </Check>
        {isEditClickd ? (
          <>
            <EditForm
              onSubmit={(event) => {
                event.preventDefault();
                onEditSubmit(todo.id, todo.isCompleted, editText);
              }}
            >
              <input onChange={onChange} value={editText} type="text" />
              <EditSubmitBtn type="submit">
                <FaCheck />
              </EditSubmitBtn>
              <EditCloseBtn onClick={onEditBtnClick}>
                <FaWindowClose />
              </EditCloseBtn>
            </EditForm>
          </>
        ) : (
          <>
            <TodoText>{todo.todo}</TodoText>
          </>
        )}
        <EditBtn onClick={onEditBtnClick}>
          <FaEdit />
        </EditBtn>
        <DeleteBtn onClick={() => onDeleteBtnClick(todo.id)}>
          <FaTrashAlt />
        </DeleteBtn>
      </TodoItem>
    </Main>
  );
}

export default TodoList;
