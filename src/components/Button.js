import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo} from '@expo/vector-icons'

export default function Button({title, onPress, icon, color, capture, after}) {
    return(
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Entypo name={icon} size={24} color={color ? color : '#FFFFFF'}/>
            <Entypo name={after} size={24} color={color ? color : '#000'}/>
            <Entypo name={capture} size={80} color={color ? color : '#000'}/>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles =  StyleSheet.create({
    button: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#000',
        marginLeft: 5
    }
})