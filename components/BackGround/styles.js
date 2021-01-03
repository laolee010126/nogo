import {StyleSheet} from 'react-native';
import {PixelRatio, Width, Height} from 'configs/size';

export default styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: Width,
    height: Height,
  },
  background1: {
    width: Width / 2,
    height: Height / 2,
    backgroundColor: 'rgb(244,244,244)',
    position: 'absolute',
  },
  background2: {
    width: Width / 2,
    height: Height / 2,
    backgroundColor: 'rgb(255, 246, 212)',
    position: 'absolute',
    marginLeft: Width / 2,
  },
  background3: {
    width: Width / 2,
    height: Height / 2,
    backgroundColor: 'rgb(255, 246, 212)',
    position: 'absolute',
    marginTop: Height / 2,
  },
  background4: {
    width: Width / 2,
    height: Height / 2,
    backgroundColor: 'rgb(244,244,244)',
    position: 'absolute',
    marginTop: Height / 2,
    marginLeft: Width / 2,
  },
});
