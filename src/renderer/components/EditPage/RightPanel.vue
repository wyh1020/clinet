<template>
  <div>
    <right-bar></right-bar>
    <table>
      <tr>
        <th class="table-danger"> 用户编辑文件</th>
      </tr>
      <tr v-for="(data, index) in xs" v-bind:key='index' v-on:click="loadFile(data)">
        <td>{{data}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import RightBar from './RightBar';
  const fs = require('fs')
  const path = require('path');
  const readline = require('readline');
  
  export default {
    components: { RightBar },
    data() {
      return {
        name: this.$route.name
      };
    },
    computed: {
      xs: {
        get() {
          return this.$store.state.Edit.files
        }
      }
    },
    methods: {
      loadFile: function (x) {
        if (x.endsWith('.csv')) {
          const file = path.format({
            dir: 'C:\\hitbdata\\user',
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
                this.$store.commit('EDIT_LOAD_FILE', f);
                this.$store.commit('EDIT_SET_LEFTPANEL', 'table')
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
