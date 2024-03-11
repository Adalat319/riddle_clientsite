/* eslint-disable no-unused-vars */
import RiddleCard from '../../Components/RiddleCard'
import CommonNavbar from '../../Shared/CommonNavbar'
import axios from 'axios'
import { useQuery } from "@tanstack/react-query";

const SavedRiddle = () => {

    const storedUser = localStorage.getItem('loggedUser');

    const user = (JSON.parse(storedUser));
    console.log(user?.email);

    console.log(user);
    const { data, refetch, isLoading } = useQuery({
        queryKey: ['save-riddle', user?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:8000/save-riddle?email=${user?.email}`)
            return res.data
        },
    })
    console.log(data);


    return (
        <>
            <CommonNavbar />
            <section>
                <h1 className='text-center lg:py-16 text-3xl font-bold'>ساقلىۋالغان تېپىشماقلىرىم</h1>
                <div className='flex justify-center items-center'>
                    <div className='py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl'>
                        {
                            data && data.map(item =>
                                <RiddleCard key={item._id} item={item} save={'save'} />
                            )
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default SavedRiddle