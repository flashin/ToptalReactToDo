import React from 'react';
import { Text } from 'react-native';

const ErrorText = ({ children }) => {
  const { textStyle } = styles;

  return (
      <Text style={textStyle}>
        {children}
      </Text>
  );
};

const styles = {
  textStyle: {
    color: '#ff0000',
    fontSize: 15,
    paddingLeft: 5
  }
};

export { ErrorText };
