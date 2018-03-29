import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Progress = ({ size }) => (
    <View style={styles.progressStyle}>
      <ActivityIndicator size={size || 'large'} />
    </View>
  );

const styles = {
  progressStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export { Progress };
