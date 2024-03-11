import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

const useCategories = () => {

    const storedUser = localStorage.getItem('loggedUser');
       
        const user = (JSON.parse(storedUser));

  console.log(user);

    const { data: categories = [], refetch: categoriesRefetch, isLoading } = useQuery({
        queryKey: ['category', user?.email],
      
        queryFn: async () => {
            const res = await axios.get(`http://localhost:8000/category?email=${user?.email}`)
            return res.data
        },

    })
    console.log(categories)

    return { categories, categoriesRefetch, isLoading }

}

export default useCategories


