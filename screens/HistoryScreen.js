import React from 'react';
import {View, Text} from 'react-native';
import BackGround from 'components/BackGround';
import ListCard from 'components/HistoryScreen/ListCard';

const HistoryScreen = () => {
  return (
    <View>
      <BackGround />
      <ListCard />
    </View>
  );
};

export default HistoryScreen;
