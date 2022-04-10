import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Dimensions, Image, TextInput } from 'react-native';
import ContactCard from './Components/ContactCard';
import { Ionicons } from '@expo/vector-icons';
import Carousel from 'react-native-looped-carousel';
import DateTimePicker from '@react-native-community/datetimepicker';

const Image1 = 'https://images.pexels.com/photos/3639873/pexels-photo-3639873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
const Image2 = 'https://images.pexels.com/photos/4597892/pexels-photo-4597892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
const Image3 = 'https://images.pexels.com/photos/4966683/pexels-photo-4966683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
const Image4 = 'https://images.pexels.com/photos/9362394/pexels-photo-9362394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';

export default function App() {
	const [showModal, setShowModal] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [currentlyEditing, setCurrentlyEditing] = useState();

	const [contacts, setContacts] = useState([
		{ name: 'Kshitij', phone: '9643099621', email: 'kshitijvsingh@gmail.com', about: 'Home', dob: { date: 15, month: 4, year: 2000 }},
		{ name: 'Akshat', phone: '9555241140', email: 'akshatvikramsingh@gmail.com', about: 'Home', dob: { date: 20, month: 8, year: 2002 }},
		{ name: 'Akshay', phone: '9818220492', email: 'akshay.ic18@nsut.ac.in', about: 'College', dob: { date: 5, month: 1, year: 1998 }},
		{ name: 'Mudit', phone: '8882005106', email: 'mudit.ic18@nsut.ac.in', about: 'College', dob: { date: 25, month: 12, year: 2001 }},
	]);

	const [date, setDate] = useState(new Date());
  	const [show, setShow] = useState(false);
	
  	const onChange = (selectedDate) => {
  	  	const currentDate = selectedDate;
  	  	setShow(false);
  	  	setDate(new Date(currentDate.nativeEvent.timestamp));
  	};

	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [about, setAbout] = useState('');

	const addContact = () => {
		setContacts([...contacts, { name: name, phone: phone, email: email, about: about, dob: { date: date.getDate(), month: parseInt(date.getMonth()) + 1, year: date.getFullYear() } }]);
		setShowModal(false);

		setName(''); setPhone(''); setEmail(''); setAbout(''); setDate(new Date());
	}

	const initializeEdit = (index) => {
		setName(contacts[index].name);
		setPhone(contacts[index].phone);
		setEmail(contacts[index].email);
		setAbout(contacts[index].about);
		setDate(new Date(contacts[index].dob.year, contacts[index].dob.month - 1, contacts[index].dob.date));
		setEditMode(true);
		setShowModal(true);
		setCurrentlyEditing(index);
	}

	const saveEdit = () => {
		let newContact = { name: name, phone: phone, email: email, about: about, dob: { date: date.getDate(), month: parseInt(date.getMonth()) + 1, year: date.getFullYear() } };
		setContacts([...contacts.slice(0, currentlyEditing), newContact, ...contacts.slice(currentlyEditing + 1)]);

		setShowModal(false);
		setEditMode(false);
		setName(''); setPhone(''); setEmail(''); setAbout(''); setDate(new Date());
		setCurrentlyEditing();
	}

	const cancelEdit = () => {
		setShowModal(false);
		setEditMode(false);
		setName(''); setPhone(''); setEmail(''); setAbout(''); setDate(new Date());
	}

  	return (
		<React.Fragment>
			<ScrollView style={styles.page} contentContainerStyle={{ alignItems: 'center', paddingBottom: 64, paddingTop: 16 }}>
				<View style={{ width: Dimensions.get('window').width * 0.75, marginHorizontal: Dimensions.get('window').width * 0.125 }}>
					<Carousel delay={2500} style={styles.carouselContainer} autoplay bullets bulletsContainerStyle={styles.bulletContainer} bulletStyle={styles.bulletStyle} chosenBulletStyle={styles.bulletSelectedStyle}>
						<View>
							<Text style={styles.carouselHeading}>Telephone Booth</Text>
							<Image source={{ uri: Image1 }} style={styles.carousel} />
							<Text style={styles.carouselSubheading}>Markus Winkler</Text>
						</View>
						<View>
							<Text style={styles.carouselHeading}>Photo of a Junk Car</Text>
							<Image source={{ uri: Image2 }} style={styles.carousel} />
							<Text style={styles.carouselSubheading}>Jb Jorge Barreto</Text>
						</View>
						<View>
							<Text style={styles.carouselHeading}>Retro car on old city street</Text>
							<Image source={{ uri: Image3 }} style={styles.carousel} />
							<Text style={styles.carouselSubheading}>Marina Abrosimova</Text>
						</View>
						<View>
							<Text style={styles.carouselHeading}>Lemons</Text>
							<Image source={{ uri: Image4 }} style={styles.carousel} />
							<Text style={styles.carouselSubheading}>Issaennie</Text>
						</View>
        	    	</Carousel>
				</View>
				{ contacts && contacts.map((contact, index) => { return <ContactCard key={index} onPressEdit={() => initializeEdit(index)} {...contact}/> }) }
    		</ScrollView>
			<TouchableOpacity activeOpacity={0.95} style={styles.buttonFloating} onPress={() => setShowModal(true)}>
				<Ionicons name='add' size={24} color='#FFFFFF'/>
	 		</TouchableOpacity>
			<View style={styles.centeredView}>
				<Modal animationType="slide" transparent={true} visible={showModal} onRequestClose={() => { setShowModal(!showModal); }}>
			   		<View style={styles.centeredView}>
						<View style={styles.modalView}>
						   	<View style={styles.modalHeadingRow}>
							   <Text style={styles.modalHeading}>{ editMode ? 'Edit' : 'Add' } Contact</Text>
							   <Ionicons name='ios-close' size={20} color='#3D4260' style={styles.closeIcon} onPress={() => editMode ? cancelEdit() : setShowModal(false)}/>
						   	</View>
							<View style={styles.row}>
								<TextInput style={styles.modalInput} placeholder='Name' value={name} onChangeText={(input) => setName(input)}/>
								<TextInput style={styles.modalInput} placeholder='Phone' maxLength={10} value={phone} onChangeText={(input) => setPhone(input)}/>
							</View>
							<View style={styles.row}>
								<TextInput style={styles.modalInput} placeholder='Email' value={email} onChangeText={(input) => setEmail(input)}/>
								<TextInput style={styles.modalInput} placeholder='About' value={about} onChangeText={(input) => setAbout(input)}/>
							</View>
							<View style={styles.row}>
								<Text style={styles.modalInputStatic}>Date of Birth</Text>
								<Text style={styles.modalInputStatic} onPress={() => setShow(true)}>{ date.toDateString() }</Text>
							</View>
							<TouchableOpacity style={styles.modalButton} activeOpacity={0.8} onPress={() => editMode ? saveEdit() : addContact()}>
								<Text style={styles.modalButtonText}>{ editMode ? 'Save' : 'Add' } Contact</Text>
							</TouchableOpacity>
							{ show && ( <DateTimePicker testID="dateTimePicker" value={date} mode={'date'} onChange={onChange}/> )}
						</View>
			   		</View>
			 	</Modal>
   			</View>
		</React.Fragment>
  	);
}

const styles = StyleSheet.create({
  	page: {
    	backgroundColor: '#FFFFFF',
  	},

	contactsList: {
		paddingVertical: 24,
	},

	carouselContainer: {
        width: Dimensions.get('window').width * 0.75,
        height: Dimensions.get('window').width * 1.025,
        borderRadius: 16,

		marginVertical: 16
    },

    carousel: {
        width: Dimensions.get('window').width * 0.75,
        height: Dimensions.get('window').width * 0.75,
        borderRadius: 16,
    },

	carouselHeading: {
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#3D4260',

		marginVertical: 8,
	},

	carouselSubheading: {
		fontSize: 14,
		textAlign: 'center',
		color: '#3D4260',

		marginVertical: 12
	},

	bulletContainer: {
	},

	bulletStyle: {
		backgroundColor: '#3D426044',
		width: 8,
		height: 8,
		borderRadius: 4,
	},

	bulletSelectedStyle: {
		backgroundColor: '#3D4260AA',
		width: 10,
		height: 10,
		borderRadius: 5,
	},

	buttonFloating: {
    	alignItems: 'center',
    	justifyContent: 'center',

    	position: 'absolute',
		bottom: 16,
		right: 16,

    	backgroundColor: '#3D4260',

		width: 64,
		height: 64,
		borderRadius: 32,

		shadowColor: "#000",
		shadowOffset: { width: 0, height: 12, },
		shadowOpacity: 0.58,
		shadowRadius: 16.00,

		elevation: 24,
	},

	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22
	},

	modalView: {
		margin: 16,
		backgroundColor: "white",
		borderRadius: 16,
		padding: 20,
		alignItems: "center",

		width: Dimensions.get('window').width * 0.8,

		shadowColor: "#000",
		shadowOffset: { width: 0, height: 12, },
		shadowOpacity: 0.58,
		shadowRadius: 16.00,

		elevation: 24,
	},

	modalInputStatic: {
		fontSize: 14,
		marginTop: 6,

		color: '#00000066',
	},

	modalButton: {
		marginTop: 24,
		backgroundColor: '#3D4260',

		paddingHorizontal: 24,
		paddingVertical: 8,

		borderRadius: 12,
	},

	modalButtonText: {
		fontSize: 14,
		fontWeight: 'bold',

		color: '#FFFFFF',
	},

	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: Dimensions.get('window').width * 0.8,

		paddingHorizontal: 20
	},

	modalHeadingRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',

		marginBottom: 16
	},

	modalHeading: {
		fontSize: 14,
		fontWeight: 'bold',

		color: '#3D4260',
	}
});