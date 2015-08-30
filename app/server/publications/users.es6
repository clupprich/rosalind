Meteor.publish('users', function() {
  if(this.userId) {
    return Meteor.users.find({}, { fields: {
      'username': 1,
      'status.online': 1,
      'status.idle': 1,
      'status.lastActivity': 1,
      'status.lastLogin.date': 1,
      'status.lastLogin.userAgent': 1,
      'status.lastLogin.ipAddr': 1,
      'profile.firstName': 1,
      'profile.lastName': 1,
      'profile.titlePrepend': 1,
      'profile.titleAppend': 1,
      'profile.gender': 1,
      'profile.birthday': 1,
      'roles': 1
    }});
  }
});
