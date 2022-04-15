import {View, Dimensions} from 'react-native';

const windowDimensions = Dimensions.get("window");

const Field = ({chipStatus, isSelected, onPress}) => {
    const fieldDiameter = windowDimensions.width / 12;
    const fieldRadius = fieldDiameter / 2;
    const chipRadius = 0.8 * fieldRadius;
    const chipDiameter = 2 * chipRadius;
    const fieldMargin = fieldRadius / 3.5;

    const styles = {
        container: {
            width: fieldDiameter,
            height: fieldDiameter,
            borderRadius: fieldRadius,
            margin: fieldMargin,
            justifyContent: 'center',
            alignItems: 'center',
        },
        chipTop: {
            width: chipDiameter,
            height: chipRadius,
            borderTopLeftRadius: chipRadius,
            borderTopRightRadius: chipRadius,
            backgroundColor: isSelected ? '#cd0000': '#0156b5'
        },
        chipBottom: {
            width: chipDiameter,
            height: chipRadius,
            borderBottomLeftRadius: chipRadius,
            borderBottomRightRadius: chipRadius,
            backgroundColor: isSelected ? '#000': '#f6cd03'
        }
    };

    if (chipStatus != null) {
        const containerStyleObj = styles.container;
        containerStyleObj.borderColor = '#000';
        containerStyleObj.borderWidth = 1;
    }

    return (
        <View style={styles.container} onStartShouldSetResponder={onPress}>
            {chipStatus && (
                <>
                    <View style={styles.chipTop}></View>
                    <View style={styles.chipBottom}></View>
                </>
            )}
        </View>
    )
}

export default Field;
