import { useNavigate } from 'react-router-dom';
import api from '../api/_api.js';
import Searchbar from './Search/Searchbar.jsx';
import CatalogsOverview from './Catalogs/CatalogsOverview.jsx';


export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Homepage</h1>
      <p>This is a protected route. Only authenticated users can see this.</p>

      <Searchbar />
      <CatalogsOverview />
    </div>
  );
};
