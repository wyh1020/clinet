<template>
  <div>
    <form>
      <div class="row">
        <div class="col-md-4" v-for="(value, index) in this.$store.state.System.targetDimension" v-bind:key="index">
          <div class="custom-control custom-checkbox mr-sm-2">
            <input type="checkbox" class="custom-control-input" :id = "value"
            v-on:click="getStat('dimension', value)" v-if="checkbox.dimension.includes(value)" checked ="true"/>
            <input type="checkbox" class="custom-control-input" :id = "value"
            v-on:click="getStat('dimension', value)" v-else/>
            <label class="custom-control-label" :for="value">{{value}}</label>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    checkbox: {
      get() {
        return this.$store.state.System.serverStat
      }
    }
  },
  methods: {
    getStat: function (value, value1) {
      const values = [value, value1]
      this.$store.commit('SYSTEM_GET_SERVER_STAT', values);
    }
  }
}
</script>
