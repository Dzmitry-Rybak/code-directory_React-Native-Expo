import React from 'react';
import { View, Text, FlatList, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';
import { questionSelectedId, filteredQuestion } from '../../redux/actions';

import { IRootState } from '../../interfaces/Questions';
import { getTextDecoration, getColor } from './dynamicStyles';
import styles from './DrawerContentStyles';
 



interface DrawerContentPoprs extends DrawerContentComponentProps {}

const DrawerContent: React.FC<DrawerContentPoprs> = ( { navigation }) => {
    const [filteredQuestions, setFilteredQuestions] = React.useState([]);
    const {questions, selectedId, isLogged, pickedQuestion} = useSelector((state:IRootState) => state.questionsReducer);
    const {filter, repeatQuestion, memorizedQuestions} = useSelector((state) => state.filterReducer);
    
    const dispatch = useDispatch();

    const filterSelected = (filt) => {
        dispatch(filteredQuestion(filt));
    }

    const filterQuestions = (items, filter) => {
        switch (filter) {
            case 'repeat':
                return items.filter((item) => repeatQuestion.includes(item.question_id));
            case 'remaining':
                return items.filter((item) => !memorizedQuestions.includes(item.question_id));
            case 'all':
                return items
            default:
                return items
        }
    }

    React.useEffect(() => {
        setFilteredQuestions(filterQuestions(questions, filter));
    }, [questions, filter])
    
    const renderItem = ({ item }) => {
        
        return (<TouchableOpacity 
            onPress={async () => {
                    dispatch(questionSelectedId(item.row_num));
                    // await AsyncStorage.setItem('selectedId', `${item.row_num}`);
                    navigation.closeDrawer();
                }}>
            <Text style={{
                marginTop: 15, 
                fontSize: 17, 
                fontWeight: 'bold', 
                color: getColor(item.question_id, repeatQuestion, memorizedQuestions),
                textDecorationLine: getTextDecoration(item.question_id, selectedId)}}>{item.row_num}. {item.question}</Text>
        </TouchableOpacity>
    )};

    return (
        <View style={{padding: 15, flex: 1}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15}}>
                <View>
                    <TouchableOpacity style={styles.filterBtn} onPress={() => filterSelected('remaining')}>
                        <Text style={styles.filterText}>REMAINING QUESTIONS</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.filterBtn} onPress={() => filterSelected('repeat')}>
                        <Text style={styles.filterText}>QUESTIONS TO REPEAT</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.filterBtn} onPress={() => filterSelected('all')}>
                        <Text style={styles.filterText}>ALL QUESTIONS</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            {filteredQuestions.length > 0 ? (
                <FlatList data={filteredQuestions} renderItem={renderItem} keyExtractor={(item) => item.question_id} />
            ) : (
                <Text style={{fontSize: 20, fontWeight: 'bold', alignSelf: 'center'}}>Empty.. </Text>
            )}
        </View>
    );
};

export default DrawerContent;
