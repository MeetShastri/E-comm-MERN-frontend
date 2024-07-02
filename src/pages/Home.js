import BannerProduct from '../components/BannerProduct'
import CategoryList from '../components/CategoryList'
import HorizontalCardProduct from '../components/HorizontalCardProduct'

const Home = () => {

  return (
    <div className=''>
      <CategoryList/> 
      <BannerProduct/>
      <HorizontalCardProduct category={'airpodes'} heading={'Top Airpods' }/>
    </div>
  )
}

export default Home
