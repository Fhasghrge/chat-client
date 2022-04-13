import React, { useRef, useState } from "react";
import { useSnackbar } from 'notistack'
import * as api from '@/apis';
import { notifyBaseConfig } from '@/util'


const TypingArea = ({ message, setMessage, onSubmit }) => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const { enqueueSnackbar } = useSnackbar()

  const uploadRef = useRef()

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };


  const handUploadFile = () => {
    console.log('handUploadFile invoke', uploaded);
    if(uploaded) {
      onSubmit();
      handleClearFile()
    }
    if (loading || uploaded) return;
    setLoading(true)
    api.appendFile(selectedFile).then((res) => {
      setMessage(res.data.name)
      setUploaded(true)
      enqueueSnackbar('上传成功', {
        ...notifyBaseConfig,
        variant: 'success'
      })
    })
      .catch(() => {
        enqueueSnackbar('上传失败', {
          ...notifyBaseConfig,
          variant: 'error'
        })
      })
      .finally(() => {
        setLoading(false)
      })
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setUploaded(false)
    setIsFilePicked(false);
    if(uploadRef.current) {
      uploadRef.current.value = null;
    }
  }

  return (
    <div className="p-2 h-full border-t-2 pt-5 border-gray-100">
      <form className="flex space-x-4" >
        <div className="w-full">
          <div className="position-relative">
            {isFilePicked ?
              <FileItem selectedFile={selectedFile} />
              :
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                placeholder="Enter Message..."
                className="w-full 
                  h-8 border-0 focus:outline-none 
                  border-b-2 border-sky-100 pl-2"
              />
            }
          </div>
        </div>
        <div className="flex  items-center space-x-3">
          {
            !(loading || uploaded) &&
            <label htmlFor="contained-button-file">
              <span className=" bg-sky-100 text-lg w-6 h-6 flex justify-center items-center rounded-full text-gray-700">+</span>
              <input
                type="file"
                id="contained-button-file"
                ref={uploadRef}
                name="file"
                onChange={changeHandler}
                className='hidden'
              />
            </label>
          }
          {
            isFilePicked ?
              <>
                <button
                  className="flex items-center justify-center bg-sky-200 box-border px-4 py-1 rounded-md"
                  onClick={handUploadFile}
                >
                  {
                    uploaded ?
                      <svg t="1648618566126" className="icon w-5 h-5" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7687" width="200" height="200"><path d="M878.933333 282.737778a53.475556 53.475556 0 0 0-69.973333 0L398.222222 641.706667l-162.133333-161.848889a52.906667 52.906667 0 0 0-69.973333 0 52.906667 52.906667 0 0 0 0 69.973333l197.12 197.12a53.191111 53.191111 0 0 0 69.973333 0L878.933333 352.711111a52.906667 52.906667 0 0 0 0-69.973333z" p-id="7688" fill="#1296db"></path></svg>
                      :
                      loading ?
                        <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
                        :
                        <svg t="1648616985256" className="icon w-5 h-5" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2194" width="200" height="200"><path d="M512 402.285714l146.285714 182.857143h-109.714285v256h-73.142858v-256h-109.714285l146.285714-182.857143z m0-256a256.036571 256.036571 0 0 1 254.171429 225.389715 237.750857 237.750857 0 0 1-44.507429 469.321142L713.142857 841.142857H658.285714v-73.142857h53.577143l7.241143-0.109714a164.571429 164.571429 0 0 0 38.436571-322.962286l-7.570285-1.938286-50.322286-11.446857-6.070857-51.2a182.893714 182.893714 0 0 0-361.947429-8.301714l-1.170285 8.265143-6.070858 51.2-50.285714 11.446857a164.571429 164.571429 0 0 0 29.037714 324.864L310.857143 768H365.714286v73.142857H310.857143a237.714286 237.714286 0 0 1-53.028572-469.504A256 256 0 0 1 512 146.285714z" fill="#ffffff" p-id="2195"></path></svg>
                  }
                </button>
                {
                  !loading &&
                  <button
                    className="flex items-center justify-center bg-sky-200 box-border px-4 py-1 rounded-md"
                    onClick={handleClearFile}
                  >
                    <svg t="1648618647684" className="icon w-5 h-5" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9413" width="200" height="200"><path d="M511.5 437c20.5 0 39.5 8.5 53 22s22 32.5 22 53-8.5 39.5-22 53-32.5 22-53 22-39.5-8.5-53-22-22-32.5-22-53 8.5-39.5 22-53 32.5-22 53-22z" fill="#388E3C" p-id="9414"></path><path d="M176 345c28-56.5 70.5-105.5 123-141.5 62.5-43 136.5-66 212.5-66 99.5 0 194.5 39.5 265 110s110 165.5 110 265-39.5 194.5-110 265-165.5 110-265 110c-94 0-184-35-253.5-98.5s-112-150-120-243.5l-1.5-15 59.5-5 1.5 15c7 78.5 42.5 151.5 101 205 58 53.5 134 82.5 212.5 82.5 84 0 163.5-33 222.5-92s92-139 92-222.5c0-84-33-163.5-92-222.5s-139-92-222.5-92c-64 0-126 19.5-178.5 55.5-41 28.5-74.5 65.5-98 109l-58.5-17v-1.5z" fill="#01579B" p-id="9415"></path><path d="M325.5 369.5l-141 47.5-14 4.5-5-14-47.5-141.5z" fill="#0091EA" p-id="9416"></path></svg>
                  </button>
                }
              </>
              :
              <button
                onClick={onSubmit}
                className="flex items-center justify-center bg-sky-200 box-border px-4 py-1 rounded-md"
              >
                <svg width={20} height={20} viewBox="0 0 24 24" tabIndex={-1}>
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="white" />
                </svg>
              </button>
          }
        </div>
      </form>
    </div>
  )
};


function FileItem({ selectedFile }) {
  return (
    <div>
      <p>
        <svg t="1648617733564" className="icon w-10 h-12" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2975" width="200" height="200"><path d="M853.333333 960H170.666667V64h469.333333l213.333333 213.333333z" fill="#90CAF9" p-id="2976"></path><path d="M821.333333 298.666667H618.666667V96z" fill="#E1F5FE" p-id="2977"></path></svg>
      </p>
      <p>文件名: {selectedFile.name}</p>
      <p>大小: {Math.floor(selectedFile.size / 1024)} KB</p>
    </div>
  )
}


export default TypingArea;
