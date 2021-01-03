import {StyleSheet} from 'react-native';
import {PixelRatio, Width, Height} from 'configs/size';

export default styles = StyleSheet.create({
  container: {
    width: 400 * PixelRatio,
    marginLeft: 40 * PixelRatio,
    height: 600 * PixelRatio,
    alignItems: 'center',
    marginTop: 150 * PixelRatio,
    borderWidth: 1 * PixelRatio,
    borderRadius: 5 * PixelRatio,
    backgroundColor: 'rgb(244,244,244)',
    elevation: 5 * PixelRatio,
  },
  title: {
    fontSize: 36 * PixelRatio,
  },
  title_view: {
    marginTop: 50 * PixelRatio,
    marginBottom: 30 * PixelRatio,
  },
  list_view: {
    width: '90%',
    marginTop: 30 * PixelRatio,
    backgroundColor: 'rgb(255, 246, 212)',
    borderBottomWidth: 0.5 * PixelRatio,
  },
  list_text: {
    fontSize: 16 * PixelRatio,
  },
  back: {
    position: 'absolute',
    marginTop: 65 * PixelRatio,
    marginLeft: 20 * PixelRatio,
  },
});
