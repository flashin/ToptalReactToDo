import React from 'react';
import { TextInput, View } from 'react-native';

const InputField = ({ value,
          onChangeText,
          placeholder,
          secureTextEntry,
          keyboardType,
          autoCapitalize
        }) => {
  const { inputStyle, containerStyle } = styles;

  return (
      <View style={containerStyle}>
        <TextInput
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            autoCorrect={false}
            style={inputStyle}
            value={value}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            onChangeText={onChangeText}
            underlineColorAndroid='transparent'
        />
      </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    padding: 5,
    fontSize: 18,
    lineHeight: 23,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000'
  },
  containerStyle: {
      padding: 5
  }
};

export { InputField };
