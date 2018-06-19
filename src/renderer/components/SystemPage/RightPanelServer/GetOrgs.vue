<template>
  <div>
    <div v-if="this.orgPageType === 'getOrg'">
      <div class="row">
        <div class="col-10" />
      </div>
      <table class="table-hover table-condensed">
        <thead  class="thead-secondary">
          <tr>
            <th>ID</th>
            <th>机构编码</th>
            <th>机构名称</th>
            <th>机构等级</th>
            <th>机构类别</th>
            <th>省份</th>
            <th>市</th>
            <th>县</th>
            <th>联系人</th>
            <th>联系电话</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for = "(value, index) in this.$store.state.System.orgs.data"  v-bind:key="index" v-on:click="createOrgs('updateOres', index)">
            <td>{{value.id}}</td>
            <td>{{value.code}}</td>
            <td>{{value.name}}</td>
            <td>{{value.level}}</td>
            <td>{{value.type}}</td>
            <td>{{value.province}}</td>
            <td>{{value.city}}</td>
            <td>{{value.county}}</td>
            <td>{{value.person_name}}</td>
            <td>{{value.tel}}</td>
            <td>{{value.email}}</td>
          </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation example" class="page">
        <ul class="pagination">
          <li class="page-item" v-for="(value, index) in this.$store.state.System.orgs.page_list" v-bind:key="index" v-bind:class="{'disabled': parseInt(value.page, 10) === page}" v-on:click="departmentPage(value.page)">
            <a class="page-link" href="#">{{value.num}}</a>
          </li>
        </ul>
      </nav>
    </div>
    <div v-if="this.orgPageType === 'getDepartment'">
      <div class="row">
        <div class="col-10"/>
      </div>
      <table class="table-hover table-condensed">
        <thead>
          <tr>
            <th>所在机构</th>
            <th>所属科室类</th>
            <th>所属科室</th>
            <th>科室主任</th>
            <th>科室副主任</th>
            <th>内部科室编码</th>
            <th>内部科室名称</th>
            <th>是否停用</th>
            <th>是否重点</th>
            <th>是否特色</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for= "(value, index) in this.$store.state.System.departments.data"  v-bind:key="index" v-on:click="createOrgs('updateDepartments', index)">
            <td>{{value.org}}</td>
            <td>{{value.class}}</td>
            <td>{{value.department}}</td>
            <td>{{value.cherf_department}}</td>
            <td>{{value.professor}}</td>
            <td>{{value.wt_code}}</td>
            <td>{{value.wt_name}}</td>
            <td v-if="value.is_ban === true">是</td>
            <td v-if="value.is_ban === false">否</td>
            <td v-if="value.is_imp === true">是</td>
            <td v-if="value.is_imp === false">否</td>
            <td v-if="value.is_spe === true">是</td>
            <td v-if="value.is_spe === false">否</td>
          </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation example" class="page">
        <ul class="pagination">
          <li class="page-item" v-for="(value, index) in this.$store.state.System.departments.page_list" v-bind:key="index" v-bind:class="{'disabled': parseInt(value.page, 10) === page}" v-on:click="departmentPage(value.page)">
            <a class="page-link" href="#">{{value.num}}</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
  import { sGetDepart, sGetOrg } from '../../../utils/Server'
  export default {
    data() {
      return {
        OrgInfo: { code: '', name: '', level: '', type: '', province: '北京市', city: '北京市', county: '东城区', person_name: '', tel: '', email: '' },
        DepartmentInfo: { org: '', cherf_department: '', class: '', department: '', is_imp: false, is_spe: false, professor: '', wt_code: '', wt_name: '', id: '' },
      }
    },
    computed: {
      orgPageType: {
        get() {
          return this.$store.state.System.orgPage
        }
      },
      page: {
        get() {
          let page = 1
          switch (this.$store.state.System.orgPage) {
            case 'getDepartment':
              page = parseInt(this.$store.state.System.departments.page_num, 10);
              break;
            case 'getOrg':
              page = parseInt(this.$store.state.System.orgs.page_num, 10);
              break;
            default:
          }
          return page
        },
        orgPage: {
          get() {
            return this.$store.state.System.orgPage
          }
        }
      }
    },
    methods: {
      createOrgs: function (value, index) {
        const deparmentkey = ['org', 'cherf_department', 'class', 'department', 'is_imp', 'is_spe', 'professor', 'wt_code', 'wt_name', 'id']
        const orgkey = ['code', 'name', 'level', 'type', 'province', 'city', 'county', 'person_name', 'tel', 'email', 'id']
        switch (value) {
          case 'updateDepartments':
            deparmentkey.forEach((n) => {
              this.DepartmentInfo[n] = this.$store.state.System.departments.data[index][n]
            })
            this.$store.commit('SYSTEM_GET_DEPARTMENT_ID', this.$store.state.System.departments.data[index].id)
            this.$store.commit('SYSTEM_GET_DEPARTMENT_INFO', this.DepartmentInfo)
            this.$store.commit('SYSTEM_SET_TOOLBAR', 'createDepartments');
            this.$store.commit('SYSTEM_GET_ORGPAGE', 'getDepartment');
            this.$store.commit('SYSTEM_SET_ORG_NAME', 'updateDep');
            break;
          case 'updateOres':
            orgkey.forEach((n) => {
              this.OrgInfo[n] = this.$store.state.System.orgs.data[index][n]
            })
            this.$store.commit('SYSTEM_GET_ORG_INFO', this.OrgInfo)
            this.$store.commit('SYSTEM_GET_ORG_ID', this.$store.state.System.orgs.data[index].id)
            this.$store.commit('SYSTEM_SET_TOOLBAR', 'createOrgs');
            this.$store.commit('SYSTEM_GET_ORGPAGE', 'getOrg');
            this.$store.commit('SYSTEM_SET_ORG_NAME', 'update');
            break;
          default:
            break;
        }
      },
      departmentPage: function (value) {
        this.$store.commit('SYSTEM_GET_PAGEINFO', value)
        switch (this.orgPageType) {
          case 'getDepartment':
            sGetDepart(this, [this.$store.state.System.server, this.$store.state.System.port], this.$store.state.System.user, value)
            break;
          case 'getOrg':
            sGetOrg(this, [this.$store.state.System.server, this.$store.state.System.port], this.$store.state.System.user, value)
            break;
          default:
        }
      }
    }
  };
</script>

<style scoped>
.orgs{
  margin-top: 0.8em;
}
.system_new_org {
  margin-top: 0.8em;
  margin-bottom: 0.8em;
}
.page {
  float: right;
}
</style>
