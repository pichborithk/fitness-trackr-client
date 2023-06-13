const Footer = () => {
  return (
    <footer className='mt-28 font-bold shadow-full_white'>
      <div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 py-4'>
        <div className='flex w-full justify-between'>
          <div className='text-4xl'>
            <h1>READY FOR YOUR</h1>
            <h1>
              <span className='text-primary-500'>NEXT</span> ROUTINE?
            </h1>
          </div>
          <div className='flex items-center gap-4 px-8 text-4xl'>
            <i className='fa-brands fa-square-facebook'></i>
            <i className='fa-brands fa-instagram'></i>
            <i className='fa-brands fa-youtube'></i>
            <i className='fa-brands fa-tiktok'></i>
          </div>
        </div>
        <div className='flex w-full justify-between font-lora text-xl'>
          <p>fitness.trac-kr@dev.edu</p>
          <div className='flex gap-8'>
            <p>Terms & Conditions</p>
            <p>Privacy Policy</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
