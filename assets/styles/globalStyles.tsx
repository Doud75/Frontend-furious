import { StyleSheet } from 'react-native';
import colors from './colors'

const globalStyles = StyleSheet.create({
    title1: {
        fontSize: 40,
        color: colors.white,
        fontFamily: 'Ruda-ExtraBold',
        fontWeight: 900,
    },
    title2: {
        fontSize: 18,
        color: colors.white,
        fontFamily: 'Ruda-ExtraBold',
    },
    title3: {
        fontSize: 24,
        color: colors.white,
        fontFamily: 'Ruda-ExtraBold',
    },
    paragraph: {
        fontSize: 16,
        color: colors.white,
        lineHeight: 23,
        fontFamily: 'Roboto-Regular',
    },
    background:{
        backgroundColor: colors.background,
        height: '100%',
        padding: 28,
    },
});

export default globalStyles;
