import Vue from 'vue';
import LoginPage from '@/components/LoginPage';
// https://cn.vuejs.org/v2/api/

describe('LoginPage.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h(LoginPage),
      hasData: false,
      loginName: '',
      loginPassword: ''
    }).$mount();

    vm.hasData = true
    vm.$nextTick(() => {
      expect(vm.$el.querySelector('#right-side h2').textContent).to.contain('');
    })

    // vm.$el.querySelector('#login').click()
    // vm.$nextTick(() => {
    //   expect(vm.$el.querySelector('#right-side h2').textContent).to.contain('');
    // })

    expect(vm.$el.querySelector('#login').textContent).to.contain('登陆');
  });
});
