import React from 'react';
import {View} from 'react-native';
import BackGround from 'components/BackGround';
import ListCard from 'components/MainScreen/ListCard';

const MainScreen = () => {
  return (
    <View>
      <BackGround />
      <ListCard />
    </View>
  );
};
export default MainScreen;
