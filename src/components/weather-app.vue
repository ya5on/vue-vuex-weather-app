<template>
  <div class="weather-container">
    <div v-if="this.hour >= new Date(weather.sys.sunrise*1000).toLocaleTimeString([],{hour: '2-digit'}) && this.hour <= new Date(weather.sys.sunset*1000).toLocaleTimeString([],{hour: '2-digit'})">
      <div class="bg" :style="{'background-image': 'url(' + require('../assets/img/clear.jpg') + ')'}" v-if="weather.weather[0].id === 800"></div>
      <div class="bg" :style="{'background-image': 'url(' + require('../assets/img/thunderstorm.jpg') + ')'}" v-else-if="weather.weather[0].id >= 200 && weather.weather[0].id <= 299"></div>
      <div class="bg" :style="{'background-image': 'url(' + require('../assets/img/drizzle.jpg') + ')'}" v-else-if="weather.weather[0].id >= 300 && weather.weather[0].id <= 399"></div>
      <div class="bg" :style="{'background-image': 'url(' + require('../assets/img/rain.jpg') + ')'}" v-else-if="weather.weather[0].id >= 500 && weather.weather[0].id <= 599"></div>
      <div class="bg" :style="{'background-image': 'url(' + require('../assets/img/snow.jpg') + ')'}" v-else-if="weather.weather[0].id >= 600 && weather.weather[0].id <= 699"></div>
      <div class="bg" :style="{'background-image': 'url(' + require('../assets/img/fog.jpg') + ')'}" v-else-if="weather.weather[0].id >= 700 && weather.weather[0].id <= 799"></div>
      <div class="bg" :style="{'background-image': 'url(' + require('../assets/img/clouds.jpg') + ')'}" v-else-if="weather.weather[0].id >= 801 && weather.weather[0].id <= 810"></div>
    </div>
    <div v-else>
      <div class="bg" :style="{'background-image': 'url(' + require('../assets/img/n-clear.jpg') + ')'}" v-if="weather.weather[0].id === 800"></div>
      <div class="bg" :style="{'background-image': 'url(' + require('../assets/img/n-thunderstorm.jpg') + ')'}" v-else-if="weather.weather[0].id >= 200 && weather.weather[0].id <= 299"></div>
      <div class="bg" :style="{'background-image': 'url(' + require('../assets/img/n-drizzle.jpg') + ')'}" v-else-if="weather.weather[0].id >= 300 && weather.weather[0].id <= 399"></div>
      <div class="bg" :style="{'background-image': 'url(' + require('../assets/img/n-rain.jpg') + ')'}" v-else-if="weather.weather[0].id >= 500 && weather.weather[0].id <= 599"></div>
      <div class="bg" :style="{'background-image': 'url(' + require('../assets/img/n-snow.jpg') + ')'}" v-else-if="weather.weather[0].id >= 600 && weather.weather[0].id <= 699"></div>
      <div class="bg" :style="{'background-image': 'url(' + require('../assets/img/n-fog.jpg') + ')'}" v-else-if="weather.weather[0].id >= 700 && weather.weather[0].id <= 799"></div>
      <div class="bg" :style="{'background-image': 'url(' + require('../assets/img/n-clouds.jpg') + ')'}" v-else-if="weather.weather[0].id >= 801 && weather.weather[0].id <= 810"></div>
    </div>
    <div class="weather-wrap">
      <div class="btn-box">
        <button class="btn" @click="addClass"></button>
      </div>
      <div class="sidebar" :class="{ active: isActive }">
        <div class="sidebar__search" v-if="weather.main">
          <input
            type="text"
            placeholder="Search..."
            class="search-bar"
            v-model="query"
          />
          <button class="button"><i class="fa fa-search" @click="getSearchResults(query)"></i></button>
        </div>
        <div class="sidebar__deatails">
          <div class="title">Weather Details</div>
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
            <div class="value">{{this.sunrise}}</div>
          </div>
          <div class="w-box">
            <div class="key">Sunset</div>
            <div class="value">{{this.sunset}}</div>
          </div>
          <div class="w-box">
            <div class="key">Visibility</div>
            <div class="value">{{weather.visibility}}</div>
          </div>
          <button class="btn-close" @click="removeClass">&#9932;</button>
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
      weather_icon: "https://openweathermap.org/img/wn/",
      query: '',
      hour: '',
      isActive: false,
      sunrise: '',
      sunset: ''
    };
  },
  computed: {
    weather(){
      return this.$store.getters.WEATHER
    },
  },
  methods: {
    ...mapActions(['getSearchResults']),
    addClass() {
      this.isActive = !this.isActive
    },
    removeClass() {
      this.isActive = false
    },
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
      let hours = d.getHours();
      this.hour = hours < 10 ? "0" + hours : hours;
      // let minutes = d.getMinutes();
      // let minute = minutes < 10 ? "0" + minutes : minutes;
      let month = months[d.getMonth()];
      let day = days[d.getDay()];
      let date = d.getDate();
      let year = d.getFullYear() % 100;
      this.sunrise = new Date(this.weather.sys.sunrise*1000).toLocaleTimeString().slice(0,5);
      this.sunset = new Date(this.weather.sys.sunset*1000).toLocaleTimeString().slice(0,5);
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
  position: fixed
  top: 0
  right: 0
  background: rgba(255, 255, 255, .3)
  backdrop-filter: blur(10px)
  height: 100%
  width: 500px
  color: #ff7272
  transition: all .5s ease-in-out
  +lg(width, 320px)
  +lg(right, -320px)
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
    color: #ff7272
    +lg(width, 60%)
  .button
    width: 80px
    height: 80px
    background-color: #5fb8b8
    border: none
    outline: none
    cursor: pointer
    i
      font-size: 25px
  &__deatails
    margin-top: 100px
    margin-left: 30px
    margin-right: 30px
    color: #551A8B
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
        color: #551A8B
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
  .btn-box
    position: absolute
    top: 15px
    right: 20px
    width: 50px
    height: 50px
    justify-content: center
    align-items: center
    display: none
    +lg(display, flex)
.btn
  position: relative
  font-size: 16px
  background-color: #5fb8b8
  border: none
  cursor: pointer
  width: 40px
  height: 2px
  &:before,
  &:after
    content: ''
    position: absolute
    width: 40px
    height: 2px
    background-color: #5fb8b8
  &:before
    top: 10px
    left: 0
  &:after
    bottom: 10px
    left: 0
.btn-close
  font-size: 16px
  color: #5fb8b8
  bottom: 30px
  right: 50%
  transform: translateX(50%)
  position: absolute
  z-index: 10
  width: 50px
  height: 50px
  justify-content: center
  align-items: center
  border-radius: 50%
  border: 2px solid #5fb8b8
  background-color: transparent!important
  display: none
  +lg(display, block)
.weather-info
  display: flex
  justify-content: center
  align-items: flex-end
  width: 100%
  max-width: 900px
  color: #fff
  +sm(flex-direction, column)
  +sm(align-items, center)
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
  .icon
    margin: 0 auto
  .weather
    font-size: 18px
    text-transform: capitalize

.active
  right: 0
</style>
