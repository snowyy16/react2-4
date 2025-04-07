import { useLocation } from 'react-router-dom';

const Page = () => {
  const location = useLocation();
  const path = location.pathname.replace('/', '') || 'dashboard';

  const formatted = path.charAt(0).toUpperCase() + path.slice(1);

  return (
    <div>
      <h1>This is {formatted} Page</h1>
    </div>
  );
};

export default Page;
