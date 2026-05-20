// ================================================
// NAVEGAÇÃO PRINCIPAL DO APLICATIVO
// ================================================
// Usa Tab Navigator (abas) + Stack Navigator
// (pilha de telas) para cada seção.
// ================================================

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// ---- Telas de Alunos ----
import AlunoListScreen from '../screens/alunos/AlunoListScreen';
import AlunoFormScreen from '../screens/alunos/AlunoFormScreen';

// ---- Telas de Professores ----
import ProfessorListScreen from '../screens/professores/ProfessorListScreen';
import ProfessorFormScreen from '../screens/professores/ProfessorFormScreen';

// ---- Telas de Cursos ----
import CursoListScreen from '../screens/cursos/CursoListScreen';
import CursoFormScreen from '../screens/cursos/CursoFormScreen';

// ---- Telas de Turmas ----
import TurmaListScreen from '../screens/turmas/TurmaListScreen';
import TurmaFormScreen from '../screens/turmas/TurmaFormScreen';

// ---- Tela "Mais" (Categorias, Matrículas, GPS, Câmera) ----
import MaisScreen from '../screens/MaisScreen';
import CategoriaListScreen from '../screens/categorias/CategoriaListScreen';
import CategoriaFormScreen from '../screens/categorias/CategoriaFormScreen';
import MatriculaListScreen from '../screens/matriculas/MatriculaListScreen';
import MatriculaFormScreen from '../screens/matriculas/MatriculaFormScreen';
import CameraScreen from '../screens/recursos/CameraScreen';
import MapaScreen from '../screens/recursos/MapaScreen';
import RecursosScreen from '../screens/recursos/RecursosScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// ---- Stack de Alunos ----
function AlunosStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AlunoList" component={AlunoListScreen} />
            <Stack.Screen name="AlunoForm" component={AlunoFormScreen} />
        </Stack.Navigator>
    );
}

// ---- Stack de Professores ----
function ProfessoresStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProfessorList" component={ProfessorListScreen} />
            <Stack.Screen name="ProfessorForm" component={ProfessorFormScreen} />
        </Stack.Navigator>
    );
}

// ---- Stack de Cursos ----
function CursosStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="CursoList" component={CursoListScreen} />
            <Stack.Screen name="CursoForm" component={CursoFormScreen} />
        </Stack.Navigator>
    );
}

// ---- Stack de Turmas ----
function TurmasStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="TurmaList" component={TurmaListScreen} />
            <Stack.Screen name="TurmaForm" component={TurmaFormScreen} />
        </Stack.Navigator>
    );
}

// ---- Stack da aba "Mais" ----
function MaisStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MaisHome" component={MaisScreen} />
            <Stack.Screen name="CategoriaList" component={CategoriaListScreen} />
            <Stack.Screen name="CategoriaForm" component={CategoriaFormScreen} />
            <Stack.Screen name="MatriculaList" component={MatriculaListScreen} />
            <Stack.Screen name="MatriculaForm" component={MatriculaFormScreen} />
            <Stack.Screen name="Camera" component={CameraScreen} />
            <Stack.Screen name="Mapa" component={MapaScreen} />
            <Stack.Screen name="Recursos" component={RecursosScreen} />
        </Stack.Navigator>
    );
}

// ---- Navegação principal com abas ----
export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarActiveTintColor: '#6200ee',
                    tabBarInactiveTintColor: '#999',
                    tabBarIcon: ({ color, size }) => {
                        const icons = {
                            Alunos: 'account-group',
                            Professores: 'account-tie',
                            Cursos: 'book-open-variant',
                            Turmas: 'google-classroom',
                            Mais: 'dots-horizontal-circle',
                        };
                        return (
                            <MaterialCommunityIcons
                                name={icons[route.name]}
                                size={size}
                                color={color}
                            />
                        );
                    },
                })}
            >
                <Tab.Screen name="Alunos" component={AlunosStack} />
                <Tab.Screen name="Professores" component={ProfessoresStack} />
                <Tab.Screen name="Cursos" component={CursosStack} />
                <Tab.Screen name="Turmas" component={TurmasStack} />
                <Tab.Screen name="Mais" component={MaisStack} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
