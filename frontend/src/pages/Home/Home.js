import { Fragment, useState } from 'react'
import { ExploreMenu } from '../../components/ExploreMenu/ExploreMenu'
import { Header } from '../../components/Header/Header'
import './Home.css'
import { FoodDisplay } from '../../components/FoodDisplay/FoodDisplay'
import { MetaData } from '../../components/MetaData'
import { AppDownload } from '../../components/AppDownload/AppDownload'
export const Home = () => {
     const[category,setCategory]=useState('All');
  return (
    <Fragment>
      <MetaData title={'Home'}/>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <AppDownload/>
    </Fragment>
  )
}
