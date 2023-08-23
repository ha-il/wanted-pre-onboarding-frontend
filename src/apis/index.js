const BASE_URL = 'https://www.pre-onboarding-selection-task.shop/todos';

const HTTP_METHOD = {
  GET(token) {
    return {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
  },
  POST(token, todo) {
    return {
      method: `POST`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        todo,
      }),
    };
  },
  PUT(token, todo, todoIsCompleted) {
    return {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        todo,
        isCompleted: todoIsCompleted,
      }),
    };
  },
  DELETE(token) {
    return {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  },
};

const request = async (url, option) => {
  try {
    const response = await fetch(url, option);
    if (!response.ok) {
      throw new Error('Todo API 요청 과정에서 에러가 발생했습니다.');
    }
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

const requestWithoutJson = async (url, option) => {
  try {
    const response = await fetch(url, option);
    if (!response.ok) {
      throw new Error('Todo API 요청 과정에서 에러가 발생했습니다.');
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};

const TodoApi = {
  async getTodos({ token }) {
    return request(BASE_URL, HTTP_METHOD.GET(token));
  },
  async addTodo({ token, todo }) {
    return requestWithoutJson(BASE_URL, HTTP_METHOD.POST(token, todo));
  },
  async updateTodo({ token, todoId, todo, todoIsCompleted }) {
    return requestWithoutJson(
      `${BASE_URL}/${todoId}`,
      HTTP_METHOD.PUT(token, todo, todoIsCompleted)
    );
  },
  async deleteTodo({ token, todoId }) {
    return requestWithoutJson(`${BASE_URL}/${todoId}`, HTTP_METHOD.DELETE(token));
  },
};

export default TodoApi;
