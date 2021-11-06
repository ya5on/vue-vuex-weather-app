import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        address: [],
        weather: [],
        city: ''
    },
    mutations: {
        SET_ADDRESS: (state, address) => {
            state.address = address[0]
        },
        SET_WEATHER: (state, weather) => {
            state.weather = weather
        },
        SET_CITY: (state, address) => {
            state.city = address[0].components.city
        }
    },
    actions: {
        GET_ADDRESS({commit, dispatch}) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const {coords} = position;
                const address = await axios.get(
                    `https://api.opencagedata.com/geocode/v1/json`,
                    {
                        params: {
                            q: `${coords.latitude}+${coords.longitude}`,
                            roadinfo: 1,
                            key: "5032de2d86224227b1d1fbe1b02f6bf7"
                        }
                    }
                );
                commit("SET_ADDRESS", address.data.results)
                commit("SET_CITY", address.data.results)
                dispatch('GET_WEATHER')
            });
        },
        async GET_WEATHER({commit, state}) {
            const weather = await axios.get(
                "http://api.openweathermap.org/data/2.5/weather",
                {
                    params: {
                        q: `${state.city}`,
                        units: 'metric',
                        lang: 'ru',
                        appid: "27bcc252742830381afd6856832da01a",
                    }
                }
            );
            commit('SET_WEATHER', weather.data)
        },
        async getSearchResults({commit}, query) {
            const weather = await axios.get(
                "http://api.openweathermap.org/data/2.5/weather",{
                    params: {
                        q: `${query}`,
                        units: 'metric',
                        lang: 'ru',
                        appid: "27bcc252742830381afd6856832da01a",
                    }
                }
            ).catch(error => {
                    console.log(error);
                    alert('no results')
                })
            commit('SET_WEATHER', weather.data)
        },
    },
    getters: {
        ADDRESS: state => state.address,
        WEATHER: state => state.weather
    }
})
