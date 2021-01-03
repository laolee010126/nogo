import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');

const BASE_WIDTH = 480;

export const PixelRatio = width / BASE_WIDTH;
export const Width = width;
export const Height = height;
