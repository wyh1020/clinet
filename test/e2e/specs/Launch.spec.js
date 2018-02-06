import utils from '../utils';

describe('Launch', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  it('shows the proper application title', function () {
    return this.app.client.getTitle()
      .then((title) => {
        expect(title).to.equal('clinet---医生工作站，应用区块链技术，连接成clinic-net');
      });
  });
});
