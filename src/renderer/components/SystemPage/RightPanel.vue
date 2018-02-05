<template>
  <div>
    <right-bar></right-bar>
    <table>
      <tr v-for="(line, index) in file" v-bind:key='index'>
        <td v-for="(filed, index) in line" v-bind:key='index'>{{line[index]}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import RightBar from './RightBar';

  export default {
    components: { RightBar },

    computed: {
      file: {
        get() {
          const f = [];
          let len = this.$store.state.System.file.length;
          if (len > 99) { len = 99 }
          for (let i = 0; i < len; i += 1) {
            f.push(this.$store.state.System.file[i].split(','))
          }
          return f
        }
      }
    },
    methods: {
      load: function (n) {
        switch (n) {
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
          default:
            this.$router.push('/edit');
        }
      },
    },
  };
</script>

<style scoped>

</style>
