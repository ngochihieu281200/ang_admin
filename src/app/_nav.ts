import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'ADMIN MANAGER',
  },
  {
    name: 'Customer',
    url: '/customer',
    icon: 'icon-user',
  },
  {
    name: 'Category',
    url: '/category',
    icon: 'icon-grid',
  },
  {
    name: 'Staff',
    url: '/staff',
    icon: 'icon-puzzle',
  },
  {
    name: 'Product',
    url: '/product',
    icon: 'icon-puzzle',
  },
  {
    divider: true,
  },

];
