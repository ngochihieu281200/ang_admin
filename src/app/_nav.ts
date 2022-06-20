import { INavData } from '@coreui/angular';
import { MyINavData } from '../app/shared/hiddenNav';
export const navItems: MyINavData[] = [
  {
    name: 'Danh Mục',
    url: '/category',
    icon: 'icon-grid',
    role: ['Admin']
  },
  {
    name: 'Quản Lý Nhân Viên',
    url: '/staff',
    icon: 'icon-people',
    role: ['Admin']
  },
  {
    name: 'Sản Phẩm',
    url: '/product',
    icon: 'icon-puzzle',
    role: ['Admin']
  },
  {
    name: 'Đơn Hàng',
    url: '/order',
    icon: 'icon-basket',
    children: [
      {
        name: 'Chờ Xác Nhận',
        url: '/order/pending',
      },
      {
        name: 'Đang Giao',
        url: '/order/delivery'
      },
      {
        name: 'Yêu Cầu Hủy',
        url: '/order/cancle'
      },
      {
        name: 'Đã Giao',
        url: '/order/success'
      },
    ],
    role: ['Staff', 'Admin']
  },
  {
    name: 'Voucher',
    url: '/voucher',
    icon: 'icon-tag',
    role: ['Admin']
  },
  {
    name: 'Tin Tức',
    url: '/news',
    icon: 'icon-book-open',
    role: ['Staff', 'Admin']
  },
  {
    name: 'Banner',
    url: '/banner',
    icon: 'icon-picture',
    role: ['Staff', 'Admin']
  },
];
