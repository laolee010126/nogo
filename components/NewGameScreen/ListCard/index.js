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
          <Text style={styles.title}>NoGo 不围棋</Text>
        </View>

        <View style={styles.list_view}>
          <Text style={styles.list_text1}>人机模式</Text>
        </View>
        <View style={styles.game_view}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.extraGame_element_view}
            onPress={() => {
              navigation.navigate('PreStartScreen', {
                bot: '弱智',
                botLevel: 'bot1',
              });
            }}>
            <Text style={styles.list_text}>弱智</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.extraGame_element_view}
            onPress={() => {
              navigation.navigate('PreStartScreen', {
                bot: '简单',
                botLevel: 'bot2',
              });
            }}>
            <Text style={styles.list_text}>简单</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.game_view}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.extraGame_element_view}
            onPress={() => {
              navigation.navigate('PreStartScreen', {
                bot: '中等',
                botLevel: 'bot3',
              });
            }}>
            <Text style={styles.list_text}>中等</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.extraGame_element_view}
            onPress={() => {
              navigation.navigate('PreStartScreen', {
                bot: '困难',
                botLevel: 'bot4',
              });
            }}>
            <Text style={styles.list_text}>困难</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ListCard;
