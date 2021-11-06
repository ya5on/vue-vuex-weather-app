<template>
  <div id="app">
    <geolocation/>
    <weatherApp/>
  </div>
</template>

<script>
// @ is an alias to /src
import weatherApp from "@/components/weather-app.vue";
import geolocation from '@/components/geo-location.vue'

export default {
  components: {
    weatherApp, geolocation
  },
  data() {
    return {};
  },
};
</script>
<style lang="sass">
*
  margin: 0
  padding: 0
  box-sizing: border-box
img
  display: block
  height: auto
  max-width: 100%
#app
  font-family: Helvetica, Arial, sans-serif
  color: #2c3e50
  height: 100vh
  width: 100%
</style>
