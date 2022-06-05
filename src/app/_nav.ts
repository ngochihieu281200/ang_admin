import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'ADMIN MANAGER',
  },
  {
    name: 'Danh Mục',
    url: '/category',
    icon: 'icon-grid',
  },
  {
    name: 'Quản Lý Nhân Viên',
    url: '/staff',
    icon: 'icon-people',
  },
  {
    name: 'Sản Phẩm',
    url: '/product',
    icon: 'icon-puzzle',
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
    ]
  },
  {
    name: 'Voucher',
    url: '/voucher',
    icon: 'icon-tag',
  },
  {
    name: 'Tin Tức',
    url: '/news',
    icon: 'icon-book-open',
  },
  {
    name: 'Banner',
    url: '/banner',
    icon: 'icon-picture',
  },
  {
    divider: true,
  },

];
