import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Menu from "./screens/menu";
import Game from "./screens/game";

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Menu">
                <Stack.Screen name="Menu" component={Menu}/>
                <Stack.Screen name="Game" component={Game}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
