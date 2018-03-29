import _ from 'lodash';
import React, { Component } from 'react';
import { View, ListView, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { InputField, ErrorText, Label, Button, Progress } from './custom';
import { toDoFormUpdate, addNewEntry, chooseImage, getContact } from '../actions';
import ToDoEntryListItem from './ToDoEntryListItem';
import ToDoImageListItem from './ToDoImageListItem';
import ToDoContactListItem from './ToDoContactListItem';

class ToDoForm extends Component {

    componentWillMount() {
        this.createDataSources(this.props);
    }
    
      componentWillReceiveProps(nextProps) {
        this.createDataSources(nextProps);
    }

    onAddNewEntryPress() {
        this.props.addNewEntry(this.props.newEntry);
    }

    onAttachAnImagePress() {
        this.props.chooseImage();
    }

    onAddContactPress() {
        this.props.getContact();
    }

    createDataSources(props) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        if (!props.entries) {
            this.entryDataSource = ds.cloneWithRows([]);
        } else {
            const arr = _.map(props.entries, (val, i) => ({ text: val, index: i }));
            this.entryDataSource = ds.cloneWithRows(arr);
        }

        if (!props.images) {
            this.imageDataSource = ds.cloneWithRows([]);
        } else {
            const arr = _.map(props.images, (val, i) => ({ imageUrl: val, index: i }));
            this.imageDataSource = ds.cloneWithRows(arr);
        }
        if (!props.contacts) {
            this.contactDataSource = ds.cloneWithRows([]);
        } else {
            const arr = _.map(props.contacts, (val, i) => ({ details: val, index: i }));
            this.contactDataSource = ds.cloneWithRows(arr);
        }
    }
    
    renderEntryRow(toDoEntry) {
        return <ToDoEntryListItem toDoEntry={toDoEntry} />;
    }
    
    renderImageRow(toDoImage) {
        return <ToDoImageListItem toDoImage={toDoImage} />;
    }
    
    renderContactRow(toDoContact) {
        return <ToDoContactListItem toDoContact={toDoContact} />;
    }

    renderImageButton() {
      if (this.props.uploadingImage) {
        return <Progress size="large" />;
      }
  
      return (
        <Button onPress={this.onAttachAnImagePress.bind(this)}>
            Attach an image
        </Button>
      );
    }

    render() {
        const { newEntryBlockStyle } = styles;

        return (
            <View style={styles.innerFormBlockStyle}>
                <ErrorText>{ this.props.error }</ErrorText>
                <InputField
                    placeholder="Enter item name"
                    value={this.props.name}
                    onChangeText={value => this.props.toDoFormUpdate({ prop: 'name', value })}
                />
                <Label>Entries:</Label>
                <ListView
                    enableEmptySections
                    dataSource={this.entryDataSource}
                    renderRow={this.renderEntryRow}
                />
                <View style={newEntryBlockStyle}>
                    <View style={{ flex: 1 }}>
                        <InputField
                            placeholder="Add new entry"
                            value={this.props.newEntry}
                            onChangeText={
                                value => this.props.toDoFormUpdate({ prop: 'newEntry', value })
                            }
                        />
                    </View>
                    <TouchableOpacity
                        onPress={this.onAddNewEntryPress.bind(this)}
                        style={{ padding: 5 }}
                    >
                        <Text style={{ fontSize: 36 }}>+</Text>
                    </TouchableOpacity>
                </View>
                <Label>Images:</Label>
                <ListView
                    enableEmptySections
                    dataSource={this.imageDataSource}
                    renderRow={this.renderImageRow}
                />
                {this.renderImageButton()}
                <Label>Contacts:</Label>
                <ListView
                    enableEmptySections
                    dataSource={this.contactDataSource}
                    renderRow={this.renderContactRow}
                />
                <Button onPress={this.onAddContactPress.bind(this)}>
                    Add a contact
                </Button>
            </View>
        );
    }
}

const styles = {
    newEntryBlockStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    innerFormBlockStyle: {
        padding: 3,
        borderColor: '#777777',
        borderRadius: 4,
        borderWidth: 1,
        margin: 3
    }
};

const mapStateToProps = ({ toDoForm }) => toDoForm;

export default connect(mapStateToProps, { 
        toDoFormUpdate,
        addNewEntry,
        chooseImage,
        getContact
    })(ToDoForm);
