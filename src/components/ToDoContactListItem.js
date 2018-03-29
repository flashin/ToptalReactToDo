import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { deleteContact } from '../actions';

class ToDoContactListItem extends Component {

  onDeleteContactPress() {
    this.props.deleteContact(this.props.toDoContact.index);
  }

  render() {
    const { name, email, phone } = this.props.toDoContact.details;

    return (
        <View style={styles.containerStyle}>
            <View>
                <Text style={styles.titleStyle}>
                    {name}
                </Text>
                <Text style={styles.textStyle}>
                    {phone}
                </Text>
                <Text style={styles.textStyle}>
                    {email}
                </Text>
            </View>
            <TouchableOpacity
                        onPress={this.onDeleteContactPress.bind(this)}
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
  textStyle: {
      fontSize: 15,
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

export default connect(null, { deleteContact })(ToDoContactListItem);
