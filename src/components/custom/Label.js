import React from 'react';
import { Text } from 'react-native';

const Label = ({ children }) => {
  const { textStyle } = styles;

  return (
    <Text style={textStyle}>
        {children}
    </Text>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#333333',
    fontSize: 16,
    fontWeight: '600',
    padding: 10
  }
};

export { Label };
