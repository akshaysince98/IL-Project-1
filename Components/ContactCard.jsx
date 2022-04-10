import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Linking } from 'react-native';
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';

function ContactCard(props) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return(
        <View style={styles.card}>
            <View style={styles.dobSection}>
                <Text style={styles.dobText}>{props.dob.date} {months[props.dob.month - 1]} {props.dob.year}</Text>
            </View>
            <View style={styles.midSection}>
                <View style={styles.nameSection}>
                    <Image style={styles.image} source={{ uri: `https://avatars.dicebear.com/api/miniavs/${props.name}.png?b=%23e6e6e6` }}/>
                    <View>
                        <Text style={styles.text}>{props.name}</Text>
                        <Text style={styles.subtext}>{props.email}</Text>
                        <Text style={styles.subtext}>{props.about}</Text>
                    </View>
                </View>
                <Entypo name="edit" size={20} color="#3D4260" onPress={() => props.onPressEdit()}/>
            </View>
            <View style={styles.hr}/>
            <View style={styles.contactSection}>
                <Text style={styles.text}>{props.phone}</Text>
                <View style={styles.actionSection}>
                    <FontAwesome name="phone" size={20} color="#7984BF" onPress={() => Linking.openURL(`tel:${props.phone}`)}/>
                    <View style={{ width: 24 }}/>
                    <Ionicons name="mail" size={20} color="#7984BF" onPress={() => Linking.openURL(`mailto:${props.email}`)}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: Dimensions.get('window').width * 0.9,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,

        margin: 8,

        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 3, },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },  

    dobSection: {
        backgroundColor: '#7984BF',
        borderBottomLeftRadius: 16,
        borderTopRightRadius: 16,

        paddingHorizontal: 16,
        paddingVertical: 6,

        alignSelf: 'flex-end',
    },

    dobText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },

    image: {
        width: 64, 
        height: 64,
        marginRight: 16,

        borderRadius: 2,
    },

    midSection: {
        flexDirection: 'row',
        alignItems: 'center', 
        
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },

    nameSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    contactSection: {
        flexDirection: 'row',
        alignItems: 'center', 
        
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 12,
    },

    actionSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    text: {
        color: '#3D4260',
        fontSize: 14,
        fontWeight: 'bold',
    },

    subtext: {
        color: '#00000088',
        fontSize: 12,
    },

    hr: {
        marginHorizontal: 16,
        marginVertical: 16,

        borderBottomColor: '#7984BF',
        borderBottomWidth: 1,

        opacity: 0.2
    }
});

export default ContactCard;