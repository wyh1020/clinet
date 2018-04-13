<template>
  <div>
    <form>
      <div class="form-group">
        <label>所在机构</label>
        <input type="text" class="form-control" placeholder="OrgName" v-model="DepartmentInfo.org" />
      </div>
      <div class="form-group">
        <label>科室主任</label>
        <input type="text" class="form-control" placeholder="Director of the Department" v-model="DepartmentInfo.cherf_department" />
      </div>
      <div class="form-group">
        <label>所属科室类</label>
        <input type="text" class="form-control" placeholder="The Department Class" v-model="DepartmentInfo.class" />
      </div>
      <div class="form-group">
        <label>所属科室</label>
        <input type="text" class="form-control" placeholder="The Department" v-model="DepartmentInfo.department" />
      </div>
      <div class="form-group">
        <div class="custom-control custom-checkbox my-1 mr-sm-2">
          <input type="checkbox" class="custom-control-input" id="Is_Improt" v-model="DepartmentInfo.is_imp">
          <label class="custom-control-label" for="Is_Improt">是否重点</label>
        </div>
      </div>
      <div class="form-group">
        <div class="custom-control custom-checkbox my-1 mr-sm-2">
          <input type="checkbox" class="custom-control-input" id="Is_Characteristic" v-model="DepartmentInfo.is_spe">
          <label class="custom-control-label" for="Is_Characteristic">是否特色</label>
        </div>
      </div>
      <div class="form-group">
        <label>副主任</label>
        <input type="text" class="form-control" placeholder="Professor" v-model="DepartmentInfo.professor" />
      </div>
      <div class="form-group">
        <label>内部科室编码</label>
        <input type="text" class="form-control" placeholder="Wt_Code" v-model="DepartmentInfo.code" />
      </div>
      <div class="form-group">
        <label>内部科室名称</label>
        <input type="text" class="form-control" placeholder="Wt_name" v-model="DepartmentInfo.wt_name" />
      </div>
    </form>
    <div class="row">
      <div class="col-9" />
      <button v-if="this.$store.state.System.departmentInfo.id === ''" type="submit" class="btn btn-primary" v-on:click="orgRegister('departments')">添加科室</button>
      <button v-else type="submit" class="btn btn-primary" v-on:click="orgRegister('updepartments')">科室修改</button>
      <button type="submit" class="btn btn-primary" v-on:click="createOrgs()">返回</button>
    </div>
  </div>
</template>
<script>
  import { sCreateDepart, sUpdateDepart, sGetDepart } from '../../../utils/Server'
  export default {
    data() {
      console.log(this.$store.state.System.departmentInfo);
      return {
        DepartmentInfo: {
          org: this.$store.state.System.departmentInfo.org,
          cherf_department: this.$store.state.System.departmentInfo.cherf_department,
          class: this.$store.state.System.departmentInfo.class,
          department: this.$store.state.System.departmentInfo.department,
          is_imp: this.$store.state.System.departmentInfo.is_imp,
          is_spe: this.$store.state.System.departmentInfo.is_spe,
          professor: this.$store.state.System.departmentInfo.professor,
          code: this.$store.state.System.departmentInfo.wt_code,
          wt_name: this.$store.state.System.departmentInfo.wt_name,
        }
      }
    },
    methods: {
      orgRegister: function (value) {
        const data = this.DepartmentInfo
        switch (value) {
          case 'departments':
            sCreateDepart(this, [this.$store.state.System.server, this.$store.state.System.port, this.$store.state.System.user, data]);
            this.$store.commit('SYSTEM_SET_TOOLBAR', 'getOrgs');
            this.$store.commit('SYSTEM_GET_ORGPAGE', 'getDepartment');
            sGetDepart(this, [this.$store.state.System.server, this.$store.state.System.port, this.$store.state.System.user, this.$store.state.System.pageInfo.department])
            break;
          case 'updepartments':
            sUpdateDepart(this, [this.$store.state.System.server, this.$store.state.System.port, this.$store.state.System.departmentInfo.id, data]);
            this.$store.commit('SYSTEM_SET_TOOLBAR', 'getOrgs');
            this.$store.commit('SYSTEM_GET_ORGPAGE', 'getDepartment');
            sGetDepart(this, [this.$store.state.System.server, this.$store.state.System.port, this.$store.state.System.user, this.$store.state.System.pageInfo.department])
            break;
          default:
        }
      },
      createOrgs: function () {
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'getOrgs');
        this.$store.commit('SYSTEM_GET_ORGPAGE', 'getDepartment');
      }
    }
  }
</script>
