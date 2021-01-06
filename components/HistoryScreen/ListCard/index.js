import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const ListCard = () => {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        style={styles.back}
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon name="arrow-back-outline" size={25} />
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.title_view}>
          <Text style={styles.title}>历史游戏</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.list_view}
          onPress={() => {
            navigation.navigate('PausedGameScreen');
          }}>
          <Text style={styles.list_text}>未完成游戏</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.list_view}
          onPress={() => {
            navigation.navigate('EndedGameScreen');
          }}>
          <Text style={styles.list_text}>已完成游戏</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ListCard;
