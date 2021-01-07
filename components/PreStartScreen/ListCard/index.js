import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const ListCard = ({title, bot, botLevel}) => {
  const navigation = useNavigation();
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState(bot);
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
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.subtitle_view}>
          <Text style={styles.subtitle}>请输入用户名（8个字以内小写字母）</Text>
        </View>
        <TextInput
          style={styles.list_view}
          value={name1}
          onChangeText={(text) => {
            setName1(text);
          }}
        />
        <View style={styles.VS_view}>
          <Text style={styles.VS_text}>VS</Text>
        </View>
        <TextInput
          value={name2}
          onChangeText={(text) => {
            setName2(text);
          }}
          style={styles.list_view}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('GameScreen', {
              users: {user1: name1, user2: name2},
              botLevel,
            });
          }}>
          <View style={styles.btn_view}>
            <Text style={styles.vtn_text}>Play</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ListCard;
