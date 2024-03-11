import { useEffect, useState } from 'react'
import RiddleCard from '../../Components/RiddleCard'
import useRiddle from '../../Hooks/useRiddle'
import CommonNavbar from '../../Shared/CommonNavbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Riddle = () => {

    const { categoryTitle } = useParams();
    const [data, setData] = useState([])

    useEffect(() => {
        const getAllCat = async () => {
            const res = await axios.get('http://localhost:8000/allRiddle');
            console.log(res.data);
            setData(res.data)
        }
        getAllCat();
    }, [])

    console.log(data);

    const filterRiddle = data && data?.data?.filter(item => item.category === categoryTitle);

    return (
        <>
            <CommonNavbar />
            <section className='p-4'>
                <h1 className='text-center py-16 text-3xl font-bold'>{categoryTitle}</h1>
                <div className='flex justify-center items-center'>
                    <div className='py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl'>
                        {
                            filterRiddle && filterRiddle?.map(item =>
                                <RiddleCard key={item._id} item={item} />
                            )
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Riddle