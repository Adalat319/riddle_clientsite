
import { useEffect, useState } from 'react'
import Card from '../../Components/Card'
import Hero from '../../Components/Hero'
import Navbar from '../../Components/Navbar'
import useCategories from '../../Hooks/useCategories'
import axios from 'axios'


const Home = () => {

    const [selectedCategory, setSelectedCategory] = useState('');
    const [data, setData] = useState([])

    useEffect(() => {
        const getAllCat = async () => {
            const res = await axios.get('https://tilrawan-new-0fc4cea36279.herokuapp.com/allcategories');
            setData(res.data)
        }
        getAllCat();
    }, [])

    const filteredData = data?.data?.filter(item =>
        item.categoryTitle.toLowerCase().includes(selectedCategory.toLowerCase())
    );

    return (
        <>
            <Navbar setSelectedCategory={setSelectedCategory} />
            <div className='max-w-7xl mx-auto pt-10 pb-20' style={{ direction: 'rtl' }}>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 items-center justify-center'>
                    {(filteredData && filteredData.length > 0 ? filteredData : data?.data)?.map((category) => (
                        <Card key={category._id} category={category} />
                    ))}

                </div>
                <Hero />
            </div>

        </>
    )
}

export default Home