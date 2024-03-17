import Image from "next/image";
import loder from '../../public/assets/icons/loader.svg'

const Loading = () => {
  return (
    <div className='w-full flex-center items-center '>
      <Image
        src={loder}
        width={100}
        height={100}
        alt='loader'
        className='object-contain'
      />
    </div>
  );
};

export default Loading;