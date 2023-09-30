//  Necessary permission to access a route
// Route : Permissions
export const RoutePermissions = {
  inventoryProject: '',
  inventoryProjectWbs: '',
  weeklySummariesReport: 'getWeeklySummaries',
  projects: 'postProject',
  projectManagement_fullFunctionality: 'seeProjectManagement',
  projectManagement_addTeamMembersUploadNewWBS: 'seeProjectManagementTab',
  userManagement: 'postUserProfile',
  badgeManagement: 'createBadges',
  userPermissionsManagement: 'putUserProfilePermissions',
  permissionsManagement: 'putRole',
  permissionsManagementRole: 'putRole',
  teamsManagement_fullFunctionality: 'seeTeamsManagement',
  teamsManagement_createTeamsEditTeamMembers:'seeTeamsManagementTab',
  teams: 'putTeam',
  reports: 'getWeeklySummaries',
};
