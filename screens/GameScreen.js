import React, {useState} from 'react';
import {View, Text} from 'react-native';
import BackGround from 'components/BackGround';
import ListCard from 'components/GameScreen/ListCard';

export default function GameScreen({route}) {
  const {user1, user2} = route.params.users;
  const {botlevel} = route.params;

  const [squares, setSquares] = useState(Array(81).fill(null));
  const [isBlackNext, setIsBlackNext] = useState(true);

  return (
    <View>
      <BackGround />
      <ListCard
        user1={user1}
        user2={user2}
        squares={squares}
        setSquares={setSquares}
        isBlackNext={isBlackNext}
        setIsBlackNext={setIsBlackNext}
        botlevel={botlevel}
      />
    </View>
  );
}
