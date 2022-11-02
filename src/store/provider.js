import React from "react";
import { actions, initialState, reducers } from ".";
import { API } from "../services/api";

export const DataContext = React.createContext();

export const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducers, initialState);

  const data = {
    apis: state.apis,
    isLoading: state.isLoading,
    isError: state.isError,
    getAllApis: (page = 1, sortby, orderBy, limit = 10) => {
      let sortBy = (sortby && `&sortby=${sortby}`) || "";
      let orderByParam = (orderBy && `&orderBy=${orderBy}`) || "";
      return new Promise((res, rej) => {
        dispatch({ type: actions.API_START });
        API.get(`apis?page=${page}&limit=${limit}${sortBy}${orderByParam}`)
          .then((data) => {
            dispatch({ type: actions.GET_ALL_APIS, payload: data });
            res(data);
          })
          .catch((error) => {
            dispatch({ type: actions.API_ERROR, payload: { error } });
            rej(error);
          });
      });
    },
    updateApiDetails: async (id, data) => {
      return new Promise((res, rej) => {
        dispatch({ type: actions.API_START });
        API.put(`apis/${id}`, data)
          .then((data) => {
            dispatch({ type: actions.UPDATE_API_DATA, payload: data, id });
            res(data);
          })
          .catch((error) => {
            dispatch({ type: actions.API_ERROR, payload: { error } });
            rej(error);
          });
      });
    },
    deleteApiDetails: async (id) => {
      return new Promise((res, rej) => {
        dispatch({ type: actions.API_START });
        API.delete(`apis/${id}`)
          .then((data) => {
            dispatch({ type: actions.DELETE_API_DATA, payload: data, id });
            res(data);
          })
          .catch((error) => {
            dispatch({ type: actions.API_ERROR, payload: { error } });
            rej(error);
          });
      });
    },
    createApi: async (data) => {
      return new Promise((res, rej) => {
        dispatch({ type: actions.API_START });
        API.post(`apis`, data)
          .then((data) => {
            dispatch({ type: actions.CREATE_NEW_API, payload: data });
            res(data);
          })
          .catch((error) => {
            dispatch({ type: actions.API_ERROR, payload: { error } });
            rej(error);
          });
      });
    },
  };

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
