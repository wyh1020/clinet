<template>
  <div>
    <div class="btn-group">
      <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {{OrgPage}}
      </button>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="#" v-on:click="createOrgs('orgsInfo')">机构信息</a>
        <a class="dropdown-item" href="#" v-on:click="createOrgs('departmentsInfo')">科室信息</a>
      </div>
    </div>
    <div v-if="this.OrgPage === '机构信息'">
      <div class="row">
        <div class="col-10" />
        <button class="btn btn-primary system_new_org" v-on:click="createOrgs('orgs')">新建机构</button>
      </div>
      <table class="table">
        <thead>
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
    </div>
    <div v-if="this.OrgPage === '科室信息'">
      <div class="row">
        <div class="col-10"/>
        <button class="btn btn-primary system_new_org" v-on:click="createOrgs('departments')">新建科室</button>
      </div>
      <table class="table">
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
            <td>{{value.is_ban}}</td>
            <td>{{value.is_imp}}</td>
            <td>{{value.is_spe}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import { sGetDepart } from '../../../utils/Server'
  export default {
    data() {
      return {
        OrgPage: '机构信息',
        OrgInfo: { code: '', name: '', level: '', type: '', province: '', city: '', county: '', person_name: '', tel: '', email: '' },
        DepartmentInfo: { org: '', cherf_department: '', class: '', department: '', is_imp: false, is_spe: false, professor: '', wt_code: '', wt_name: '' }
      }
    },
    methods: {
      createOrgs: function (value, index) {
        const deparmentkey = ['org', 'cherf_department', 'class', 'department', 'is_imp', 'is_spe', 'professor', 'wt_code', 'wt_name']
        const orgkey = ['code', 'name', 'level', 'type', 'province', 'city', 'county', 'person_name', 'tel', 'email']
        switch (value) {
          case 'orgsInfo':
            this.OrgPage = '机构信息'
            break;
          case 'departmentsInfo':
            this.OrgPage = '科室信息'
            sGetDepart(this, [this.$store.state.System.server, this.$store.state.System.port, this.$store.state.System.user])
            break;
          case 'updateDepartments':
            deparmentkey.forEach((n) => {
              this.DepartmentInfo[n] = this.$store.state.System.departments.data[index][n]
            })
            this.$store.commit('SYSTEM_GET_DEPARTMENT_INFO', this.DepartmentInfo)
            this.$store.commit('SYSTEM_SET_TOOLBAR', 'createDepartments');
            this.OrgPage = '科室信息'
            break;
          case 'updateOres':
            orgkey.forEach((n) => {
              this.OrgInfo[n] = this.$store.state.System.orgs.data[index][n]
            })
            this.$store.commit('SYSTEM_GET_ORG_INFO', this.OrgInfo)
            this.$store.commit('SYSTEM_SET_TOOLBAR', 'createOrgs');
            this.OrgPage = '机构信息'
            break;
          case 'orgs':
            this.$store.commit('SYSTEM_SET_TOOLBAR', 'createOrgs');
            this.OrgPage = '机构信息'
            break;
          case 'departments':
            this.$store.commit('SYSTEM_SET_TOOLBAR', 'createDepartments');
            this.OrgPage = '科室信息'
            break;
          default:
            break;
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
</style>
