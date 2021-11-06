<template>
  <div class="weather-container">
    <div class="bg" v-if="weather.weather[0].id === 800">clear</div>
    <div class="bg" v-else-if="weather.weather[0].id >= 200 && weather.weather[0].id <= 299">thunder</div>
    <div class="bg" v-else-if="weather.weather[0].id >= 300 && weather.weather[0].id <= 399">drizzle</div>
    <div class="bg" v-else-if="weather.weather[0].id >= 500 && weather.weather[0].id <= 599">rain</div>
    <div class="bg" v-else-if="weather.weather[0].id >= 600 && weather.weather[0].id <= 699">Snow</div>
    <div class="bg" v-else-if="weather.weather[0].id >= 700 && weather.weather[0].id <= 799">Fog</div>
    <div class="bg" v-else-if="weather.weather[0].id >= 801 && weather.weather[0].id <= 810">Clouds</div>
    <div class="weather-wrap">
      <div class="sidebar">
        <div class="sidebar__search" v-if="weather.main">
          <input
            type="text"
            placeholder="Search..."
            class="search-bar"
            v-model="query"
          />
          <button><i class="fa fa-search" @click="getSearchResults(query)"></i></button>
        </div>
        <div class="sidebar__deatails">
          <div class="title">Weather Details</div>
          {{ weather.weather[0].id }}
          <div class="w-box">
            <div class="key">Cloudy</div>
            <div class="value">{{weather.clouds.all}}%</div>
          </div>
          <div class="w-box">
            <div class="key">Wind</div>
            <div class="value">{{(weather.wind.speed/3.6).toFixed(2)}}m/s</div>
          </div>
          <div class="w-box">
            <div class="key">Humidity</div>
            <div class="value">{{weather.main.humidity}}%</div>
          </div>
          <div class="w-box">
            <div class="key">Sunrise</div>
            <div class="value">{{new Date(weather.sys.sunrise*1000).toLocaleTimeString("en-GB").slice(0,5)}}</div>
          </div>
          <div class="w-box">
            <div class="key">Sunset</div>
            <div class="value">{{new Date(weather.sys.sunset*1000).toLocaleTimeString("en-GB").slice(0,5)}}</div>
          </div>
          <div class="w-box">
            <div class="key">Visibility</div>
            <div class="value">{{weather.visibility}}</div>
          </div>
        </div>
      </div>
      <div class="weather-info" v-if="weather.main">
        <div class="weather-box">
          <div class="temp">{{ Math.round(weather.main.temp) }}°</div>
        </div>

        <div class="location-box">
          <div class="location">
            {{ weather.name }}
          </div>
          <div class="date">{{ todaysDate() }}</div>
        </div>

        <div class="weather-details">
          <div class="icon">
            <img
              :src="`${weather_icon}${weather.weather[0].icon}${'@2x.png'}`"
            />
          </div>
          <div class="weather">{{ weather.weather[0].description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapActions} from "vuex";

export default {
  name: "weatherApp",
  data() {
    return {
      weather_icon: "http://openweathermap.org/img/wn/",
      query: '',
      error: true
    };
  },
  mounted() {},
  computed: {
    weather(){
      return this.$store.getters.WEATHER
    },
  },
  methods: {
    ...mapActions(['getSearchResults']),
    todaysDate() {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let d = new Date();
      // let hours = d.getHours();
      // let hour = hours < 10 ? "0" + hours : hours;
      // let minutes = d.getMinutes();
      // let minute = minutes < 10 ? "0" + minutes : minutes;
      let month = months[d.getMonth()];
      let day = days[d.getDay()];
      let date = d.getDate();
      let year = d.getFullYear() % 100;
      return `${day}, ${date} ${month} '${year}`;
    },
  },
};
</script>

<style lang="sass">
.bg
  position: absolute
  width: 100%
  height: 100vh
  z-index: -1
  background-repeat: no-repeat
  background-size: cover

.sidebar
  position: absolute
  top: 0
  right: 0
  background: rgba(255, 255, 255, .2)
  backdrop-filter: blur(10px)
  height: 100%
  width: 500px
  color: #7E8585
  &__search
    width: 100%
    display: flex
    justify-content: space-between
  .search-bar
    display: block
    width: 70%
    margin: 0 auto 0 30px
    font-size: 20px
    appearance: none
    background: none
    border: none
    border-bottom: 1px solid #829F9A
    outline: none
    transition: 0.4s
    cursor: pointer
    color: #fff
  button
    width: 80px
    height: 80px
    background-color: #829F9A
    border: none
    outline: none
    cursor: pointer
    i
      font-size: 25px
  &__deatails
    margin-top: 100px
    margin-left: 30px
    margin-right: 30px
    color: #fff
    display: flex
    flex-direction: column
    .title
      font-size: 20px
      margin-bottom: 30px

    .w-box
      display: flex
      justify-content: space-between  
      margin-right: 30px
      margin-bottom: 20px
      .key
        color: #829F9A
.weather-container
  background-color: transparent
  transition: 0.4s
  width: 100%
  height: 100vh
  position: relative
.weather-wrap
  width: 100%
  height: 100vh
  display: flex
  justify-content: flex-start
  align-items: center
.weather-info
  display: flex
  justify-content: center
  align-items: flex-end
  width: 100%
  max-width: 900px
  color: #fff
.weather-box
  text-align: center
  display: flex
  align-items: flex-end
  .temp
    font-size: 140px
    line-height: 100px
.location-box
  display: flex
  flex-direction: column
  justify-content: center
  margin: 0 20px 0 0
  .location
    font-size: 32px
    font-weight: 500
    text-align: center
    margin-top: 30px
  .date
    font-size: 20px
    font-weight: 300
    text-align: center
.weather-details
  display: flex
  flex-direction: column
  justify-content: center
  text-align: center
  .weather
    font-size: 18px
    text-transform: capitalize
</style>
