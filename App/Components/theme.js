import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLOR = {
  primary: '#ff5678',
  secondary: '#171717',
  background: '#fefefefe',
  dark: '#222',
  lighter: '#F3F3F3',
};

export const SIZES = {
  base: 10,
  width,
  height,
};

const theme = {COLOR, SIZES};

export default theme;
