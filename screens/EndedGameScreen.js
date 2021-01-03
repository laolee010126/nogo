import React from 'react';
import {View} from 'react-native';
import BackGround from 'components/BackGround';
import ListCard from 'components/EndedGameScreen/ListCard';

const EndedGameScreen = () => {
  return (
    <View>
      <BackGround />
      <ListCard />
    </View>
  );
};
export default EndedGameScreen;
