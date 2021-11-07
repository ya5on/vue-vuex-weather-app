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

</style>
