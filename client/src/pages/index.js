import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { config } from "./config/config_Base_Url";

export default function Home() {

  const BASE_URL = config;

  const [inputVal, setInputVal] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClick = async () => {
    if (!inputVal) return window.alert("Please enter the url");

    setIsLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/url`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: inputVal })
      });

      setInputVal('');

      const data = await res.json();
      if (res.status === 200 || data) {
        setShortUrl(`${BASE_URL}/${data.id}`);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Head>
        <title>Shortend your URL</title>
      </Head>

      <div className="relative">
        {shortUrl &&
          <div className="absolute top-0 bg-white text-black text-[14px] w-[100%] px-5 py-2 rounded-md flex items-center justify-between">
            <div className="flex items-center">
              <div>short url : </div>
              <a href={`${shortUrl}`} target="_blank" className="p-2 text-blue-700 underline font-bold">{shortUrl}</a>
            </div>
            <div className="cursor-pointer p-1 hover:scale-125 text-bold text-[20px]" onClick={() => setShortUrl('')}>x</div>
          </div>
        }

        <div className="h-[100vh] w-[100vw] flex text-black">
          <div className="w-[40%] bg-[#fde047] hidden md:block">
            <div className="h-[60%] xl:px-10 px-5 py-10 space-y-10">
              <Image src="/url.png" alt="url.png" width={500} height={500} className="w-[20%]"></Image>
              <div className="p-5 font-serif text-center space-y-10 xl:text-start xl:space-y-0">
                <div className="text-[30px] lg:text-[40px] xl:text-[55px] font-bold">
                  SHORTEND
                </div>
                <div className="text-[30px] lg:text-[40px] xl:text-[55px] font-bold xl:ml-40">
                  YOUR
                </div>
                <div className="text-[30px] lg:text-[40px] xl:text-[55px] font-bold xl:ml-[300px]">
                  URL
                </div>
              </div>
            </div>

            <div className="bg-[url('/bg.png')] bg-cover bg-no-repeat bg-bottom h-[40%]"></div>
          </div>

          <div className="w-[100%] md:w-[60%] bg-neutral-700 flex items-center justify-center">
            <div className="p-3 bg-white rounded-md space-y-5 drop-shadow-lg relative">

              {isLoading &&
                <div className="absolute top-0 left-0 bg-white rounded-md w-[100%] h-[100%] flex">
                  <Image src="/loading.png" alt="loading" width={500} height={500} className="w-[80px] h-[80px] m-auto animate-spin"></Image>
                </div>
              }

              <div className="font-bold text-[15px] space-y-2"><div>Shortend your URL</div> <hr className="border-black" /></div>
              <div className=" md:w-[400px] space-y-2">
                <label htmlFor="url" className="text-[13px] text-gray-800">Enter your url:</label>
                <input type="text" id="url" name="url" value={inputVal} className="p-2 outline-0 border-2 border-neutral-400 w-full rounded-md text-[13px]" onChange={(e) => setInputVal(e.target.value)} />
              </div>
              <div className="bg-black text-white p-2 text-[13px] font-bold rounded-md cursor-pointer text-center" onClick={handleOnClick}>Short URL</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
