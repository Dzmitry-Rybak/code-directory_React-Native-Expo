import React from "react";
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { Formik } from 'formik';
import RNPickerSelect from 'react-native-picker-select';
import { postQuestion } from "../../../service/fetches";
import { validSchemaAddQuestion } from "../validSchema";
import { ModalAddQuestion } from "../../Modal/Modal";

import styles from './AddQuestionStyles';

const AddQuestion: React.FC = () => {

    const [isModalVisibleSignIn, setIsModalVisibleSignIn] = React.useState(false);
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <Formik
                initialValues={{ 
                    question: '',
                    answer: '',
                    stack: '',
                    language: '',
                    }}
                validationSchema={validSchemaAddQuestion}
                onSubmit={async (values) => {
                    try {
                        const data = await postQuestion(values);
                        if (data.message === 'Questions posted successfully') {
                            values.question = '';
                            values.answer = '';
                            values.stack = '';
                            values.language = '';
                        } else if (data.message === 'Unauthorized') {
                            setIsModalVisibleSignIn(true);
                            // setTimeout(async () => {
                            //     setIsModalVisibleSignIn(false);
                            // }, 5000)
                        }
                    } catch(error) {
                        console.error('Error while submitting:', error)
                    } finally {

                    }
                }}
            >
                {({ handleChange, handleBlur, values, handleSubmit, touched, errors, isValid }) => (
                    <View style={styles.container}>
                        <View style={styles.wrapper}>
                            <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 28 }}>ADD QUESTIONS 📚</Text>
                            
                            <TextInput
                                style={styles.input}
                                value={values.question}
                                onChangeText={handleChange('question')}
                                onBlur={handleBlur('question')}
                                placeholder="type your question..." />
                            {errors.question && touched.question &&
                                <Text style={{ fontSize: 12, color: 'red', marginTop: 5 }}>{errors.question}</Text>
                            }
                            <TextInput
                                style={styles.input}
                                value={values.answer}
                                onChangeText={handleChange('answer')}
                                onBlur={handleBlur('answer')}
                                // multiline - но тогда проблемы со скрытием клавиатуры
                                placeholder="type answer..." />
                            {errors.answer && touched.answer &&
                                <Text style={{ fontSize: 12, color: 'red', marginTop: 5 }}>{errors.answer}</Text>
                            }
                            <View style={styles.picker}>
                                <RNPickerSelect
                                    onValueChange={programStack => values.stack = programStack}
                                    items={[
                                        { label: 'JavaScript', value: 'javascript' },
                                        { label: 'React', value: 'react' },
                                        { label: 'Git', value: 'git' },
                                        { label: 'Python', value: 'python' },
                                    ]} />
                            </View>
                            {errors.stack && touched.stack &&
                                <Text style={{ fontSize: 12, color: 'red', marginTop: 5 }}>{errors.stack}</Text>
                            }
                            <View style={styles.picker}>
                                <RNPickerSelect
                                    onValueChange={lang => values.language = lang}
                                    items={[
                                        { label: 'English', value: 'English' },
                                        { label: 'Russian', value: 'Russian' },
                                        { label: 'Polish', value: 'hockey' },
                                    ]} />
                            </View>
                            {errors.language && touched.language &&
                                <Text style={{ fontSize: 12, color: 'red', marginTop: 5 }}>{errors.language}</Text>
                            }
                            <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
                                <Text style={{ textAlign: 'center' }}>ADD</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
            <ModalAddQuestion isModalVisibleSignIn={isModalVisibleSignIn} setIsModalVisibleSignIn={setIsModalVisibleSignIn}/>
        </KeyboardAvoidingView>
    )
}

export default AddQuestion;
