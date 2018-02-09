<template>
  <div>
    <div class="card">
      <div class="card-body">
        <ol class="breadcrumb">
          <li class="breadcrumb-item" v-for="(item, index) in doc" v-bind:key='index'>
            <!-- <a href="#">{{item}}</a> -->
            <b>{{ item[0] }}</b>
            ：{{ item[1] }} {{ item[2] }} {{ item[3] }} {{ item[4] }}
              {{ item[5] }} {{ item[6] }} {{ item[7] }} {{ item[8] }}
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        name: this.$route.name
      };
    },
    computed: {
      doc: {
        get() {
          return this.$store.state.Edit.doc
        },
        set(value) {
          this.$store.commit('PUSH_DOC', value)
        }
      }
    },
    methods: {
    },
  };
</script>

<style scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  .breadcrumb > li + li:before {
    color: #CCCCCC;
    content: "，";
    padding: 0 5px;
  }
</style>
