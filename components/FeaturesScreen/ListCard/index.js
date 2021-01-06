import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const ListCard = () => {
  const navigation = useNavigation();
  const [page, setPage] = useState('1');
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
          <Text style={styles.title}>Nogo 不围棋</Text>
        </View>
        {page === '1' && (
          <>
            <View style={styles.list_view}>
              <Text style={styles.list_text}>功能1.不围棋规则介绍菜单</Text>
            </View>
            <View style={styles.list_view}>
              <Text style={styles.list_text}>功能2.功能介绍菜单</Text>
            </View>
            <View style={styles.list_view}>
              <Text style={styles.list_text}>
                功能3.历史游戏-未完成游戏: 可以看到未完成的游戏
              </Text>
            </View>
            <View style={styles.list_view}>
              <Text style={styles.list_text}>
                功能4.历史游戏-已完成游戏: 可以看到完成的游戏
              </Text>
            </View>
            <View style={styles.list_view}>
              <Text style={styles.list_text}>功能5.新游戏-可以起名字</Text>
            </View>
            <View style={styles.list_view}>
              <Text style={styles.list_text}>功能6.游戏-提示</Text>
            </View>
            <View style={styles.list_view}>
              <Text style={styles.list_text}>功能6.游戏-中途退出</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setPage('2');
              }}>
              <Icon name="arrow-forward-outline" size={25}></Icon>
            </TouchableOpacity>
          </>
        )}
        {page === '2' && (
          <>
            <View style={styles.list_view}>
              <Text style={styles.list_text}>功能4</Text>
            </View>
            <View style={styles.list_view}>
              <Text style={styles.list_text}>功能5</Text>
            </View>
            <View style={styles.list_view}>
              <Text style={styles.list_text}>功能6</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setPage('1');
              }}>
              <Icon name="arrow-back-outline" size={25}></Icon>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setPage('3');
              }}>
              <Icon name="arrow-forward-outline" size={25}></Icon>
            </TouchableOpacity>
          </>
        )}
        {page === '3' && (
          <>
            <View style={styles.list_view}>
              <Text style={styles.list_text}>功能7</Text>
            </View>
            <View style={styles.list_view}>
              <Text style={styles.list_text}>功能8</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setPage('2');
              }}>
              <Icon name="arrow-back-outline" size={25}></Icon>
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
  );
};

export default ListCard;
