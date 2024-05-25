import React from "react";
import { View, Text, Image, Dimensions, TouchableWithoutFeedback  } from "react-native";
import Modal from "react-native-modal";
import hands from  '../../assets/hand-shake.png';
import hello from '../../assets/hello.png';

export const ModalLogin = ({isModalVisible, setIsModalVisible}) => {
    return (
      <View>
        <Modal 
          isVisible={isModalVisible}
          onSwipeComplete={() => setIsModalVisible(false)}
          swipeDirection='down'
          customBackdrop={
            <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
              <View style={{ flex: 1, backgroundColor: '#000000' }} />
            </TouchableWithoutFeedback>
          }
          style={{ justifyContent: 'flex-end', margin: 0 }}>
            <View style={{borderWidth: 2, backgroundColor: 'white', padding: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={hello}
                  style={{width: 100, height: 100}}/>
                <View style={
                {
                  position: 'absolute',
                  top: 10,
                  width: 40,
                  height: 7,
                  backgroundColor: 'gray',
                  borderRadius: 10 / 2
                }
                }/>
                <Text style={{fontSize: 16, color: 'green', fontWeight: 'bold'}}>Congratulations !</Text>
                <Text>Welcome to this wonderful world of learning!</Text>
                <Text style={{marginTop: 40, color: 'rgba(0, 0, 0, 0.3)'}}>Swipe down to hide this menu</Text>
            </View>
        </Modal>
      </View>
    );
}

export const ModalAddQuestionUnauthorized = ({isModalVisibleSignIn, setIsModalVisibleSignIn}) => {

    return (
      <View>
        <Modal 
          isVisible={isModalVisibleSignIn}
          onSwipeComplete={() => setIsModalVisibleSignIn(false)}
          swipeDirection="down"
          customBackdrop={
            <TouchableWithoutFeedback onPress={() => setIsModalVisibleSignIn(false)}>
              <View style={{ flex: 1, backgroundColor: '#000000' }} />
            </TouchableWithoutFeedback>
          }
          style={{ justifyContent: 'flex-end', margin: 0 }}>
            <View style={{borderWidth: 2, backgroundColor: 'white', padding: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={hands}
                  style={{width: 200, height: 200}}/>
                <View style={
                  {
                    position: 'absolute',
                    top: 10,
                    width: 40,
                    height: 7,
                    backgroundColor: 'gray',
                    borderRadius: 10 / 2
                  }
                }/>
                <Text style={{fontSize: 26, color: 'black', fontWeight: 'bold', textAlign: 'center'}}>Please sign in to post your own question.</Text>
                <Text style={{marginTop: 40, color: 'rgba(0, 0, 0, 0.3)'}}>Swipe down to hide this menu</Text>
            </View>
        </Modal>
      </View>
    );
}

export const ModalQuestionAdded= ({isModalVisibleAdded, setIsModalVisibleAdded}) => {

    return (
      <View>
        <Modal 
          isVisible={isModalVisibleAdded}
          onSwipeComplete={() => setIsModalVisibleAdded(false)}
          swipeDirection="down"
          customBackdrop={
            <TouchableWithoutFeedback onPress={() => setIsModalVisibleAdded(false)}>
              <View style={{ flex: 1, backgroundColor: '#000000' }} />
            </TouchableWithoutFeedback>
          }
          style={{ justifyContent: 'flex-end', margin: 0 }}>
            <View style={{borderWidth: 2, backgroundColor: 'white', padding: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={hands}
                  style={{width: 200, height: 200}}/>
                <View style={
                  {
                    position: 'absolute',
                    top: 10,
                    width: 40,
                    height: 7,
                    backgroundColor: 'gray',
                    borderRadius: 10 / 2
                  }
                }/>
                <Text style={{fontSize: 26, color: 'black', fontWeight: 'bold', textAlign: 'center'}}>Your question has been successfully submitted.</Text>
                <Text style={{marginTop: 40, color: 'rgba(0, 0, 0, 0.3)'}}>Swipe down to hide this menu</Text>
            </View>
        </Modal>
      </View>
    );
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const ModalExample = ({isModalVisibleExample, setIsModalVisibleExample, src}) => {
  return (
    <View>
        <Modal
          isVisible={isModalVisibleExample}
          onSwipeComplete={() => setIsModalVisibleExample(false)}
          swipeDirection='down'
          animationIn='bounceInUp'
          animationInTiming={1000}
          customBackdrop={
            <TouchableWithoutFeedback onPress={() => setIsModalVisibleExample(false)}>
              <View style={{ flex: 1, backgroundColor: '#000000' }} />
            </TouchableWithoutFeedback>
          }
          propagateSwipe={true}
          backdropTransitionInTiming={500}
          animationOutTiming={10}
          animationOut='bounceOutRight'
          backdropOpacity={0.91}
          style={{ justifyContent: 'flex-end', margin: 0 }}>
            <View style={{ backgroundColor: 'transparent', padding: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={{ uri: `https://code-directory.com/${src}` }}
                  style={{ width: screenWidth, height: screenHeight }}
                  resizeMode="contain"
                  />
            </View>
        </Modal>
    </View>
  );
  
}

export const ModalIncorrect = ({isModalIncorrect, setIsModalIncorrect}) => {
  return (
    <View>
        <Modal 
          isVisible={isModalIncorrect}
          onSwipeComplete={() => setIsModalIncorrect(false)}
          swipeDirection="down"
          customBackdrop={
            <TouchableWithoutFeedback onPress={() => setIsModalIncorrect(false)}>
              <View style={{ flex: 1, backgroundColor: '#000000' }} />
            </TouchableWithoutFeedback>
          }
          style={{ justifyContent: 'center', margin: 30 }}>
            <View style={{ backgroundColor: '#fffefe', padding: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold', textAlign: 'center'}}>Incorrect password!</Text>
                <Text style={{fontSize: 16, color: 'black', textAlign: 'center', marginTop: 10}}>Please check your password and try again</Text>
                <Text style={{marginTop: 20, color: 'rgba(0, 0, 0, 0.3)'}}>Swipe down to hide this menu</Text>
            </View>
        </Modal>
    </View>
  ); 
}

export const ModalNoEmail = ({isModalNoEmail, setIsModalNoEmail}) => {
  return (
    <View>
        <Modal 
          isVisible={isModalNoEmail}
          onSwipeComplete={() => setIsModalNoEmail(false)}
          swipeDirection='down'
          customBackdrop={
            <TouchableWithoutFeedback onPress={() => setIsModalNoEmail(false)}>
              <View style={{ flex: 1, backgroundColor: '#000000' }} />
            </TouchableWithoutFeedback>
          }
          style={{ justifyContent: 'center', margin: 30 }}>
            <View style={{ backgroundColor: '#41555c', padding: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>

                <Text style={{fontSize: 20, color: '#ffffff', fontWeight: 'bold', textAlign: 'center'}}>There are no users with this email address.</Text>
                <Text style={{marginTop: 20, color: 'rgba(0, 0, 0, 0.3)'}}>Swipe down to hide this menu</Text>
            </View>
        </Modal>
    </View>
  ); 
}

export const ModalEmailExists = ({isModalExists, setIsModalExists}) => {
  return (
    <View>
        <Modal 
          isVisible={isModalExists}
          onSwipeComplete={() => setIsModalExists(false)}
          swipeDirection="down"
          customBackdrop={
            <TouchableWithoutFeedback onPress={() => setIsModalExists(false)}>
              <View style={{ flex: 1, backgroundColor: '#000000' }} />
            </TouchableWithoutFeedback>
          }
          style={{ justifyContent: 'flex-end', margin: 0 }}>
            <View style={{ backgroundColor: '#e4d71e', padding: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                <View style={
                  {
                    position: 'absolute',
                    top: 10,
                    width: 40,
                    height: 7,
                    backgroundColor: 'gray',
                    borderRadius: 10 / 2
                  }
                }/>
                <Text style={{fontSize: 20, color: '#000000', fontWeight: 'bold', textAlign: 'center'}}>The email address you have provided is already in use.</Text>
                <Text style={{marginTop: 20, color: 'rgba(0, 0, 0, 0.3)'}}>Swipe down to hide this menu</Text>
            </View>
        </Modal>
    </View>
  ); 
}
export const ModalError = ({isError, setIsError}) => {
  return (
    <View>
        <Modal 
          isVisible={isError}
          onSwipeComplete={() => setIsError(false)}
          swipeDirection="down"
          customBackdrop={
            <TouchableWithoutFeedback onPress={() => setIsError(false)}>
              <View style={{ flex: 1, backgroundColor: '#000000' }} />
            </TouchableWithoutFeedback>
          }
          style={{ justifyContent: 'flex-end', margin: 0 }}>
            <View style={{ backgroundColor: '#e4d71e', padding: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                <View style={
                  {
                    position: 'absolute',
                    top: 10,
                    width: 40,
                    height: 7,
                    backgroundColor: 'gray',
                    borderRadius: 10 / 2
                  }
                }/>
                <Text style={{fontSize: 20, color: '#000000', fontWeight: 'bold', textAlign: 'center'}}>Error, please try again later.</Text>
                <Text style={{marginTop: 20, color: 'rgba(0, 0, 0, 0.3)'}}>Swipe down to hide this menu</Text>
            </View>
        </Modal>
    </View>
  ); 
}

