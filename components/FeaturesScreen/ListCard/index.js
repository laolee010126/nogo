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
              <Text style={styles.list_text}>
                目标：想方设法不要让自己提走对方的棋子（围住），尽可能让自己的棋子被对方提走。（围住）
              </Text>
            </View>
            <View style={styles.list_view}>
              <Text style={styles.list_text}>
                什么是“气”：要理解“提走”，首先要理解什么是“气”。一个棋子在棋盘上，与它直线紧邻的空点是这个棋子的“气”。
                棋子直线紧邻的点上，如果有同色棋子存在，则它们便相互连接成一个不可分割的整体。它们的气也应一并计算。
              </Text>
            </View>
            <View style={styles.list_view}>
              <Text style={styles.list_text}>
                什么是“提走”：当一个棋子没有“气”的时候它就要被提走。棋子直线紧邻的点上，如果有异色棋子存在，这口气就不复存在。如所有的气均为对方所占据，便呈无气状态。无气状态的棋子不能在棋盘上存在，也就是提子。把无气之子提出盘外的手段叫“提子”。
              </Text>
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
              <Text style={styles.list_text}>
                什么是“提走”：当一个棋子没有“气”的时候它就要被提走。棋子直线紧邻的点上，如果有异色棋子存在，这口气就不复存在。如所有的气均为对方所占据，便呈无气状态。无气状态的棋子不能在棋盘上存在，也就是提子。把无气之子提出盘外的手段叫“提子”。
              </Text>
            </View>
            <View style={styles.list_view}>
              <Text style={styles.list_text}>
                棋盘的规格：如图所示，不围棋的棋盘大小是9*9。注意，这里的9*9指的是格点的数目，并不是格子的数量，因为棋子要下在格点上。
              </Text>
            </View>
            <View style={styles.list_view}>
              <Text style={styles.list_text}>
                落子先后：黑子先手，双方轮流落子，落子后棋子不可移动。
              </Text>
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
              <Text style={styles.list_text}>
                判负条件：不围棋没有平局。一方输掉比赛，当且仅当以下至少一条发生：
                1）如果一方落子后吃掉了对方的棋子，则落子一方判负；
                2）对弈禁止自杀，落子自杀一方判负；
                3）对弈禁止空手(pass)，空手一方判负。
              </Text>
            </View>
            <View style={styles.list_view}>
              <Text style={styles.list_text}>
                开局限制：黑棋第一手禁止下在棋盘正中央。
              </Text>
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
