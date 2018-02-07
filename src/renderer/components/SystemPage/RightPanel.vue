<template>
  <div>
    <right-bar></right-bar>
    <table>
      <tr v-for="(line, index) in file" v-bind:key='index'>
        <td v-for="(filed, index) in line" v-bind:key='index'>{{line[index]}}</td>
        <td></td>
        <td></td>
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
          let f = []
          let fileLen = this.$store.state.System.file.length;
          switch (this.$store.state.Home.toolbar) {
            case 'files':
              if (fileLen > 99) { fileLen = 99 }
              for (let i = 0; i < fileLen; i += 1) {
                f.push(this.$store.state.System.file[i].split(','))
              }
              break;
            case 'tables':
              f = this.$store.state.System.table
              break;
            case 'compareTable':
              f = this.$store.state.System.table
              break;
            default:
              break;
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
          default:
            this.$router.push('/edit');
        }
      },
    },
  };
</script>

<style scoped>

</style>
