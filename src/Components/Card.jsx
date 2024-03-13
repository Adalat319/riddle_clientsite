/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'


const Card = ({ category }) => {

    console.log(category);
    const { categoryTitle, image } = category


    return (
        <section className='py-10 w-full' dir="rtl">
            <div className="shadow-xl max-w-[350px] font-sans rounded-xl my-10 flex flex-col justify-center items-center mx-auto bg-white">
                <img src={`https://tilrawan-new-0fc4cea36279.herokuapp.com/image/${image}`} alt="" className='w-full h-[350px] rounded-tl-xl rounded-tr-xl' />
                <Link to={`/riddle/${categoryTitle}`} className="bg-[#FAB345] text-white hover:bg-[#0095FF] hover:scale-95 font-medium hover:text-white text-center w-full py-4 hover:shadow-xl shadow-[0px_0px_10px_#E2DADA] duration-500 rounded-bl-xl rounded-br-xl">{categoryTitle}</Link>

            </div>
        </section>
    )
}

export default Card