import React from "react";
import { View, Text, Image, Dimensions, TouchableWithoutFeedback  } from "react-native";
import Modal from "react-native-modal";
import hands from  '../../assets/hand-shake.png';
import hello from '../../assets/hello.png';
import goodIcon from '../../assets/goodIcon.png'

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
                  style={{width: 70, height: 70}}/>
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
                <Text style={{marginTop: 20, color: 'rgba(0, 0, 0, 0.3)'}}>GET STARTED</Text>
                <Text style={{fontSize: 24, color: '#269251', fontWeight: 'bold', paddingBottom: 20}}>Welcome to the app</Text>
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
            <View style={{ flex: 1, backgroundColor: 'transparent', padding: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={{ uri: `https://code-directory.com/${src}` }}
                  style={{ width: screenWidth, height: screenHeight }}
                  resizeMode="contain"
                  />
                <TouchableWithoutFeedback  onPress={() => setIsModalVisibleExample(false)}>
                  <Text
                  style={{
                    position: 'absolute',
                    bottom: 100,
                    left: '50%',
                    color: '#c57676',
                    padding: 5,
                    borderWidth: 2,
                    borderColor: '#b56c6c'
                  }}>Close example</Text>
                </TouchableWithoutFeedback>
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
            <TouchableWithoutFeedback>
              <View style={{ flex: 1, backgroundColor: '#000000' }} />
            </TouchableWithoutFeedback>
          }
          style={{ justifyContent: 'flex-end', margin: 0 }}>
            <View style={{ backgroundColor: '#e4d71e', padding: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', height: 220}}>
                <Text style={{fontSize: 28, color: '#ec0909', fontWeight: 'bold', textAlign: 'center', marginBottom: 20}}>Error :(</Text>
                <Text style={{fontSize: 22, color: '#000000', fontWeight: 'bold', textAlign: 'center'}}>Please check your Internet connection and reload the app</Text>
            </View>
        </Modal>
    </View>
  ); 
}

export const ModalPleaseSignUp = ({isLoggedIn, setIsLoggedIn}) => {
  return (
    <View>
        <Modal 
          isVisible={isLoggedIn}
          onSwipeComplete={() => setIsLoggedIn(false)}
          swipeDirection="down"
          customBackdrop={
            <TouchableWithoutFeedback onPress={() => setIsLoggedIn(false)}>
              <View style={{ flex: 1, backgroundColor: '#000000' }} />
            </TouchableWithoutFeedback>
          }
          style={{ justifyContent: 'flex-end', margin: 0, }}>
            <View style={{ backgroundColor: '#e4af1e', padding: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
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
                <Text style={{fontSize: 20, color: '#000000', fontWeight: 'bold', textAlign: 'center'}}>To unlock the ability to save your progress, simply log in.</Text>
                <Text style={{marginTop: 20, color: 'rgba(0, 0, 0, 0.3)'}}>Swipe down to hide this menu</Text>
            </View>
        </Modal>
    </View>
  ); 
}



export const ModalCodeAdded = ({isModalAddedCode, setIsModalAddedCode}) => {

  return (
    <View>
      <Modal 
        isVisible={isModalAddedCode}
        onSwipeComplete={() => setIsModalAddedCode(false)}
        swipeDirection="down"
        customBackdrop={
          <TouchableWithoutFeedback onPress={() => setIsModalAddedCode(false)}>
            <View style={{ flex: 1, backgroundColor: '#000000' }} />
          </TouchableWithoutFeedback>
        }
        style={{ justifyContent: 'flex-end', margin: 0 }}>
          <View style={{borderWidth: 2, backgroundColor: 'white', padding: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={goodIcon}
                style={{width: 70, height: 70, marginBottom: 20}}/>
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
              <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold', textAlign: 'center'}}>Your code has been successfully submitted.</Text>
              <Text style={{marginTop: 40, color: 'rgba(0, 0, 0, 0.3)'}}>Swipe down to hide this menu</Text>
          </View>
      </Modal>
    </View>
  );
}