import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
  const locationUrl = window.location.href;
  const orderCreatorView = '/customers/orders';
  const adminView = '/admin';

  let iconRender;

  if (locationUrl.includes(orderCreatorView)) {
    iconRender = (
      <ShoppingCartIcon className='shopping-cart' sx={{ color: '#ffffff', fontSize: '4rem', alignSelf: 'flex-end', cursor: 'pointer' }} />
    )
  } else if (locationUrl.includes(adminView)) {
    iconRender = (
      <MenuIcon className='drawer-button' sx={{ color: '#ffffff', fontSize: '3rem', cursor: 'pointer' }} />
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
