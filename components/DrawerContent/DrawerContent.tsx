import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';
import { questionSelectedId, filteredQuestion } from '../../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IRootState } from '../../interfaces/Questions';
import { getTextDecoration, getColor } from './dynamicStyles';
import styles from './DrawerContentStyles';
 
import { useTranslation } from 'react-i18next';

interface DrawerContentPoprs extends DrawerContentComponentProps {}

const DrawerContent: React.FC<DrawerContentPoprs> = ( { navigation }) => {
    const [filteredQuestions, setFilteredQuestions] = React.useState([]);
    const {questions, selectedId} = useSelector((state:IRootState) => state.questionsReducer);
    const {filter, repeatQuestion, memorizedQuestions} = useSelector((state) => state.filterReducer);
    
    const dispatch = useDispatch();
    const { t } = useTranslation();

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
                    await AsyncStorage.setItem('selectedId', `${item.row_num}`);
                    navigation.closeDrawer();
                }}>
            <Text style={{
                marginTop: 10, 
                fontSize: 17, 
                fontWeight: 'bold', 
                color: getColor(item.question_id, repeatQuestion, memorizedQuestions),
                textDecorationLine: getTextDecoration(item.row_num, selectedId)}}>{item.row_num}. {item.question}</Text>
        </TouchableOpacity>
    )};

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#6a8c94', position: 'relative' }}>
            <View style={{padding: 15, flex: 1}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15}}>
                    <View>
                        <TouchableOpacity style={styles.filterBtn} onPress={() => filterSelected('remaining')}>
                            <Text style={styles.filterText}>{t('remaining')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.filterBtn} onPress={() => filterSelected('repeat')}>
                            <Text style={styles.filterText}>{t('questionsToRepeat')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.filterBtn} onPress={() => filterSelected('all')}>
                            <Text style={styles.filterText}>{t('allQuestions')}</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
                {filteredQuestions.length > 0 ? (
                    <FlatList data={filteredQuestions} renderItem={renderItem} keyExtractor={(item) => item.question_id} />
                ) : (
                    <Text style={{fontSize: 20, fontWeight: 'bold', alignSelf: 'center'}}>{t('empty')}</Text>
                )}
            </View>
        </SafeAreaView>
        
    );
};

export default DrawerContent;
