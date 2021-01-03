import {StyleSheet} from 'react-native';
import {PixelRatio, Width, Height} from 'configs/size';
import {REGULAR_FONT, BOLD_FONT} from 'configs/font';

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
    elevation: 5,
  },
  title: {
    fontFamily: BOLD_FONT,
    fontSize: 36 * PixelRatio,
  },
  title_view: {
    marginTop: 50 * PixelRatio,
    marginBottom: 80 * PixelRatio,
  },
  list_view: {
    marginTop: 30 * PixelRatio,
    backgroundColor: 'rgb(255, 246, 212)',
    borderBottomWidth: 0.5 * PixelRatio,
  },
  list_text: {
    fontFamily: REGULAR_FONT,
    fontSize: 28 * PixelRatio,
    backgroundColor: 'rgb(255, 246, 212)',
  },
});
