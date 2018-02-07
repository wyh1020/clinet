<template>
  <div>
    <table>
      <tr>
        <th>{{x}}</th>
      </tr>
      <tr v-for="(y, index) in xs" v-bind:key='index'>
        <td v-on:click="load(y)">{{y}}</td>
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
      x: {
        get() {
          let x = ''
          switch (this.$store.state.Home.toolbar) {
            case 'files':
              x = '选择CSV文件'
              break;
            case 'tables':
              x = '选择数据表'
              break;
            case 'compareTable':
              x = '对照数据表'
              break;
            default:
              x = '';
          }
          return x
        }
      },
      xs: {
        get() {
          let xs = []
          switch (this.$store.state.Home.toolbar) {
            case 'files':
              xs = this.$store.state.System.files
              break;
            case 'tables':
              xs = this.$store.state.System.tables
              break;
            case 'compareTable':
              if (this.$store.state.System.file && this.$store.state.System.file[0]) {
                xs = this.$store.state.System.file[0].split(',')
              } else {
                this.$store.commit('SET_NOTICE', '请先选择CSV文件，然后再做对照！');
              }
              break;
            default:
              xs = [];
          }
          return xs
        }
      }
    },
    methods: {
      load: function (x) {
        switch (this.$store.state.Home.toolbar) {
          case 'files':
            if (x.endsWith('.csv')) {
              const file = path.format({
                dir: 'C:\\hitbdata\\',
                base: x
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
            break;
          case 'tables':
            this.$store.commit('GET_TABLE', global.hitbdata.table[x]);
            this.$store.commit('SET_NOTICE', '数据表读取成功！');
            break;
          default:
            break;
        }
      },
    },
  };
</script>

<style scoped>

</style>
