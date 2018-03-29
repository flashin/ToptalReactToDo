import React from 'react';
import { Text, View, Modal } from 'react-native';
import { Button } from './Button';

const WarningDialog = ({ children, visible, onAccept, onDecline }) => {
  const { containerStyle, textStyle } = styles;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 50 }}>
        <View style={containerStyle}>
          <View style={{ height: 100 }}>
            <Text style={textStyle}>
              {children}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: 70 }}>
              <Button onPress={onAccept}>Yes</Button>
            </View>
            <View style={{ width: 70 }}>
              <Button onPress={onDecline}>No</Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 30
  },
  containerStyle: {
    backgroundColor: '#ffffff',
    position: 'relative',
    justifyContent: 'center',
    padding: 20,
    flexDirection: 'column',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#444444'
  }
};

export { WarningDialog };
