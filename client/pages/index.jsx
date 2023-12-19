import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='text-center w-1/2 mx-auto'>
      <h3 className='mb-6 font-bold'>Welcome to HMS</h3>
      <Link href={"/auth/login"} className="px-5 py-2 bg-blue-600 text-white">
        Enter
      </Link>
    </div>
  );
}

