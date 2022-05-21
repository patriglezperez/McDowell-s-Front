import { useLocation } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';

import DrawerMenu from './DrawerMenu';

export default function Header() {
  const locationUrl = useLocation().pathname;
  const orderCreatorView = '/customers/orders';
  const adminView = '/admin';

  let iconRender;

  if (locationUrl.includes(orderCreatorView)) {
    iconRender = (
      <ShoppingCartIcon className='shopping-cart' sx={{ color: '#ffffff', fontSize: '4rem', alignSelf: 'flex-end', cursor: 'pointer' }} />
    )
  } else if (locationUrl.includes(adminView)) {
    iconRender = (
      <DrawerMenu />
    )
  } else {
    iconRender = <></>;
  }

  return (
    <header>
      {iconRender}
    </header>
  )
}
