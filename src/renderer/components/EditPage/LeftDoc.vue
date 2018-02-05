<template>
  <div>
    <div class="card">
      <div class="card-body">
        {{doc}}
        <ul id="example-1">
          <li v-for="(item, index) in doc" v-bind:key='index'>
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        name: this.$route.name
      };
    },
    computed: {
      doc: {
        get() {
          return this.$store.state.Document.doc
        },
        set(value) {
          this.$store.commit('PUSH_DOC', value)
        }
      }
    },
    methods: {
      created: function () {
        this.$nextTick(function () {
          this.timer()
        })
      },
      timer: function () {
        this.getTime = () => {
          this.currentTime = new Date().toLocaleString();
        }
        setInterval(this.getTime, 1000);
      },
    },
  };
</script>

<style scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
</style>
