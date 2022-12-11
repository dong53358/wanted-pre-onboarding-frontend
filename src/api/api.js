const baseUrl = "https://pre-onboarding-selection-task.shop/";

export function signUpAPI({ email, password }) {
  return fetch(`${baseUrl}auth/signup`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
}

export function loginAPI(body) {
  return fetch(`${baseUrl}auth/signin`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());
}

export function getTodosAPI() {
  return fetch(`${baseUrl}todos`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  }).then((response) => response.json());
}

export function createTodoAPI(body) {
  return fetch(`${baseUrl}todos`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());
}

export function updateTodoAPI(id, body) {
  return fetch(`${baseUrl}todos/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ body }),
  }).then((response) => response.json());
}

export function deleteTodoAPI(id) {
  return fetch(`${baseUrl}todos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  }).then((response) => response.json());
}
