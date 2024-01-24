import { useEffect, useState } from "react";
import "./App.css";


function App() {
  const [imageArray, setimageArray] = useState([]);
  const [input, setinput] = useState("");
  const [page, setpage] = useState(1);

  const download = async(imageSrc)=>{
 {
      const image = await fetch(imageSrc)
      const imageBlog = await image.blob()
      const imageURL = URL.createObjectURL(imageBlog)
    
      const link = document.createElement('a')
      link.href = imageURL
      link.download = 'image file name here'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

  }

  const submit = async () => {
    const accesskey = String(import.meta.env.VITE_ACCESS_KEY);

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${input}&client_id=${accesskey}`;

    const response = await fetch(url);
    console.log(response);
    const data = await response.json();
    console.log(data);
    const result = data.results;
    console.log(result);
    setimageArray(result);
  };

  return (
    <>
      <div className="min-h-screen w-full bg-slate-900 text-white ">
        <div className="flex justify-center items-center pt-4 ">
          <div className="w-[35px] ">
            <img src="sg.jpg" alt="" />
          </div>
          <div className="p-2 text-xl font-serif font-bold ">
            <span className="text-red-800 drop-shadow-xl">Image</span> Generator
          </div>
        </div>
        <div className="w-[95%] md:w-[70%] xl:w-[60%] p-9 mx-auto">
          <div className="w-full flex justify-center items-center gap-3">
            <input
              value={input}
              onChange={(e) => {
                setinput(e.target.value);
              }}
              className="w-4/5 p-2 bg-slate-700 rounded-md border"
              placeholder="Enter the input to get the images..."
              type="text"
            />
            <button
              onClick={submit}
              className="w-1/5 p-1 sm:p-2 text-sm sm:text-md bg-slate-300 text-black font-semibold rounded-lg font-serif"
            >
              Search
            </button>
          </div>
        </div>
        <div className="w-full p-[10px] flex flex-wrap gap-7 justify-center">
          

          {imageArray &&
            imageArray.map((image) => (
              <a href={image.urls.small}  key={image.id} target="_blank">
                <div className="w-[300px] h-[300px] m-3 ">
                <div className="w-full h-[260px] overflow-hidden">
                  <img
                  className="object-cover w-full h-full"
                    src={image.urls.small}
                    alt=""
                  />
                </div>
                <div className="p-2 h-[40px] overflow-hidden bg-slate-700 flex justify-between items-center">
                  <div className="py-1 overflow-hidden text-xl">{String(image.alt_description).slice(0,12) + "..."}</div>{" "}
                  <button className="bg-green-600 px-3  py-1 m-2 rounded-2xl font-semibold"
                  onClick={()=>{
                    download(image.urls.small)
                  }}>
                    Download
                  </button>
                </div>
              </div>
              </a>
            ))}
        </div>
        {imageArray.length != 0?(
          <div className="flex gap-3 w-full justify-center mt-9 items-center font-semibold pb-11">
          <button
            className={`rounded-md bg-white py-1 px-3 font-semibold text-black ${
              page == 1 ? "hidden" : null
            }`}
            onClick={() => {
              setpage((prev) => prev - 1);
              submit()
            }}

          >
            ← prev -{" "}
          </button>
          page : {page}
          <button
            className="rounded-md bg-white py-1 px-3 font-semibold text-black"
            onClick={() => {
              setpage((prev) => prev + 1);
              submit()
            }}
          >
            next →
          </button>
        </div>
        ):null}
      </div>
    </>
  );
}

export default App;
