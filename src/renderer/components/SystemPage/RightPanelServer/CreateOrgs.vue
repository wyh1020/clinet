<template>
  <div>
    <form>
      <div class="form-group">
        <label for="InputOrgCode">机构编码</label>
        <input type="text" class="form-control" placeholder="OrgCode" v-model="OrgInfo.code">
      </div>
      <div class="form-group">
        <label for="InputOrgName">机构名称</label>
        <input type="text" class="form-control" placeholder="OrgName" v-model="OrgInfo.name">
      </div>
      <div class="form-group">
        <label for="InputOrgLevel">机构等级</label>
        <input type="text" class="form-control" placeholder="OrgLevel" v-model="OrgInfo.level">
      </div>
      <div class="form-group">
        <label for="InputOrgType">机构类别</label>
        <input type="text" class="form-control" placeholder="OrgType" v-model="OrgInfo.type">
      </div>
      <div class="form-group">
        <!-- <label for="InputOrgProvince">省份</label> -->
        <label for="InputOrgProvince">省份</label>
          <select class="form-control" id="InputOrgProvince" v-model="OrgInfo.province">
            <option v-for="(value, index) in provinceAll.province">{{value}}</option>
          </select>
        <!-- <input type="text" class="form-control" placeholder="Province" v-model="OrgInfo.province"> -->
      </div>
      <div class="form-group">
        <label for="InputOrgCity">市</label>
          <select class="form-control" id="InputOrgCity" v-model="OrgInfo.city">
            <option v-for="(value, index) in provinceAll.city[OrgInfo.province]">{{value}}</option>
          </select>
        <!-- <label for="InputOrgCity">市</label>
        <input type="text" class="form-control" placeholder="City" v-model="OrgInfo.city"> -->
      </div>
      <div class="form-group">
        <label for="InputOrgCity">机构县</label>
        <select class="form-control" id="InputOrgCity" v-model="OrgInfo.county">
          <option v-for="(value, index) in provinceAll.county[OrgInfo.city]">{{value}}</option>
        </select>
        <!-- <label for="InputOrgCounty">机构县</label>
        <input type="text" class="form-control" placeholder="County" v-model="OrgInfo.county"> -->
      </div>
      <div class="form-group">
        <label for="InputOrgPerson_name">联系人</label>
        <input type="text" class="form-control" placeholder="Person_name" v-model="OrgInfo.person_name">
      </div>
      <div class="form-group">
        <label for="InputOrgTel">联系电话</label>
        <input type="text" class="form-control" placeholder="Tel" v-model="OrgInfo.tel">
      </div>
      <div class="form-group">
        <label for="InputOrgEmail">Email</label>
        <input type="email" class="form-control" placeholder="Email" v-model="OrgInfo.email">
      </div>
    </form>
    <div class="row">
      <div class="col-9" />
      <button type="submit" class="btn btn-primary" v-on:click="orgRegister('orgs')" v-if="this.$store.state.System.orgInfo.code === ''">添加机构</button>
      <button type="submit" class="btn btn-primary" v-on:click="orgRegister('upOrgs')" v-else>机构修改</button>
      <button type="submit" class="btn btn-primary" v-on:click="createOrgs('returnorgs')">返回</button>
    </div>
  </div>
</template>
<script>
  import { sCreateOrg, sUpdateOrg, sGetOrg } from '../../../utils/Server'
  export default {
    data() {
      return {
        OrgInfo: {
          code: this.$store.state.System.orgInfo.code,
          name: this.$store.state.System.orgInfo.name,
          level: this.$store.state.System.orgInfo.level,
          type: this.$store.state.System.orgInfo.type,
          province: this.$store.state.System.orgInfo.province,
          city: this.$store.state.System.orgInfo.city,
          county: this.$store.state.System.orgInfo.county,
          person_name: this.$store.state.System.orgInfo.person_name,
          tel: this.$store.state.System.orgInfo.tel,
          email: this.$store.state.System.orgInfo.email
        }
      }
    },
    computed: {
      provinceAll: {
        get() {
          return this.$store.state.System.province
        }
      }
    },
    methods: {
      orgRegister: function (value) {
        const data = this.OrgInfo
        const reg = [/^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g, /^1[0-9]{10}$/]
        let a = 1
        let b = 1
        if (reg[0].test(data.email)) {
          a = 1
        } else {
          a = 0
          this.$store.commit('SET_NOTICE', '邮箱输入错误');
        }
        if (reg[1].test(data.tel)) {
          b = 1
        } else {
          b = 0
          this.$store.commit('SET_NOTICE', '电话输入错误');
        }
        if (a * b === 1) {
          switch (value) {
            case 'orgs':
              sCreateOrg(this, [this.$store.state.System.server, this.$store.state.System.port, data])
              sGetOrg(this, [this.$store.state.System.server, this.$store.state.System.port, this.$store.state.System.user, this.$store.state.System.pageInfo.org]);
              break;
            case 'upOrgs':
              sUpdateOrg(this, [this.$store.state.System.server, this.$store.state.System.port, this.$store.state.System.orgInfo.id, data])
              sGetOrg(this, [this.$store.state.System.server, this.$store.state.System.port, this.$store.state.System.user, this.$store.state.System.pageInfo.org]);
              break
            default:
          }
        }
      },
      createOrgs: function () {
        sGetOrg(this, [this.$store.state.System.server, this.$store.state.System.port, this.$store.state.System.user, this.$store.state.System.pageInfo.org]);
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'getOrgs');
      }
    }
  }
</script>
