import {
    TODO_SUCCESS_ACTION,
    TODO_FAILURE_ACTION
} from './actions'

const initialState = {
    todo: [],
    message:''
};

export const todoReducers = (state = initialState, action) => {
    // Use switch to handle different actions
      switch (action.type) {
          case TODO_SUCCESS_ACTION:
            return {todo: action.payload, message: ''};
          case TODO_FAILURE_ACTION:
            return {todo: [], message: action.message};
          default:
              return state; 
      }
};