import * as Yup from 'yup';
import i18n from '../../config/i18n';
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
const t = i18n.t.bind(i18n);

export const validSchemaAddQuestion = Yup.object({
    question: Yup.string()
                .required(t('requiredField')),
    answer: Yup.string()
                .required(t('requiredField')),
    stack: Yup.string()
                .required(t('requiredField')),
    language: Yup.string()
                .required(t('requiredField')),
})

export const validSchemaSignIn = Yup.object({
    email: Yup.string()
                .email(t('correctFormEml'))
                .required(t('requiredField')),
    password: Yup.string()
                .required(t('requiredField')),
})

export const validSchemaCreateAccount = Yup.object({
    login: Yup.string()
                .min(3, 'At least 3 letters')
                .required(t('requiredField')),
    email: Yup.string()
                .email(t('correctFormEml'))
                .required(t('requiredField')),
    emailConfirm: Yup.string()
                     .oneOf([Yup.ref('email'), null], "Emails don't confirm")
                     .required('Please confirm email'),
    password: Yup.string()
                 .min(8, 'Min 8 characters')
                 .matches(passwordRegex, 'The password must contain letters, numbers and special characters')
                 .required(t('requiredField')),
    passwordConfirm: Yup.string()
                        .oneOf([Yup.ref('password'), null], "Passwords don't confirm")
                        .required('Please confirm password'),
    terms: Yup.boolean()
              .required(t('requiredField'))
              .oneOf([true], 'Consent is required')
})