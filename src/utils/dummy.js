// import React from 'react';
import {
  AiOutlineAreaChart,
  AiOutlineBarChart,
  AiOutlineCalendar,
  AiOutlineShoppingCart,
  AiOutlineStock,
} from 'react-icons/ai';
import { BiColorFill } from 'react-icons/bi';
import { BsBarChart, BsKanban } from 'react-icons/bs';
import { FiEdit, FiPieChart, FiShoppingBag } from 'react-icons/fi';
import { GiLouvrePyramid } from 'react-icons/gi';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine, RiStockLine } from 'react-icons/ri';
// import avatar from './avatar.jpg';
// import avatar2 from './avatar2.jpg';
// import avatar3 from './avatar3.png';
// import avatar4 from './avatar4.jpg';
// import product1 from './product1.jpg';
// import product2 from './product2.jpg';
// import product3 from './product3.jpg';
// import product4 from './product4.jpg';
// import product5 from './product5.jpg';
// import product6 from './product6.jpg';
// import product7 from './product7.jpg';
// import product8 from './product8.jpg';

// export const gridOrderImage = (props) => (
//   <div>
//     <img
//       className="rounded-xl h-20 md:ml-3"
//       src={props.ProductImage}
//       alt="order-item"
//     />
//   </div>
// );

// export const gridOrderStatus = (props) => (
//   <button
//     type="button"
//     style={{ background: props.StatusBg }}
//     className="text-white py-1 px-2 capitalize rounded-2xl text-md"
//   >
//     {props.Status}
//   </button>
// );

export const links = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'ecommerce',
        icon: <FiShoppingBag />,
      },
    ],
  },

  {
    title: 'Pages',
    links: [
      {
        name: 'orders',
        icon: <AiOutlineShoppingCart />,
      },
      {
        name: 'employees',
        icon: <IoMdContacts />,
      },
      {
        name: 'customers',
        icon: <RiContactsLine />,
      },
    ],
  },
  {
    title: 'Apps',
    links: [
      {
        name: 'calendar',
        icon: <AiOutlineCalendar />,
      },
      {
        name: 'kanban',
        icon: <BsKanban />,
      },
      {
        name: 'editor',
        icon: <FiEdit />,
      },
      {
        name: 'color-picker',
        icon: <BiColorFill />,
      },
    ],
  },
  {
    title: 'Charts',
    links: [
      {
        name: 'line',
        icon: <AiOutlineStock />,
      },
      {
        name: 'area',
        icon: <AiOutlineAreaChart />,
      },

      {
        name: 'bar',
        icon: <AiOutlineBarChart />,
      },
      {
        name: 'pie',
        icon: <FiPieChart />,
      },
      {
        name: 'financial',
        icon: <RiStockLine />,
      },
      {
        name: 'color-mapping',
        icon: <BsBarChart />,
      },
      {
        name: 'pyramid',
        icon: <GiLouvrePyramid />,
      },
      {
        name: 'stacked',
        icon: <AiOutlineBarChart />,
      },
    ],
  },
];
