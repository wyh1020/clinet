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
        currentTime: new Date().toLocaleString(),
        electron: process.versions['atom-shell'],
        name: this.$route.name,
        node: process.versions.node,
        path: this.$route.path,
        platform: require('os').platform(),
        vue: require('vue/package.json').version,
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
      load: function (n) {
        switch (n) {
          case 0:
            this.$router.push('/home');
            break;
          case 1:
            this.$router.push('/edit');
            break;
          case 2:
            this.$router.push('/stat');
            break;
          case 3:
            this.$router.push('/library');
            break;
          case 4:
            this.$router.push('/system');
            break;
          case 5:
            this.$router.push('/blockChain');
            break;
          default:
            this.$router.push('/');
        }
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
