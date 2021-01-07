import React from 'react';
import {View, Text} from 'react-native';
import BackGround from 'components/BackGround';
import ListCard from 'components/PreStartScreen/ListCard';

const PreStartScreen = ({route}) => {
  let bot;
  if (route.params) {
    bot = route.params.bot;
    botLevel = route.params.botLevel;
  }

  return (
    <View>
      <BackGround />
      {bot ? (
        <ListCard title="人机对战" bot={bot} botLevel={botLevel} />
      ) : (
        <ListCard title="人人对战" bot={bot} botLevel={botLevel} />
      )}
    </View>
  );
};

export default PreStartScreen;
