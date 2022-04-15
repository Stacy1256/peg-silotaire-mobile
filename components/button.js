import {Text, View, TouchableOpacity} from 'react-native';


const Button = ({text, onPress}) => {
    const borderRadius = 10;

    const styles = {
        container: {
            height: 35,
            margin: 5
        },
        backgroundTop: {
            flex: 1,
            backgroundColor: '#cd0000',
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius,
        },
        backgroundBottom: {
            flex: 1,
            backgroundColor: '#000',
            borderBottomLeftRadius: borderRadius,
            borderBottomRightRadius: borderRadius,
        },
        text: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: 22,
            fontFamily: 'Roboto',
            color: '#fff9ea'
        }
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.backgroundTop}></View>
            <View style={styles.backgroundBottom}></View>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

export default Button;
