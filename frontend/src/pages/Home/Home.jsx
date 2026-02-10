import { memo, useState } from 'react';
import './Home.css';
import Header from '../../components/header/header';
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category} />
    </div>
  );
};

export default memo(Home);