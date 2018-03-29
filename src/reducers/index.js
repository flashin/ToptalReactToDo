import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import RegistrationReducer from './RegistrationReducer';
import ToDoListReducer from './ToDoListReducer';
import ToDoFormReducer from './ToDoFormReducer';

export default combineReducers({
  auth: AuthReducer,
  registration: RegistrationReducer,
  toDoList: ToDoListReducer,
  toDoForm: ToDoFormReducer
});
