import React from 'react';
import {View, Text} from 'react-native';
import BackGround from 'components/BackGround';
import ListCard from 'components/PausedGameScreen/ListCard';

const PausedGameScreen = () => {
  return (
    <View>
      <BackGround />
      <ListCard />
    </View>
  );
};

export default PausedGameScreen;
