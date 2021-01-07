import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import goBoard from 'assets/images/goBoard.png';
import axios from 'axios';

let list = '0 0';

const ListCard = ({
  user1,
  user2,
  squares,
  setSquares,
  setIsBlackNext,
  isBlackNext,
  botlevel,
}) => {
  const navigation = useNavigation();
  const [isBot, setIsBot] = useState(false);
  const [history, setHistory] = useState([]);
  const [panduanErr, setPanduanErr] = useState(false);
  const [shengfuRes, setShengfuRes] = useState('0');

  useEffect(() => {
    return () => {
      list = '0 0';
    };
  }, []);

  useEffect(() => {
    if (isBot) {
      bot();
    }
  }, [isBot]);

  const arrNumToMatchingString = (arrNum) => {
    if (arrNum <= 8) {
      return `1${arrNum + 1}`;
    } else if (arrNum <= 17) {
      return `2${arrNum - 8}`;
    } else if (arrNum <= 26) {
      return `3${arrNum - 17}`;
    } else if (arrNum <= 35) {
      return `4${arrNum - 26}`;
    } else if (arrNum <= 44) {
      return `5${arrNum - 35}`;
    } else if (arrNum <= 53) {
      return `6${arrNum - 44}`;
    } else if (arrNum <= 62) {
      return `7${arrNum - 53}`;
    } else if (arrNum <= 71) {
      return `8${arrNum - 62}`;
    } else if (arrNum <= 80) {
      return `9${arrNum - 71}`;
    }
  };

  const makeList = (xy) => {
    let blackList = list.split('0')[0];
    let whiteList = list.split('0')[1];

    if (isBlackNext) {
      blackList = xy + ' ' + blackList;
      const newList = blackList + '0' + whiteList + '0';

      return newList;
    } else {
      whiteList = xy + whiteList;
      const newList = blackList + '0' + ' ' + whiteList + '0';

      return newList;
    }
  };

  //만약 착수해도 된다면 1 착수 불가능 0
  const panduan = async (xy) => {
    //checkLuoziList 만들기
    const checkLuozi = (xy) => {
      const checkList = list + ' ' + xy;

      return checkList;
    };

    const check = checkLuozi(xy);

    //네트워크 연결
    const {data} = await axios.post('http://10.0.2.2:8001/panduan', {
      data: check,
    });
    return data.data;
  };

  //승부가 안났으면: 0, 흑 승리: 1, 백 승리: 2
  const shengfu = async (xy) => {
    const listData = makeList(xy);
    console.log(list);
    //네트워크 연결
    const {data} = await axios.post('http://10.0.2.2:8001/shengfu', {
      data: listData,
    });
    if (data.data === '0') {
      list = listData;
    }
    return data.data;
  };

  const stringToNum = (stringNum) => {
    const num = parseInt(stringNum);
    if (num <= 19) return num - 11;
    if (num <= 29) return num - 12;
    if (num <= 39) return num - 13;
    if (num <= 49) return num - 14;
    if (num <= 59) return num - 15;
    if (num <= 69) return num - 16;
    if (num <= 79) return num - 17;
    if (num <= 89) return num - 18;
    if (num <= 99) return num - 19;
  };

  const bot = async () => {
    const {data} = await axios.post('http://10.0.2.2:8001/bot', {
      data: list,
      bot: 'bot4',
    });
    console.log(botlevel);
    const result = await stringToNum(data.data);
    handleClickBot(result);
    setIsBot(false);

    return result;
  };

  const handleClick = async (i) => {
    const newSquares = squares.slice();
    if (squares[i]) {
      return;
    }
    const xy = arrNumToMatchingString(i);

    const panduanRes = await panduan(xy);
    if (panduanRes == '0') {
      console.log('______________________');
      console.log('착수 불가능!!!!!');
      setPanduanErr(true);
      console.log('______________________');
      return;
    }
    const shengfuRes = await shengfu(xy);
    if (shengfuRes == '1') {
      console.log('______________________');
      console.log('흑 승리');
      setShengfuRes('1');
      console.log('______________________');
    }
    if (shengfuRes == '2') {
      console.log('______________________');
      console.log('백 승리');
      setShengfuRes('2');
      console.log('______________________');
    }
    if (isBlackNext) {
      newSquares[i] = 'black';
    } else {
      newSquares[i] = 'white';
    }
    setSquares(newSquares);
    setIsBlackNext(!isBlackNext);
    setIsBot(true);
  };

  const handleClickBot = async (i) => {
    const newSquares = squares.slice();
    if (squares[i]) {
      return;
    }
    const xy = arrNumToMatchingString(i);

    const shengfuRes = await shengfu(xy);
    if (shengfuRes == '1') {
      console.log('______________________');
      console.log('흑 승리');
      setShengfuRes('1');
      console.log('______________________');
    }
    if (shengfuRes == '2') {
      console.log('______________________');
      console.log('백 승리');
      setShengfuRes('2');
      console.log('______________________');
    }
    if (isBlackNext) {
      newSquares[i] = 'black';
    } else {
      newSquares[i] = 'white';
    }
    setSquares(newSquares);
    setIsBlackNext(!isBlackNext);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.back}
        onPress={() => {
          navigation.navigate('MainScreen');
        }}>
        <Icon name="arrow-back-outline" size={25} />
      </TouchableOpacity>
      <View style={styles.container}>
        <Image source={goBoard} style={styles.board} />
        <>
          <TouchableOpacity
            style={styles.dot11}
            onPress={() => {
              handleClick(0);
            }}
            activeOpacity={0.9}>
            {squares[0] === 'black' && <View style={styles.go_black} />}
            {squares[0] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot12}
            onPress={() => handleClick(1)}
            activeOpacity={0.9}>
            {squares[1] === 'black' && <View style={styles.go_black} />}
            {squares[1] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot13}
            onPress={() => handleClick(2)}
            activeOpacity={0.9}>
            {squares[2] === 'black' && <View style={styles.go_black} />}
            {squares[2] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot14}
            onPress={() => handleClick(3)}
            activeOpacity={0.9}>
            {squares[3] === 'black' && <View style={styles.go_black} />}
            {squares[3] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot15}
            onPress={() => handleClick(4)}
            activeOpacity={0.9}>
            {squares[4] === 'black' && <View style={styles.go_black} />}
            {squares[4] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot16}
            onPress={() => handleClick(5)}
            activeOpacity={0.9}>
            {squares[5] === 'black' && <View style={styles.go_black} />}
            {squares[5] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot17}
            onPress={() => handleClick(6)}
            activeOpacity={0.9}>
            {squares[6] === 'black' && <View style={styles.go_black} />}
            {squares[6] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot18}
            onPress={() => handleClick(7)}
            activeOpacity={0.9}>
            {squares[7] === 'black' && <View style={styles.go_black} />}
            {squares[7] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot19}
            onPress={() => handleClick(8)}
            activeOpacity={0.9}>
            {squares[8] === 'black' && <View style={styles.go_black} />}
            {squares[8] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
        </>
        {/*

              line 1 ~ 2

        */}
        <>
          <TouchableOpacity
            style={styles.dot21}
            onPress={() => handleClick(9)}
            activeOpacity={0.9}>
            {squares[9] === 'black' && <View style={styles.go_black} />}
            {squares[9] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot22}
            onPress={() => handleClick(10)}
            activeOpacity={0.9}>
            {squares[10] === 'black' && <View style={styles.go_black} />}
            {squares[10] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot23}
            onPress={() => handleClick(11)}
            activeOpacity={0.9}>
            {squares[11] === 'black' && <View style={styles.go_black} />}
            {squares[11] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot24}
            onPress={() => handleClick(12)}
            activeOpacity={0.9}>
            {squares[12] === 'black' && <View style={styles.go_black} />}
            {squares[12] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot25}
            onPress={() => handleClick(13)}
            activeOpacity={0.9}>
            {squares[13] === 'black' && <View style={styles.go_black} />}
            {squares[13] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot26}
            onPress={() => handleClick(14)}
            activeOpacity={0.9}>
            {squares[14] === 'black' && <View style={styles.go_black} />}
            {squares[14] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot27}
            onPress={() => handleClick(15)}
            activeOpacity={0.9}>
            {squares[15] === 'black' && <View style={styles.go_black} />}
            {squares[15] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot28}
            onPress={() => handleClick(16)}
            activeOpacity={0.9}>
            {squares[16] === 'black' && <View style={styles.go_black} />}
            {squares[16] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot29}
            onPress={() => handleClick(17)}
            activeOpacity={0.9}>
            {squares[17] === 'black' && <View style={styles.go_black} />}
            {squares[17] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
        </>
        {/*

              line 2 ~ 3

        */}
        <>
          <TouchableOpacity
            style={styles.dot31}
            onPress={() => handleClick(18)}
            activeOpacity={0.9}>
            {squares[18] === 'black' && <View style={styles.go_black} />}
            {squares[18] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot32}
            onPress={() => handleClick(19)}
            activeOpacity={0.9}>
            {squares[19] === 'black' && <View style={styles.go_black} />}
            {squares[19] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot33}
            onPress={() => handleClick(20)}
            activeOpacity={0.9}>
            {squares[20] === 'black' && <View style={styles.go_black} />}
            {squares[20] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot34}
            onPress={() => handleClick(21)}
            activeOpacity={0.9}>
            {squares[21] === 'black' && <View style={styles.go_black} />}
            {squares[21] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot35}
            onPress={() => handleClick(22)}
            activeOpacity={0.9}>
            {squares[22] === 'black' && <View style={styles.go_black} />}
            {squares[22] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot36}
            onPress={() => handleClick(23)}
            activeOpacity={0.9}>
            {squares[23] === 'black' && <View style={styles.go_black} />}
            {squares[23] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot37}
            onPress={() => handleClick(24)}
            activeOpacity={0.9}>
            {squares[24] === 'black' && <View style={styles.go_black} />}
            {squares[24] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot38}
            onPress={() => handleClick(25)}
            activeOpacity={0.9}>
            {squares[25] === 'black' && <View style={styles.go_black} />}
            {squares[25] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot39}
            onPress={() => handleClick(26)}
            activeOpacity={0.9}>
            {squares[26] === 'black' && <View style={styles.go_black} />}
            {squares[26] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
        </>
        <>
          <TouchableOpacity
            style={styles.dot41}
            onPress={() => handleClick(27)}
            activeOpacity={0.9}>
            {squares[27] === 'black' && <View style={styles.go_black} />}
            {squares[27] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot42}
            onPress={() => handleClick(28)}
            activeOpacity={0.9}>
            {squares[28] === 'black' && <View style={styles.go_black} />}
            {squares[28] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot43}
            onPress={() => handleClick(29)}
            activeOpacity={0.9}>
            {squares[29] === 'black' && <View style={styles.go_black} />}
            {squares[29] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot44}
            onPress={() => handleClick(30)}
            activeOpacity={0.9}>
            {squares[30] === 'black' && <View style={styles.go_black} />}
            {squares[30] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot45}
            onPress={() => handleClick(31)}
            activeOpacity={0.9}>
            {squares[31] === 'black' && <View style={styles.go_black} />}
            {squares[31] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot46}
            onPress={() => handleClick(32)}
            activeOpacity={0.9}>
            {squares[32] === 'black' && <View style={styles.go_black} />}
            {squares[32] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot47}
            onPress={() => handleClick(33)}
            activeOpacity={0.9}>
            {squares[33] === 'black' && <View style={styles.go_black} />}
            {squares[33] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot48}
            onPress={() => handleClick(34)}
            activeOpacity={0.9}>
            {squares[34] === 'black' && <View style={styles.go_black} />}
            {squares[34] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot49}
            onPress={() => handleClick(35)}
            activeOpacity={0.9}>
            {squares[35] === 'black' && <View style={styles.go_black} />}
            {squares[35] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
        </>
        <>
          <TouchableOpacity
            style={styles.dot51}
            onPress={() => handleClick(36)}
            activeOpacity={0.9}>
            {squares[36] === 'black' && <View style={styles.go_black} />}
            {squares[36] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot52}
            onPress={() => handleClick(37)}
            activeOpacity={0.9}>
            {squares[37] === 'black' && <View style={styles.go_black} />}
            {squares[37] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot53}
            onPress={() => handleClick(38)}
            activeOpacity={0.9}>
            {squares[38] === 'black' && <View style={styles.go_black} />}
            {squares[38] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot54}
            onPress={() => handleClick(39)}
            activeOpacity={0.9}>
            {squares[39] === 'black' && <View style={styles.go_black} />}
            {squares[39] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot55}
            onPress={() => handleClick(40)}
            activeOpacity={0.9}>
            {squares[40] === 'black' && <View style={styles.go_black} />}
            {squares[40] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot56}
            onPress={() => handleClick(41)}
            activeOpacity={0.9}>
            {squares[41] === 'black' && <View style={styles.go_black} />}
            {squares[41] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot57}
            onPress={() => handleClick(42)}
            activeOpacity={0.9}>
            {squares[42] === 'black' && <View style={styles.go_black} />}
            {squares[42] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot58}
            onPress={() => handleClick(43)}
            activeOpacity={0.9}>
            {squares[43] === 'black' && <View style={styles.go_black} />}
            {squares[43] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot59}
            onPress={() => handleClick(44)}
            activeOpacity={0.9}>
            {squares[44] === 'black' && <View style={styles.go_black} />}
            {squares[44] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
        </>
        <>
          <TouchableOpacity
            style={styles.dot61}
            onPress={() => handleClick(45)}
            activeOpacity={0.9}>
            {squares[45] === 'black' && <View style={styles.go_black} />}
            {squares[45] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot62}
            onPress={() => handleClick(46)}
            activeOpacity={0.9}>
            {squares[46] === 'black' && <View style={styles.go_black} />}
            {squares[46] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot63}
            onPress={() => handleClick(47)}
            activeOpacity={0.9}>
            {squares[47] === 'black' && <View style={styles.go_black} />}
            {squares[47] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot64}
            onPress={() => handleClick(48)}
            activeOpacity={0.9}>
            {squares[48] === 'black' && <View style={styles.go_black} />}
            {squares[48] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot65}
            onPress={() => handleClick(49)}
            activeOpacity={0.9}>
            {squares[49] === 'black' && <View style={styles.go_black} />}
            {squares[49] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot66}
            onPress={() => handleClick(50)}
            activeOpacity={0.9}>
            {squares[50] === 'black' && <View style={styles.go_black} />}
            {squares[50] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot67}
            onPress={() => handleClick(51)}
            activeOpacity={0.9}>
            {squares[51] === 'black' && <View style={styles.go_black} />}
            {squares[51] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot68}
            onPress={() => handleClick(52)}
            activeOpacity={0.9}>
            {squares[52] === 'black' && <View style={styles.go_black} />}
            {squares[52] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot69}
            onPress={() => handleClick(53)}
            activeOpacity={0.9}>
            {squares[53] === 'black' && <View style={styles.go_black} />}
            {squares[53] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
        </>
        <>
          <TouchableOpacity
            style={styles.dot71}
            onPress={() => handleClick(54)}
            activeOpacity={0.9}>
            {squares[54] === 'black' && <View style={styles.go_black} />}
            {squares[54] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot72}
            onPress={() => handleClick(55)}
            activeOpacity={0.9}>
            {squares[55] === 'black' && <View style={styles.go_black} />}
            {squares[55] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot73}
            onPress={() => handleClick(56)}
            activeOpacity={0.9}>
            {squares[56] === 'black' && <View style={styles.go_black} />}
            {squares[56] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot74}
            onPress={() => handleClick(57)}
            activeOpacity={0.9}>
            {squares[57] === 'black' && <View style={styles.go_black} />}
            {squares[57] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot75}
            onPress={() => handleClick(58)}
            activeOpacity={0.9}>
            {squares[58] === 'black' && <View style={styles.go_black} />}
            {squares[58] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot76}
            onPress={() => handleClick(59)}
            activeOpacity={0.9}>
            {squares[59] === 'black' && <View style={styles.go_black} />}
            {squares[59] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot77}
            onPress={() => handleClick(60)}
            activeOpacity={0.9}>
            {squares[60] === 'black' && <View style={styles.go_black} />}
            {squares[60] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot78}
            onPress={() => handleClick(61)}
            activeOpacity={0.9}>
            {squares[61] === 'black' && <View style={styles.go_black} />}
            {squares[61] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot79}
            onPress={() => handleClick(62)}
            activeOpacity={0.9}>
            {squares[62] === 'black' && <View style={styles.go_black} />}
            {squares[62] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
        </>
        <>
          <TouchableOpacity
            style={styles.dot81}
            onPress={() => handleClick(63)}
            activeOpacity={0.9}>
            {squares[63] === 'black' && <View style={styles.go_black} />}
            {squares[63] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot82}
            onPress={() => handleClick(64)}
            activeOpacity={0.9}>
            {squares[64] === 'black' && <View style={styles.go_black} />}
            {squares[64] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot83}
            onPress={() => handleClick(65)}
            activeOpacity={0.9}>
            {squares[65] === 'black' && <View style={styles.go_black} />}
            {squares[65] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot84}
            onPress={() => handleClick(66)}
            activeOpacity={0.9}>
            {squares[66] === 'black' && <View style={styles.go_black} />}
            {squares[66] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot85}
            onPress={() => handleClick(67)}
            activeOpacity={0.9}>
            {squares[67] === 'black' && <View style={styles.go_black} />}
            {squares[67] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot86}
            onPress={() => handleClick(68)}
            activeOpacity={0.9}>
            {squares[68] === 'black' && <View style={styles.go_black} />}
            {squares[68] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot87}
            onPress={() => handleClick(69)}
            activeOpacity={0.9}>
            {squares[69] === 'black' && <View style={styles.go_black} />}
            {squares[69] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot88}
            onPress={() => handleClick(70)}
            activeOpacity={0.9}>
            {squares[70] === 'black' && <View style={styles.go_black} />}
            {squares[70] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot89}
            onPress={() => handleClick(71)}
            activeOpacity={0.9}>
            {squares[71] === 'black' && <View style={styles.go_black} />}
            {squares[71] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
        </>
        <>
          <TouchableOpacity
            style={styles.dot91}
            onPress={() => handleClick(72)}
            activeOpacity={0.9}>
            {squares[72] === 'black' && <View style={styles.go_black} />}
            {squares[72] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot92}
            onPress={() => handleClick(73)}
            activeOpacity={0.9}>
            {squares[73] === 'black' && <View style={styles.go_black} />}
            {squares[73] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot93}
            onPress={() => handleClick(74)}
            activeOpacity={0.9}>
            {squares[74] === 'black' && <View style={styles.go_black} />}
            {squares[74] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot94}
            onPress={() => handleClick(75)}
            activeOpacity={0.9}>
            {squares[75] === 'black' && <View style={styles.go_black} />}
            {squares[75] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot95}
            onPress={() => handleClick(76)}
            activeOpacity={0.9}>
            {squares[76] === 'black' && <View style={styles.go_black} />}
            {squares[76] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot96}
            onPress={() => handleClick(77)}
            activeOpacity={0.9}>
            {squares[77] === 'black' && <View style={styles.go_black} />}
            {squares[77] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot97}
            onPress={() => handleClick(78)}
            activeOpacity={0.9}>
            {squares[78] === 'black' && <View style={styles.go_black} />}
            {squares[78] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot98}
            onPress={() => handleClick(79)}
            activeOpacity={0.9}>
            {squares[79] === 'black' && <View style={styles.go_black} />}
            {squares[79] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dot99}
            onPress={() => handleClick(80)}
            activeOpacity={0.9}>
            {squares[80] === 'black' && <View style={styles.go_black} />}
            {squares[80] === 'white' && <View style={styles.go_white} />}
          </TouchableOpacity>
        </>
        <View style={styles.user_view}>
          <Text style={styles.user_text}>{`${user1} VS ${user2}`}</Text>
        </View>
        <View style={styles.caidan_view}>
          <TouchableOpacity
            onPress={() => {
              setHistory(squares);
            }}>
            <Text style={styles.caidan_text}>保存游戏</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSquares(history);
            }}>
            <Text style={styles.caidan_text}>历史游戏</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSquares(Array(81).fill(null));
              list = '0 0';
            }}>
            <Text style={styles.caidan_text}>清空游戏</Text>
          </TouchableOpacity>
        </View>
        {panduanErr && (
          <View style={styles.errMessage}>
            <Text style={styles.err_text}>该点不能下</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setPanduanErr(false);
              }}>
              <Text>ok</Text>
            </TouchableOpacity>
          </View>
        )}
        {shengfuRes == '1' && (
          <View style={styles.errMessage}>
            <Text style={styles.err_text}>黑获胜</Text>
          </View>
        )}
        {shengfuRes == '2' && (
          <View style={styles.errMessage}>
            <Text style={styles.err_text}>白获胜</Text>
          </View>
        )}
      </View>
    </>
  );
};

export default ListCard;
