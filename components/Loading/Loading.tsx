import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

export const LoadingAnswer = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: 400}}>
      <ActivityIndicator size="large" color="#78b096" />
      <Text style={{marginTop: 10, fontSize: 18, color: '#78b096'}}>Loading...</Text>
    </View>
  )
}

export const LoadingHomeContent = () => {
  return (
    <View style={{paddingHorizontal: 15, paddingVertical: 15}}>
      <View style={{flexDirection: 'row', marginBottom: 15, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{width: 100, height: 100, backgroundColor: 'red'}}/>
          <View style={{width: 50, height: 50, backgroundColor: 'blue'}}/>
      </View>
      <View style={{alignItems: 'center'}}>
        <View style={{width: 50, height: 50, backgroundColor: 'green'}}/>
      </View>
  </View>
  )
}