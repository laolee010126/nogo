import React from 'react';
import {View, Text} from 'react-native';
import BackGround from 'components/BackGround';
import ListCard from 'components/NewGameScreen/ListCard';
const NewGameScreen = () => {
  return (
    <View>
      <BackGround />
      <ListCard />
    </View>
  );
};

export default NewGameScreen;
