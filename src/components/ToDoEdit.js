import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { Button, Progress, WarningDialog } from './custom';
import { toDoEdit, toDoFormUpdate, shareItem, toDoDelete } from '../actions';
import ToDoForm from './ToDoForm';

class ToDoEdit extends Component {

    state = { showDeleteModal: false };

    componentWillMount() {
        _.each(this.props.toDoItem, (value, prop) => {
          this.props.toDoFormUpdate({ prop, value });
        });
    }

    onEditPress() {
        const { name, entries, images, contacts } = this.props;

        this.props.toDoEdit({ name, entries, images, contacts, uid: this.props.toDoItem.uid });
    }

    onSharePress() {
        const { name, entries, images, contacts } = this.props;

        this.props.shareItem({ name, entries, images, contacts });
    }

    onDeleteAccept() {
        this.setState({ showDeleteModal: false });
        this.props.toDoDelete({ uid: this.props.toDoItem.uid });
    }
    
    onDeleteDecline() {
        this.setState({ showDeleteModal: false });
    }

    renderButton() {
        if (this.props.loading) {
        return <Progress size="large" />;
        }

        return (
        <Button onPress={this.onEditPress.bind(this)}>
            Save
        </Button>
        );
    }

    render() {
        return (
        <ScrollView style={{ flex: 1, paddingBottom: 10 }}>
            <ToDoForm {...this.props} />
            { this.renderButton() }
            <Button onPress={this.onSharePress.bind(this)}>
                Share
            </Button>
            <Button onPress={() => this.setState({ showDeleteModal: !this.state.showDeleteModal })}>
                Delete
            </Button>
            <WarningDialog
                visible={this.state.showDeleteModal}
                onAccept={this.onDeleteAccept.bind(this)}
                onDecline={this.onDeleteDecline.bind(this)}
            >
            Are you sure you want to delete the item?
            </WarningDialog>
        </ScrollView>
        );
    }
}

const mapStateToProps = ({ toDoForm }) => toDoForm;

export default connect(mapStateToProps, {
    toDoEdit,
    toDoFormUpdate,
    shareItem,
    toDoDelete
    })(ToDoEdit);
