(function () {
  'use strict';

  module.exports = function () {

    var lastUsername = null;

    this.Given(/^I am an? (.*)$/, function (username) {
      lastUsername = this.server.call('fixtures/users/create', {username: username});
    });

    this.Given(/^I am logged in$/, function () {
      client.waitForExist('#loaded')
      client.execute(function(lastUsername) {
        Meteor.loginWithPassword(lastUsername, '1111');
      }, lastUsername)
      client.waitForExist('#loaded');
    });

    this.Then(/^I should be logged in$/, function () {
      client.waitForExist('#loaded');
      var user = client.execute(function() {
        return Meteor.user();
      });
      expect(user.value).to.be.not.null;
    });

    this.Then(/^I should be logged out$/, function () {
      client.waitForExist('#loaded');
      var user = client.execute(function() {
        return Meteor.user();
      });
      expect(user.value).to.be.null;
    });

    this.Given(/^I log out$/, function () {
      client.execute(function() {
        Meteor.logout();
      });
    });

  };
})();
