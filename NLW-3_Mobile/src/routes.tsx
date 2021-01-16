import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import BarberMap from './pages/BarberMap';
import BarberDetails from './pages/BarberDetails';


import SelectMapPosition from './pages/CreateBarbers/SelectMapPosition';
import BarberData from './pages/CreateBarbers/BarberData';
import Header from './components/Header';

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
                <Screen
                    name="BarberMap"
                    component={BarberMap}
                />

                <Screen
                    name="BarberDetails"
                    component={BarberDetails}
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={false} title="Barbearia" />
                    }}
                />

                <Screen
                    name="SelectMapPosition"
                    component={SelectMapPosition}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Selecione no Mapa" />
                    }}
                />

                <Screen
                    name="BarberData"
                    component={BarberData}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Informe os dados" />
                    }}
                />

            </Navigator>
        </NavigationContainer>
    )
}