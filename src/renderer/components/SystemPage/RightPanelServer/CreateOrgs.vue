<template>
  <div>
    <form>
      <div class="form-group">
        <label for="InputOrgCode">机构编码</label>
        <input type="text" class="form-control" placeholder="OrgCode" v-model="OrgInfo.code" @input="orgs()">
      </div>
      <div class="form-group">
        <label for="InputOrgName">机构名称</label>
        <input type="text" class="form-control" placeholder="OrgName" v-model="OrgInfo.name" @input="orgs()">
      </div>
      <div class="form-group">
        <label for="InputOrgLevel">机构等级</label>
        <input type="text" class="form-control" placeholder="OrgLevel" v-model="OrgInfo.level" @input="orgs()">
      </div>
      <div class="form-group">
        <label for="InputOrgType">机构类别</label>
        <input type="text" class="form-control" placeholder="OrgType" v-model="OrgInfo.type" @input="orgs()">
      </div>
      <div class="form-group">
        <!-- <label for="InputOrgProvince">省份</label> -->
        <label for="InputOrgProvince">省份</label>
          <select class="form-control" id="InputOrgProvince" v-model="OrgInfo.province" @input="orgs()">
             <option v-for="(value, index) in provinceAll.province" v-bind:key="index">{{value}}</option>
          </select>
        <!-- <input type="text" class="form-control" placeholder="Province" v-model="OrgInfo.province"> -->
      </div>
      <div class="form-group">
        <label for="InputOrgCity">市</label>
          <select class="form-control" id="InputOrgCity" v-model="OrgInfo.city" @input="orgs()">
            <option v-for="(value, index) in provinceAll.city[OrgInfo.province]" v-bind:key="index">{{value}}</option>
          </select>
        <!-- <label for="InputOrgCity">市</label>
        <input type="text" class="form-control" placeholder="City" v-model="OrgInfo.city"> -->
      </div>
      <div class="form-group">
        <label for="InputOrgCity">机构县</label>
        <select class="form-control" id="InputOrgCity" v-model="OrgInfo.county" @input="orgs()">
          <option v-for="(value, index) in provinceAll.county[OrgInfo.city]" v-bind:key="index">{{value}}</option>
        </select>
        <!-- <label for="InputOrgCounty">机构县</label>
        <input type="text" class="form-control" placeholder="County" v-model="OrgInfo.county"> -->
      </div>
      <div class="form-group">
        <label for="InputOrgPerson_name">联系人</label>
        <input type="text" class="form-control" placeholder="Person_name" v-model="OrgInfo.person_name" @input="orgs()">
      </div>
      <div class="form-group">
        <label for="InputOrgTel">联系电话</label>
        <input type="text" class="form-control" placeholder="Tel" v-model="OrgInfo.tel" @input="orgs()">
      </div>
      <div class="form-group">
        <label for="InputOrgEmail">Email</label>
        <input type="email" class="form-control" placeholder="Email" v-model="OrgInfo.email" @input="orgs()">
      </div>
    </form>
    <div class="row">
      <div class="col-9" />
    </div>
  </div>
</template>
<script>
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
      orgs: function () {
        const b = {
          code: this.OrgInfo.code,
          name: this.OrgInfo.name,
          level: this.OrgInfo.level,
          type: this.OrgInfo.type,
          province: this.OrgInfo.province,
          city: this.OrgInfo.city,
          county: this.OrgInfo.county,
          person_name: this.OrgInfo.person_name,
          tel: this.OrgInfo.tel,
          email: this.OrgInfo.email
        }
        this.$store.commit('SYSTEM_GET_ORG_INFO', b);
      },
    }
  }
</script>
