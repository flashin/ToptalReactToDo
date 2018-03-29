import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import ToDoList from './components/ToDoList';
import ToDoCreate from './components/ToDoCreate';
import ToDoEdit from './components/ToDoEdit';

const RouterComponent = () => 
  (
    <Router>
      <Scene hideNavBar>
        <Scene key="auth">
            <Scene key="login" component={LoginForm} title="Login" initial />
            <Scene
                key="registration"
                component={RegistrationForm}
                title="Registration"
                backTitle=" "
            />
        </Scene>
        <Scene
          key="content"
          rightTitle="Log out"
          onRight={() => Actions.auth()}
        >
            <Scene key="toDoList" component={ToDoList} title="Tasks to do" initial />
            <Scene key="toDoCreate" component={ToDoCreate} title="Create new task" />
            <Scene key="toDoEdit" component={ToDoEdit} title="Edit existing task" />
        </Scene>
      </Scene>
    </Router>
  );

export default RouterComponent;
