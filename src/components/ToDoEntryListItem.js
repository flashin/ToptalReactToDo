import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { deleteEntry } from '../actions';

class ToDoEntryListItem extends Component {

  onDeleteEntryPress() {
    this.props.deleteEntry(this.props.toDoEntry.index);
  }

  render() {
    const { text } = this.props.toDoEntry;

    return (
        <View style={styles.containerStyle}>
            <Text style={styles.titleStyle}>
              {text}
            </Text>
            <TouchableOpacity
                        onPress={this.onDeleteEntryPress.bind(this)}
                        style={styles.buttonStyle}
            >
              <Text style={{ fontSize: 36 }}>-</Text>
            </TouchableOpacity>
        </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 16,
    padding: 1
  },
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#cccccc',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 2,
    marginBottom: 2
  },
  buttonStyle: {
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 2,
    paddingBottom: 2
  }
};

export default connect(null, { deleteEntry })(ToDoEntryListItem);
