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
          <Text style={styles.title}>Nogo 不围棋</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.list_view}
          onPress={() => {
            navigation.navigate('RuleScreen');
          }}>
          <Text style={styles.list_text}>不围棋规则</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.list_view}
          onPress={() => {
            navigation.navigate('FeaturesScreen');
          }}>
          <Text style={styles.list_text}>功能介绍</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ListCard;
