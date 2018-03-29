import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

class ToDoListItem extends Component {
  onRowPress() {
    Actions.toDoEdit({ toDoItem: this.props.toDoItem });
  }

  render() {
    const { name } = this.props.toDoItem;

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
            <Text style={styles.titleStyle}>
              {name}
            </Text>
            <View style={{ height: 1, backgroundColor: '#333333' }} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 9,
    paddingBottom: 9
  }
};

export default ToDoListItem;
