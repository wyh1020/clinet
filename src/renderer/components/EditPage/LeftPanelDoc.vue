<template>
  <div id="edit-leftpaneldoc-doc">
    <div class="card">
      <div class="card-body">
        <ol class="breadcrumb">
          <li class="breadcrumb-item" v-for="(item, index) in doc" v-bind:key='index' v-bind:class="{'table-danger':flag == index}">
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
  import editDoc from '../../utils/EditDoc'
  export default {
    computed: {
      flag: {
        get() {
          return this.$store.state.Edit.docIndex
        }
      },
      doc: {
        get() {
          const doc = this.$store.state.Edit.doc
          const doc1 = editDoc(doc)
          console.log(doc1)
          return doc
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
