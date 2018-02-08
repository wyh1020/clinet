<template>
  <div>
    <right-bar></right-bar>
    <table>
      <tr v-for="(data, index) in xs" v-bind:key='index' v-on:click="onClick(data, index)" v-bind:class="{'table-danger':flag == index}">
        <td v-for="(field, index) in data" v-bind:key='index'>{{data[index]}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import RightBar from './RightBar';
  export default {
    components: { RightBar },
    data() {
      return {
        flag: null
      };
    },
    computed: {
      xs: {
        get() {
          const f = []
          let fileLen = this.$store.state.Library.file.length;
          console.log(fileLen)
          if (fileLen > 99) { fileLen = 99 }
          for (let i = 0; i < fileLen; i += 1) {
            f.push(this.$store.state.Library.file[i].split(','))
          }
          return f
        }
      }
    },
    methods: {
      onClick: function (data, index) {
        this.flag = index
        // console.log(this.$store.state.System.table[n])
        this.$store.commit('GET_FIELD', data);
        this.$store.commit('GET_FIELD_INDEX', index);
      },
    },
  };
</script>

<style scoped>

</style>
