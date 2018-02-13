<template>
  <div>
    <table>
      <tr v-for="(line, index) in file" v-bind:key='index' v-on:click="onClick(line, index)">
        <td v-for="(data, index) in line" v-bind:key='index'>{{line[index]}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import s1 from '../../utils/block'
  export default {
    data() {
      return {
        flag: null
      }
    },
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
      },
    },
    methods: {
      onClick: function (data, index) {
        console.log(data)
        console.log(index)
        s1()
      },
    },
  };
</script>

<style scoped>

</style>
