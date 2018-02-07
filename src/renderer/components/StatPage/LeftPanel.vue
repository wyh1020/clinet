<template>
  <div style="height:400px; overflow-y:auto;">
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Cras justo odio</li>
      <li class="list-group-item">Dapibus ac facilisis in</li>
      <li class="list-group-item">Morbi leo risus</li>
      <li class="list-group-item">Porta ac consectetur ac</li>
      <li class="list-group-item">Vestibulum at eros</li>
      <li class="list-group-item">Cras justo odio</li>
      <li class="list-group-item">Dapibus ac facilisis in</li>
      <li class="list-group-item">Morbi leo risus</li>
      <li class="list-group-item">Porta ac consectetur ac</li>
      <li class="list-group-item">Vestibulum at eros</li>
    </ul>
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
