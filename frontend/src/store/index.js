import {createStore} from "vuex";
import axiosClient from "../axios";

const tmpSurveys = [
    {
        id: 100,
        title: "A simple survey",
        slug: "a-simple-survey",
        status: "draft",
        image: "",
        description: "My name is Zura.<br>I am a wed developer with 9+ years of experience",
        created_at: "2022-10-15 18:00:00",
        updated_at: "2022-10-15 18:00:00",
        expire_at: "2022-12-31 18:00:00",
        questions: [
            {
                id: 1,
                type: "select",
                question: "From which country are you?",
                description: null,
                data: {
                    options: [
                        {
                            uuid: 'f792f593-815a-4bb5-92f5-98761b38acfe',
                            text: 'USA'
                        },
                        {
                            uuid: '25b78fd9-4e8d-46c4-9c0b-0d8a1bdb9a06',
                            text: 'UK'
                        },
                        {
                            uuid: '27980cbb-22fa-4072-9f77-0ef19b3a2b51',
                            text: 'Canada'
                        }
                    ]
                }
            },
            {
                id: 2,
                type: "checkbox",
                question: "Which language videos do you want to see",
                description: "Lorem Ipsum Dolor Sit Amet, Consecteur",
                data: {
                    options: [
                        {
                            uuid: 'f792f593-815a-4bb5-92f5-98761b38acfe',
                            text: 'Javascript'
                        },
                        {
                            uuid: '25b78fd9-4e8d-46c4-9c0b-0d8a1bdb9a06',
                            text: 'PHP'
                        },
                        {
                            uuid: '27980cbb-22fa-4072-9f77-0ef19b3a2b51',
                            text: 'HTML + CSS'
                        }
                    ]
                }
            },
            {
                id: 3,
                type: "select",
                question: "Which PHP framework videos do you want to see?",
                description: null,
                data: {
                    options: [
                        {
                            uuid: 'f792f593-815a-4bb5-92f5-98761b38acfe',
                            text: 'Laravel'
                        },
                        {
                            uuid: '25b78fd9-4e8d-46c4-9c0b-0d8a1bdb9a06',
                            text: 'Yii2'
                        },
                        {
                            uuid: '0ef19b3a2b51-22fa-4072-9f77-27980cbb',
                            text: 'Codeigniter'
                        }
                    ]
                }
            },
            {
                id: 4,
                type: "radio",
                question: "Which Laravel framework do you love most?",
                description: null,
                data: {
                    options: [
                        {
                            uuid: 'f792f593-815a-4bb5-92f5-98761b38acfe',
                            text: 'Laravel 5'
                        },
                        {
                            uuid: '25b78fd9-4e8d-46c4-9c0b-0d8a1bdb9a06',
                            text: 'Laravel 6'
                        },
                        {
                            uuid: '0ef19b3a2b51-22fa-4072-9f77-27980cbb',
                            text: 'Laravel 7'
                        }
                    ]
                }
            },
            {
                id: 5,
                type: "textfield",
                question: "What is your favorite youtube channel?",
                description: null,
                data: {}
            },
            {
                id: 6,
                type: "textarea",
                question: "What do you think about TheCodeholic channel?",
                description: "Write your honest opinion. Everything is anonymous",
                data: {}
            }
        ]
    }
];

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem('TOKEN')
        },
        surveys: [...tmpSurveys],
        questionTypes: ["text", "select", "radio", "checkbox", "textarea"]
    },
    getters: {},
    actions: {
        saveSurvey({commit}, survey) {
            delete survey.image_url
            let response
            if (survey.id) {
                response = axiosClient.put(`/survey/${survey.id}`, survey)
                    .then((res) => {
                        commit('updateSurvey', res.data)
                        return res
                })
            } else {
                response = axiosClient.post(`/survey`, survey)
                    .then((res) => {
                        commit('saveSurvey', res.data)
                        return res
                    })
            }
            return response
        },
        register({commit}, user) {
            return axiosClient.post('/register', user)
                .then(({data}) => {
                    commit('setUser', data)
                    return data
                })
        },
        login({commit}, credentials) {
            return axiosClient.post('/login', credentials)
                .then(({data}) => {
                    commit('setUser', data)
                    return data
                })
        },
        logout({commit}) {
            return axiosClient.get('/logout')
                .then(response => {
                    commit('logout')
                    return response
                })
        }
    },
    mutations: {
        saveSurvey: (state, survey) => {
            state.surveys = [...state.surveys, survey.data]
        },
        updateSurvey: (state, survey) => {
            state.surveys = state.surveys.map((s) => {
                if (s.id === survey.data.id) {
                    return survey.data
                }
                return s
            })
        },
        logout: (state) => {
            state.user.data = {};
            state.user.token = null;
            sessionStorage.removeItem('TOKEN')
        },
        setUser: (state, userData) => {
            state.user.token = userData.token
            state.user.data = userData.user
            sessionStorage.setItem('TOKEN', userData.token)
        },
    },
    modules: {}
})

export default store
