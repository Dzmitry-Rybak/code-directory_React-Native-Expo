import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export const Loading: React.FC = () => {
    return (
      <LinearGradient
        colors={['rgba(50,82,97,1)', 'rgba(61,76,68,1)']} 
            style={{ flex: 1 }}
        >
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large"/> 
          <Text style={{marginTop: 10, fontSize: 18, color: 'white'}}>Loading...</Text>
        </View>
        </LinearGradient>
      )
}

export const LoadingAnswer = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: 400}}>
      <ActivityIndicator size="large" color="#78b096" />
      <Text style={{marginTop: 10, fontSize: 18, color: '#78b096'}}>Loading...</Text>
    </View>
  )
}