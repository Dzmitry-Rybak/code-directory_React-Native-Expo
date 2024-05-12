import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';
import { questionSelected, questionSelectedId, filteredQuestion } from '../../redux/actions';

import { IRootState } from '../../interfaces/Questions';
import styles from './DrawerContentStyles';
 



interface DrawerContentPoprs extends DrawerContentComponentProps {}

const DrawerContent: React.FC<DrawerContentPoprs> = ( { navigation }) => {

    const {questions} = useSelector((state:IRootState) => state.questionsReducer);
    const {filter, repeatQuestion, memorizedQuestions} = useSelector((state) => state.filterReducer);
    
    const dispatch = useDispatch();

    const filterSelected = (filt) => {
        dispatch(filteredQuestion(filt));
    }

    const filterQuestions = (items, filter) => {
        if(repeatQuestion.length === 0 && filter === 'repeat') {
            console.log('NO QUESTIONS TO REPEAT YET');
        }
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
    

    const renderItem = ({ item }) => (
        <TouchableOpacity 
            onPress={() => {
                    dispatch(questionSelectedId(item.question_id));
                    navigation.closeDrawer();
                }}>
            <Text style={{marginTop: 15, fontSize: 17, fontWeight: 'bold'}}>{item.question_id}. {item.question}</Text>
        </TouchableOpacity>
    );

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
            <FlatList
                data={filterQuestions(questions, filter)}
                renderItem={renderItem}
                keyExtractor={item => item.question_id}
            />
        </View>
    );
};

export default DrawerContent;
