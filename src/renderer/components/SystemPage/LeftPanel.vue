<template>
  <div>
    <table>
      <tr>
        <th>文件名</th>
        <th>文件操作</th>
      </tr>
      <tr v-for="(path, index) in paths" v-bind:key='index'>
        <td>{{path}}</td>
        <td v-on:click="load(path)">
          <button>读取文件</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  const fs = require('fs')
  const path = require('path');
  const readline = require('readline');
  export default {
    data() {
      return {
        name: this.$route.name
      };
    },
    computed: {
      paths: {
        get() {
          return this.$store.state.System.paths
        }
      }
    },
    methods: {
      load: function (path1) {
        console.log(path1)
        if (path1.endsWith('.csv')) {
          const file = path.format({
            dir: 'C:\\hitbdata\\',
            base: path1
          });
          fs.lstat(file, (err, stat) => {
            if (stat.isDirectory()) {
              console.log('目录不能导入，请选择文件')
            } else if (stat.size < 1000 * 5000) {
              const fRead = fs.createReadStream(file);
              const fReadline = readline.createInterface({ input: fRead });
              const f = [];
              fReadline.on('close', () => {
                // console.log(f);
                this.$store.commit('GET_FILE', f);
                console.log('readline close...');
              });
              fReadline.on('line', (line) => {
                f.push(line)
              })
            } else {
              console.log(stat.size)
              console.log('文件大于5M，无法导入，请拆成小文件')
            }
          })
        } else {
          console.log('选择的不是CSV文件，不能导入')
        }
      },
    },
  };
</script>

<style scoped>

</style>
