import { View, Text, Image } from "react-native";
import Modal from "react-native-modal";
import hands from  '../../assets/hand-shake.png';
import hello from '../../assets/hello.png';

export const ModalLogin = ({isModalVisible, setIsModalVisible}) => {
    return (
      <View>
        <Modal 
          isVisible={isModalVisible}
          swipeDirection="down"
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
                <Text>Welcome to this amazing world of learning.</Text>
                <Text style={{marginTop: 40, color: 'rgba(0, 0, 0, 0.3)'}}>Swipe down to hide this menu</Text>
            </View>
        </Modal>
      </View>
    );
}

export const ModalAddQuestion = ({isModalVisibleSignIn, setIsModalVisibleSignIn}) => {

    return (
      <View>
        <Modal 
          isVisible={isModalVisibleSignIn}
          onSwipeComplete={() => setIsModalVisibleSignIn(false)}
          swipeDirection="down"
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