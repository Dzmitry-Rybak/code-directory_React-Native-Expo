import React from "react";
import { Text, TouchableOpacity, View, Linking } from "react-native";
import {styles} from "./DashboardStyles";
import config from "../../config/config";
import { useDispatch } from "react-redux";
import { isLoggedIn } from "../../redux/actions";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { signOut, deleteAccount } from "../../service/fetches";

const Dashboard: React.FC = () => {
    const dispatch = useDispatch();

    const hangleMailPressed = () => {
        Linking.openURL(`mailto:${config.socialLinks.email}`)
    }

    const hangleWebPress = () => {
        Linking.openURL(`http://code-directory.com/`)
    }

    const handleSignout = async () => {
        await AsyncStorage.multiRemove(['login', 'token'])
        signOut();
        dispatch(isLoggedIn(false));
    }

    const handleDelete = async () => {
        await deleteAccount();
        await AsyncStorage.multiRemove(['login', 'token'])
        dispatch(isLoggedIn(false));
    }

    return (
        <View style={styles.conatiner}>
            <View style={styles.wrapper}>
                <Text style={{fontSize: 28, fontWeight: 'bold', marginBottom: 15, textAlign: 'center', fontFamily: 'Kanit-Bold'}}>Hello 👋</Text>
                <Text style={{textAlign: 'justify', marginBottom: 10, fontSize: 17, fontFamily: 'Kanit-Regular'}}>Code-directory is a free online platform that provides questions on popular programming languages. You can study, mark, add questions and create your own learning experience.🧠</Text>
                <View   style={{borderWidth: 1, padding: 10, borderRadius: 15, backgroundColor: '#bdbdf5' }}>
                    <Text style={{fontSize: 18, fontFamily: 'Kanit-Regular'}}>You can also continue your studies on our web platform:</Text>
                    <TouchableOpacity onPress={hangleWebPress}>
                        <Text style={{textDecorationLine: 'underline', textAlign: 'center', marginTop: 10, fontSize: 18, fontFamily: 'Kanit-Bold'}}>Code-directory.com</Text>
                    </TouchableOpacity>
                </View>
                <View   style={{borderWidth: 1, padding: 10, borderRadius: 15, marginTop: 20, backgroundColor: '#72aefd' }}>
                    <Text style={{fontSize: 18, fontFamily: 'Kanit-Regular'}}>You can contact us for more information:</Text>
                    <TouchableOpacity onPress={hangleMailPressed}>
                        <Text style={{textDecorationLine: 'underline', textAlign: 'center', marginTop: 10, fontSize: 18, fontFamily: 'Kanit-Bold'}}>CodeDirectoryApp@gmail.com</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnWrapper}>
                    <TouchableOpacity style={styles.btn} onPress={handleDelete}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>Delete Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={handleSignout}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Dashboard;