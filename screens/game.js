import {Linking, Text, View} from 'react-native';
import {useMemo, useState} from 'react';
import Field from '../components/field';
import Button from '../components/button';

const SUPPORT_UKRAINE_SITE_URL = 'https://supportukrainenow.org';

const Game = ({route: {params: {chipStatusMatrix}}}) => {
    const {chipStatuses, initialRemainderChipCount, destinationField} = useMemo(() =>
        createInitialChipStatuses(chipStatusMatrix), []);
    const moves = useMemo(() => [], []);

    const [remainderChipCount, setRemainderChipCount] = useState(initialRemainderChipCount);
    const [selectedFieldIndexes, setSelectedFieldIndexes] = useState(null);

    const isVictory = checkIfVictory(remainderChipCount, chipStatuses, destinationField);

    const handleFieldClick = (chipStatus, rowIndex, columnIndex) => {
        if (chipStatus == null) {
            return;
        }

        if (chipStatus) {
            selectChip(chipStatuses, rowIndex, columnIndex, setSelectedFieldIndexes);
        } else {
            moveChip(chipStatuses, rowIndex, columnIndex, selectedFieldIndexes, remainderChipCount,
                moves, setRemainderChipCount, setSelectedFieldIndexes);
        }
    }

    const cancelPreviousMove = () => cancelPreviousChipMove(chipStatuses, moves, remainderChipCount,
        setRemainderChipCount, setSelectedFieldIndexes);

    const board = chipStatuses.map((chipStatusRow, rowIndex) => (
        <View key={rowIndex} style={styles.boardRow}>
            {chipStatusRow.map((chipStatus, columnIndex) => {
                const isSelected = rowIndex === selectedFieldIndexes?.rowIndex
                    && columnIndex === selectedFieldIndexes?.columnIndex;

                return (
                    <Field key={columnIndex} chipStatus={chipStatus} isSelected={isSelected}
                           onPress={() => handleFieldClick(chipStatus, rowIndex, columnIndex)}/>
                );
            })}
        </View>
    ));

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Button text='STOP WAR IN UKRAINE !!!' onPress={openSupportUkraineSite}></Button>
            </View>
            <View style={styles.main}>
                <View style={styles.victory}>
                    {isVictory && (
                        <>
                            <Text style={{...styles.victoryText, color: '#cd0000'}}>You won!</Text>
                            <Text style={{...styles.victoryText, color: '#000'}}>Congratulation!</Text>
                        </>
                    )}
                </View>
                <View style={styles.board}>{board}</View>
            </View>
            <View style={styles.footer}>
                {!!moves.length && <Button text='Cancel move' onPress={cancelPreviousMove}></Button>}
            </View>
        </View>
    );
}

const createInitialChipStatuses = chipStatusMatrix => {
    let initialRemainderChipCount = -1;
    const destinationField = {};
    const chipStatuses = chipStatusMatrix.map((chipStatusRow, rowIndex) => chipStatusRow.map((chipStatus, columnIndex) => {
        if (chipStatus) {
            ++initialRemainderChipCount;
        } else if (chipStatus === false) {
            destinationField.rowIndex = rowIndex;
            destinationField.columnIndex = columnIndex;
        }

        return chipStatus;
    }));

    return {chipStatuses, initialRemainderChipCount, destinationField};
}

const selectChip = (chipStatuses, rowIndex, columnIndex, setSelectedFieldIndexes) => {
    if ((saveGetChipStatus(chipStatuses, rowIndex, columnIndex - 2) === false
            && chipStatuses[rowIndex] [columnIndex - 1] === true)
        || (saveGetChipStatus(chipStatuses, rowIndex, columnIndex + 2) === false
            && chipStatuses[rowIndex] [columnIndex + 1] === true)
        || (saveGetChipStatus(chipStatuses, rowIndex - 2, columnIndex) === false
            && chipStatuses[rowIndex - 1] [columnIndex] === true)
        || (saveGetChipStatus(chipStatuses, rowIndex + 2, columnIndex) === false
            && chipStatuses[rowIndex + 1] [columnIndex] === true)) {

        setSelectedFieldIndexes({rowIndex, columnIndex});
    }
}

const moveChip = (chipStatuses, rowIndex, columnIndex, selectedFieldIndexes,
                  remainderChipCount, moves, setRemainderChipCount, setSelectedFieldIndexes) => {

    if (selectedFieldIndexes) {
        const selectedRowIndex = selectedFieldIndexes.rowIndex;
        const selectedColumnIndex = selectedFieldIndexes.columnIndex;

        const rowDifference = Math.abs(rowIndex - selectedRowIndex);
        const columnDifference = Math.abs(columnIndex - selectedColumnIndex);

        let isChipMoved;
        if (rowDifference === 2 && columnDifference === 0) {
            chipStatuses[(rowIndex + selectedRowIndex) / 2][columnIndex] = false;

            isChipMoved = true;
        } else if (rowDifference === 0 && columnDifference === 2) {
            chipStatuses[rowIndex][(columnIndex + selectedColumnIndex) / 2] = false;

            isChipMoved = true;
        }

        if (isChipMoved) {
            chipStatuses[selectedRowIndex][selectedColumnIndex] = false;
            chipStatuses[rowIndex][columnIndex] = true;

            moves.push({selectedFieldIndexes, targetFieldIndexes: {rowIndex, columnIndex}});

            setRemainderChipCount(remainderChipCount - 1);
            setSelectedFieldIndexes(null);
        }
    }
}

const cancelPreviousChipMove = (chipStatuses, moves, remainderChipCount,
                                setRemainderChipCount, setSelectedFieldIndexes) => {

    const {selectedFieldIndexes, targetFieldIndexes} = moves.pop();

    const selectedRowIndex = selectedFieldIndexes.rowIndex;
    const selectedColumnIndex = selectedFieldIndexes.columnIndex;
    const targetRowIndex = targetFieldIndexes.rowIndex;
    const targetColumnIndex = targetFieldIndexes.columnIndex;

    chipStatuses[selectedRowIndex][selectedColumnIndex] = true;
    chipStatuses[(selectedRowIndex + targetRowIndex) / 2][(selectedColumnIndex + targetColumnIndex) / 2] = true;
    chipStatuses[targetRowIndex][targetColumnIndex] = false;

    setRemainderChipCount(remainderChipCount + 1);
    setSelectedFieldIndexes(selectedFieldIndexes);
}

const saveGetChipStatus = (chipStatuses, rowIndex, columnIndex) => {
    const chipStatusRow = chipStatuses[rowIndex];
    if (chipStatusRow) {
        return chipStatusRow[columnIndex];
    }
}

const checkIfVictory = (remainderChipCount, chipStatuses, destinationField) =>
    !remainderChipCount && (chipStatuses[destinationField.rowIndex][destinationField.columnIndex] === true)

const openSupportUkraineSite = () => {
    Linking.openURL(SUPPORT_UKRAINE_SITE_URL);
}

const styles = {
    container: {
        height: '100%',
    },
    header: {
        flex: 1,
        justifyContent: 'center'
    },
    main: {
        flex: 5
    },
    footer: {
        flex: 1,
        justifyContent: 'center'
    },
    victory: {
        flex: 1,
        justifyContent: 'center'
    },
    board: {
        flex: 5,
        justifyContent: 'center'
    },
    boardRow: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    victoryText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'Roboto'
    },
};

export default Game;
