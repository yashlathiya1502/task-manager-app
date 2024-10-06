
  import { TODOS_CREATE_URL, TODOS_DELETE_URL, TODOS_FETCH_DATA_URL, TODOS_STATUS_CHANGE_URL, TODOS_UPDATE_URL } from "../../constants/apiUrl";
import axiosInstance from "../../utils/axiosInstance";
  import handleApiResponse from "../../utils/handleApiResponse";

  interface TodoPayloadType {
    title : string;
    description : string;
    status : string;
  }
  
  const createTodo = async (body : TodoPayloadType) => {
    return await handleApiResponse(
      axiosInstance.post(TODOS_CREATE_URL, body),
      true
    );
  };
  
  const fetchAllTodos = async () => {
    return await handleApiResponse(axiosInstance.get(TODOS_FETCH_DATA_URL));
  };

  
  const updateTodo = async (id : string, body: TodoPayloadType) => {
    return await handleApiResponse(
      axiosInstance.put(`${TODOS_UPDATE_URL}/${id}`, body),
      true
    );
  };
  
  const deleteTodo = async (id : string) => {
    return await handleApiResponse(
      axiosInstance.delete(`${TODOS_DELETE_URL}/${id}`),
      true
    );
  };

  const updateTodoStatus = async (id : string, status : string) => {
    return await handleApiResponse(
      axiosInstance.patch(`${TODOS_STATUS_CHANGE_URL}/${id}`, {status}),
      true
    );
  };
  
  export {
    createTodo,
    fetchAllTodos,
    updateTodo,
    deleteTodo,
    updateTodoStatus
  };
  