<template>
  <div>
    <table>
      <tr>
        <th>本地数据表</th>
        <th>数据操作</th>
      </tr>
      <tr v-for="(path, index) in paths" v-bind:key='index'>
        <td>{{path}}</td>
        <td v-on:click="load(path)">
          <button>读取数据</button>
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
        if (path1.endsWith('.csv')) {
          const file = path.format({
            dir: 'C:\\hitbdata\\',
            base: path1
          });
          fs.lstat(file, (err, stat) => {
            if (stat.isDirectory()) {
              this.$store.commit('SET_NOTICE', '目录不能导入，请选择文件！');
            } else if (stat.size < 1000 * 5000) {
              this.$store.commit('SET_NOTICE', '正在读取文件，请等待！');
              const fRead = fs.createReadStream(file);
              const fReadline = readline.createInterface({ input: fRead });
              const f = [];
              fReadline.on('close', () => {
                // console.log(f);
                this.$store.commit('GET_FILE', f);
                this.$store.commit('SET_NOTICE', 'CSV文件读取成功！');
              });
              fReadline.on('line', (line) => {
                f.push(line)
              })
            } else {
              this.$store.commit('SET_NOTICE', '文件大于5M，无法导入，请拆成小文件！');
            }
          })
        } else {
          this.$store.commit('SET_NOTICE', '选择的不是CSV文件，不能导入！');
        }
      },
    },
  };
</script>

<style scoped>

</style>
