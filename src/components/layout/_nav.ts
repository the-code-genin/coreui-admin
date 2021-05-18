export default {
  _name: 'CSidebarNav',
  _children: [
    {
      _name: 'CSidebarNavItem',
      name: 'Dashboard',
      to: {name: 'Dashboard'},
      icon: 'cil-speedometer',
    },

    {
      _name: 'CSidebarNavTitle',
      _children: ['General Administration'],
    },
    {
      _name: 'CSidebarNavDropdown',
      name: 'Admins',
      to: {name: 'Admins'},
      icon: 'cil-people',
      items: [
        {
          name: 'All',
          to: {name: 'All Admins'}
        },
        {
          name: 'New',
          to: {name: 'Create Admin'}
        },
      ]
    },
    {
      _name: 'CSidebarNavItem',
      name: 'System Settings',
      to: {name: 'System Settings'},
      icon: 'cil-settings',
    },


    {
      _name: 'CSidebarNavTitle',
      _children: ['Account']
    },
    {
      _name: 'CSidebarNavItem',
      name: 'My Profile',
      to: {name: 'Profile'},
      icon: 'cil-user',
    },
    {
      _name: 'CSidebarNavItem',
      name: 'Logout',
      to: {name: 'Logout'},
      icon: 'cil-account-logout',
    },
  ]
};