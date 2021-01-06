import React from 'react';
import {View, Text} from 'react-native';
import BackGround from 'components/BackGround';
import ListCard from 'components/PreStartScreen/ListCard';

const PreStartScreen = ({route}) => {
  let bot;
  if (route.params) {
    bot = route.params.bot;
  }

  return (
    <View>
      <BackGround />
      {bot ? (
        <ListCard title="人机对战" bot={bot} />
      ) : (
        <ListCard title="人人对战" bot={bot} />
      )}
    </View>
  );
};

export default PreStartScreen;
