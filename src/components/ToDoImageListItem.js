import React, { Component } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { deleteImage } from '../actions';

class ToDoImageListItem extends Component {

  onDeleteImagePress() {
    this.props.deleteImage(this.props.toDoImage.index);
  }

  render() {
    const { imageUrl } = this.props.toDoImage;

    console.log(this.props);
    return (
        <View style={styles.containerStyle}>
            <Image style={styles.imageStyle} source={{ uri: imageUrl }} />
            <TouchableOpacity
                        onPress={this.onDeleteImagePress.bind(this)}
                        style={styles.buttonStyle}
            >
              <Text style={{ fontSize: 36 }}>-</Text>
            </TouchableOpacity>
        </View>
    );
  }
}

const styles = {
  imageStyle: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
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

export default connect(null, { deleteImage })(ToDoImageListItem);
