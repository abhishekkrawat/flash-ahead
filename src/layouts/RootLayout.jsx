import { Outlet } from 'react-router-dom';
import { Navbar } from 'components'

function RootLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
