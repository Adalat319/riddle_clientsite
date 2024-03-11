import email from "../assets/email.png"

const Footer = () => {
    return (
        <footer className="flex flex-col justify-around gap-3 bg-[#95EFFE] py-8 p-4">
            <aside className="flex flex-col items-center justify-center gap-3 text-xl text-center" style={{ direction: 'rtl' }}>
                <p>قولىڭىزدا تور بېكىتىمىزدە يوق تېپىشماقلار بولسا، بىزگە ئېلخەت ئارقىلىق ئەۋەتىپ بېرىڭ.</p>
                <p style={{ marginBottom: '1rem' }}>«تامار - تامار كۆل بولار»</p>
            </aside>
            <aside className="text-center flex flex-col items-center text-sm">
            
                <a href="mailto:Info.tilrawan@gmail.com" className="mb-4"> <img src={email} alt="" className='w-[48px] h-[48px]' /></a>
             
                <p style={{ direction: 'rtl' }}>بىز بىلەن ئېلخەت ئارقىلىق ئالاقىلاشسىڭىز بولىدۇ.</p>
              
                
            </aside>
        </footer>
    );
};

export default Footer