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
  subtitle: {
    fontSize: 21 * PixelRatio,
  },
  title_view: {
    marginTop: 50 * PixelRatio,
    marginBottom: 20 * PixelRatio,
  },
  list_view: {
    width: '80%',
    marginTop: 30 * PixelRatio,
    backgroundColor: 'rgb(255, 246, 212)',
    borderBottomWidth: 0.5 * PixelRatio,
    fontSize: 18 * PixelRatio,
  },
  list_text: {
    fontSize: 28 * PixelRatio,
    backgroundColor: 'rgb(255, 246, 212)',
  },
  back: {
    position: 'absolute',
    marginTop: 65 * PixelRatio,
    marginLeft: 20 * PixelRatio,
  },
  VS_view: {
    marginBottom: 25 * PixelRatio,
    marginTop: 35,
  },
  VS_text: {
    fontSize: 28 * PixelRatio,
  },
  btn_view: {
    width: 350 * PixelRatio,
    height: 60 * PixelRatio,
    borderWidth: 1 * PixelRatio,
    marginTop: 45 * PixelRatio,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15 * PixelRatio,
  },
  btn_text: {
    fontSize: 16 * PixelRatio,
  },
});
