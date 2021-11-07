<template>
  <div class="location">
    <div v-if="errorStr">
      Sorry, but the following error occurred: {{ errorStr }}
    </div>

    <div v-if="gettingLocation">
      <i>Getting your location...</i>
    </div>

    <div v-if="loc">
      <div >
        <h2>Road info:</h2>
        <div>
          <span> {{ address.components.borough }}, </span>
          <span> {{ address.components.city }}, </span>
          <span v-if="address.components.suburb">
            {{ address.components.suburb }}
          </span>
        </div>
        <div>
          <div v-if="address.annotations.roadinfo.road">
            road: {{ address.annotations.roadinfo.road }}
          </div>
          <div v-if="address.annotations.roadinfo.oneway">
            oneway_road: {{ address.annotations.roadinfo.oneway }}
          </div>
          <div v-if="address.annotations.roadinfo.road_type">
            road_type: {{ address.annotations.roadinfo.road_type }}
          </div>
          <div v-if="address.annotations.roadinfo.lanes">
            lanes: {{ address.annotations.roadinfo.lanes }}
          </div>
          <div v-if="address.annotations.roadinfo.maxspeed">
            maxspeed: {{ address.annotations.roadinfo.maxspeed }}
          </div>
          <div v-if="address.annotations.roadinfo.width">
            width: {{ address.annotations.roadinfo.width }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "geo-loc",
  data() {
    return {
      loc: null,
      gettingLocation: false,
      errorStr: null,
    };
  },
  mounted() {
    this.$store.dispatch('GET_ADDRESS')

  },
  computed: {
    address(){
      return this.$store.getters.ADDRESS
    }
  },
  created() {
    //do we support geolocation
    if (!("geolocation" in navigator)) {
      this.errorStr = "Geolocation is not available.";
      return;
    }
    this.gettingLocation = true;
    // get position
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.gettingLocation = false;
        this.loc = pos.coords;
      },
      (err) => {
        this.gettingLocation = false;
        this.errorStr = err.message;
      }
    );
  },
};
</script>

<style scoped lang="sass">
.location
  position: absolute
  bottom: 5%
  left: 5%
  color: #5fb8b8
</style>
