import _ from 'lodash';
import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Button, InputField } from './custom';
import { toDoListFetch, filterToDoList } from '../actions';
import ToDoListItem from './ToDoListItem';

class ToDoList extends Component {

  componentWillMount() {
    this.props.toDoListFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  onCreatePress() {
    Actions.toDoCreate();
  }

  createDataSource({ toDoItems }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(toDoItems);
  }

  renderRow(toDoItem) {
    return <ToDoListItem toDoItem={toDoItem} />;
  }
  
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: '#ffffff' }}>
          <InputField
              placeholder="Search..."
              value={this.props.keyword}
              onChangeText={value => this.props.filterToDoList(value)}
          />
        </View>
        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
        <Button onPress={this.onCreatePress.bind(this)}>
            Create new item
        </Button>
      </View>
    );
  }
}

const mapStateToProps = ({ toDoList }) => {
  const { list, keyword } = toDoList;
  const toDoItems = list ? _.map(list, (val, uid) => ({ ...val, uid })) : [];

  if (keyword && keyword.length > 0 && toDoItems) {
    const filteredItems = _.filter(toDoItems, (item) => {
      if (item.name && item.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
        return true;
      }
    });

    return { toDoItems: filteredItems, keyword };
  }

  return { toDoItems, keyword };
};

export default connect(mapStateToProps, { toDoListFetch, filterToDoList })(ToDoList);
