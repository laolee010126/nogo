import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

const ListCard = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.title_view}>
        <Text style={styles.title}>Nogo 不围棋</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.list_view}
        onPress={() => {
          navigation.navigate('NewGameScreen');
        }}>
        <Text style={styles.list_text}>新游戏</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.list_view}
        onPress={() => {
          navigation.navigate('HelpScreen');
        }}>
        <Text style={styles.list_text}>帮助</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        activeOpacity={0.8}
        style={styles.list_view}
        onPress={() => {
          navigation.navigate('HistoryScreen');
        }}>
        <Text style={styles.list_text}>历史游戏</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.list_view}
        onPress={() => {}}>
        <Text style={styles.list_text}>推出</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListCard;
