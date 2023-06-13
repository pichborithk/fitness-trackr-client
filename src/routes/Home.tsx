const Home = () => {
  return (
    <main className='section-min-height flex items-center justify-center gap-20 px-20'>
      <div className='flex flex-col gap-8'>
        <h2 className='font-lora text-6xl font-bold leading-tight text-primary-500'>
          Est adipiscing est dapibus molestie facilisi.
        </h2>
        <p className='text-2xl'>
          Egestas a porttitor vestibulum tincidunt purus in platea massa
          laoreet. Ultrices faucibus diam vitae diam nibh habitasse maecenas
          pretium. Blandit id volutpat id mi faucibus interdum auctor sed. Odio
          ut rutrum sed ridiculus suscipit lacus dictum. Semper aliquet
          adipiscing lectus id urna.
        </p>
        <div>
          <button className='mr-4 rounded-md border-2 border-primary-600 px-4 py-2 text-xl font-semibold text-primary-500'>
            <i className='fa-brands fa-apple'></i> Download
          </button>
          <button className='rounded-md border-2 border-primary-100 bg-primary-100 px-4 py-2 text-xl font-semibold text-primary-600'>
            <i className='fa-brands fa-google-play'></i> Download
          </button>
        </div>
      </div>
      <div>
        <img
          src='https://images.unsplash.com/photo-1584464457692-54516d705fe0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'
          alt='hero image'
        />
      </div>
    </main>
  );
};

export default Home;
