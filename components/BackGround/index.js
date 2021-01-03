import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

const BackGround = () => {
  return (
    <View style={styles.container}>
      <View style={styles.background1} />
      <View style={styles.background2} />
      <View style={styles.background3} />
      <View style={styles.background4} />
    </View>
  );
};

export default BackGround;
