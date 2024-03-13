import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

const useRiddle = () => {

    const storedUser = localStorage.getItem('loggedUser');
       
        const user = (JSON.parse(storedUser));

  console.log(user);
   
    const { data, refetch, isLoading } = useQuery({
        queryKey: ['riddle', user?.email],
        queryFn: async () => {
            const res = await axios.get(`https://tilrawan-new-0fc4cea36279.herokuapp.com/riddle?email=${user?.email}`)
            return res.data
        },
    })
    return { data, refetch, isLoading }

}


export default useRiddle