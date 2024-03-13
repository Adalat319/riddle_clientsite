/* eslint-disable react/prop-types */
import { useState, } from 'react'
import { Modal } from '../Shared/Modal';

import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RiddleCard = ({ item, save }) => {

    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    const handleSave = async () => {
        const storedUser = localStorage.getItem('loggedUser');
        const user = (JSON.parse(storedUser));
        if (user?.email) {
            const addRiddle = {
                oldId: item._id,
                answer: item.answer,
                category: item.category,
                explanation: item.explanation,
                title1: item.title1,
                title2: item.title2,
                title3: item.title3,
                title4: item.title4,
                email: user?.email,
            }
            const res = await axios.post(`https://tilrawan-new-0fc4cea36279.herokuapp.com/save-riddle`, addRiddle);
            if (res.data.message === 'successfully added') {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "added Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/saved');
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Already exist",
                    showConfirmButton: false,
                    timer: 1500
                });

            }
        } else {
            Swal.fire({
                title: "You are not Logged in",
                text: "Please Login first to use this service",
                icon: "warning",
                confirmButtonText: "Cool",
            })
        }
    }

    // style={{ direction: 'rtl', textAlign: 'right' }}

    return (
        <div className="rounded-lg border shadow-sm w-full max-w-xl mx-auto bg-white">
            {/* Product Title */}
            <div className="flex flex-col space-y-1.5 p-6 px-10 overflow-x-auto text-center" style={{ direction: 'rtl', textAlign: 'right' }}>
                <h3 className="text-2xl text-black text-center w-full text-wrap">{item?.title1}</h3>
                <h3 className="text-2xl text-black text-center w-full text-wrap">{item?.title2}</h3>
                <h3 className="text-2xl text-black text-center w-full text-wrap">{item?.title3}</h3>
                <h3 className="text-2xl text-black text-center w-full text-wrap">{item?.title4}</h3>
            </div>
            <div className="px-6 py-4 flex flex-col gap-4">
                <div className="flex justify-between items-end gap-2">
                    {
                        !save && <button onClick={handleSave} className="text-sm rounded-lg text-center py-2 px-8 cursor-pointer bg-[#FAB345] text-black">ساقلاش</button>
                    }
                    <button onClick={() => setOpenModal({ click: true, message: "explanation" })} className="text-sm rounded-lg text-center py-2 px-8 cursor-pointer bg-[#95EFFE] text-black">ئىزاھات</button>
                    <button onClick={() => setOpenModal({ click: true, message: 'answer' })} className="text-sm rounded-lg text-center py-2 px-8 cursor-pointer bg-[#5EFA4563] text-black">جاۋاب</button>
                </div>
            </div>

            {
                openModal?.click && <Modal item={item} openModal={openModal} setOpenModal={setOpenModal} />
            }

        </div>
    )
}

export default RiddleCard