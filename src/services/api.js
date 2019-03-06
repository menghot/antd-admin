export default {
  queryRouteList: '/routes',

  queryUserInfo: '/user',
  logoutUser: '/user/logout',
  loginUser: 'POST /user/login',

  queryUser: '/user/:id',
  queryUserList: '/users',
  updateUser: 'Patch /user/:id',
  createUser: 'POST /user',
  removeUser: 'DELETE /user/:id',
  removeUserList: 'POST /users/delete',

  queryTaskitem: '/task-item/:id',
  queryTaskitemList: '/task-items',
  updateTaskitem: 'Patch /task-item/:id',
  createTaskitem: 'POST /task-item',
  removeTaskitem: 'DELETE /task-item/:id',
  removeTaskitemList: 'POST /task-items/delete',

  queryEsSetting: '/es-setting/:id',
  queryEsSettingList: '/es-settings',
  updateEsSetting: 'Patch /es-setting/:id',
  createEsSetting: 'POST /es-setting',
  removeEsSetting: 'DELETE /es-setting/:id',
  removeEsSettingList: 'POST /es-settings/delete',

  queryDbSetting: '/db-setting/:id',
  queryDbSettingList: '/db-settings',
  updateDbSetting: 'Patch /db-setting/:id',
  createDbSetting: 'POST /db-setting',
  removeDbSetting: 'DELETE /db-setting/:id',
  removeDbSettingList: 'POST /db-settings/delete',

  queryPostList: '/posts',

  queryDashboard: '/dashboard',
}
