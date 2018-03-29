import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { Button, Progress } from './custom';
import { toDoCreate, toDoClear } from '../actions';
import ToDoForm from './ToDoForm';

class ToDoCreate extends Component {

  componentWillMount() {
    this.props.toDoClear();
  }

  onCreatePress() {
    const { name, entries, images, contacts } = this.props;

    this.props.toDoCreate({ name, entries, images, contacts });
  }

  renderButton() {
    if (this.props.loading) {
      return <Progress size="large" />;
    }

    return (
      <Button onPress={this.onCreatePress.bind(this)}>
        Create
      </Button>
    );
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <ToDoForm {...this.props} />
        { this.renderButton() }
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ toDoForm }) => toDoForm;

export default connect(mapStateToProps, { toDoCreate, toDoClear })(ToDoCreate);
