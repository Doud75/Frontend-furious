import { StyleSheet } from 'react-native';
import colors from './colors'

const globalStyles = StyleSheet.create({
    title1: {
        fontSize: 46,
        color: colors.white,
    },
    title2: {
        fontSize: 18,
        color: colors.white,
    },
    paragraph: {
        fontSize: 16,
        color: colors.white,
    },
    background:{
        backgroundColor: colors.background,
        height: '100%',
        padding: 28,
    },
});

export default globalStyles;
