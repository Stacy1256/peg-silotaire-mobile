import {View, Text} from 'react-native';
import Button from '../components/button';
import {
    SIMPLE_TEST_BOARD,
    ENGLISH_BOARD,
    FRENCH_BOARD,
    HOLE_CROSS_21_BOARD,
    HOLE_CROSS_27_BOARD,
    HOLE_CROSS_39_BOARD,
    HOLE_CROSS_45_BOARD,
    HOLE_CROSS_49_BOARD,
    GEORGE_BELL_BOARD,
    HOLE_DIAMOND_32_BOARD,
    HOLE_DIAMOND_41_BOARD
} from '../data/board';

const Menu = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.backgroundTop}></View>
            <View style={styles.backgroundBottom}></View>
            <View style={styles.container}>
                <Text style={styles.title}>Peg Solitaire</Text>
                <View style={styles.buttons}>
                    <Button text='Simple Board (just to try)' onPress={() => navigation.navigate('Game', {chipStatusMatrix: SIMPLE_TEST_BOARD})}/>
                    <Button text='English Board' onPress={() => navigation.navigate('Game', {chipStatusMatrix: ENGLISH_BOARD})}/>
                    <Button text='French Board' onPress={() => navigation.navigate('Game', {chipStatusMatrix: FRENCH_BOARD})}/>
                    <Button text='21-Hole Cross Board' onPress={() => navigation.navigate('Game', {chipStatusMatrix: HOLE_CROSS_21_BOARD})}/>
                    <Button text='27-Hole Cross Board' onPress={() => navigation.navigate('Game', {chipStatusMatrix: HOLE_CROSS_27_BOARD})}/>
                    <Button text='39-Hole Cross Board' onPress={() => navigation.navigate('Game', {chipStatusMatrix: HOLE_CROSS_39_BOARD})}/>
                    <Button text='45-Hole Cross Board' onPress={() => navigation.navigate('Game', {chipStatusMatrix: HOLE_CROSS_45_BOARD})}/>
                    <Button text='49-Hole Cross Board' onPress={() => navigation.navigate('Game', {chipStatusMatrix: HOLE_CROSS_49_BOARD})}/>
                    <Button text='George Bell Board' onPress={() => navigation.navigate('Game', {chipStatusMatrix: GEORGE_BELL_BOARD})}/>
                    <Button text='32-Hole Diamond Board ' onPress={() => navigation.navigate('Game', {chipStatusMatrix: HOLE_DIAMOND_32_BOARD})}/>
                    <Button text='41-Hole Diamond Board ' onPress={() => navigation.navigate('Game', {chipStatusMatrix: HOLE_DIAMOND_41_BOARD})}/>
                </View>
            </View>
        </View>
    );
}

const styles = {
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    backgroundTop: {
        flex: 1,
        backgroundColor: '#0156b5'
    },
    backgroundBottom: {
        flex: 1,
        backgroundColor: '#f6cd03'
    },
    title: {
        flex: 1,
        fontSize: 36,
        color: '#f6cd03',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    buttons: {
        flex: 8,
        justifyContent: 'center'
    }
};

export default Menu;
