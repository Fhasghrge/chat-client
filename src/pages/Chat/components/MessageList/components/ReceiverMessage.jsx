import moment from "moment";
import React from "react";
import ClockIcon from "./ClockIcon";
import AvatarImage from '@/components/AvatarImage';


const IMG_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

const ReceiverMessage = ({
  username = "user",
  message = "Lorem ipsum dolor...",
  date,
}) => (
  <div className="flex">
    <div className='flex-1'></div>
    <div style={{ width: "50%" }} className="text-right mb-4">
      <div
        className="px-3 py-2 bg-sky-100"
        style={{ borderRadius: 12 }}
      >
        <div className="ctext-wrap">
          <div
            className="text-left mb-1 flex items-center space-x-2"
            style={{
              fontWeight: 600,
            }}
          >
            <AvatarImage width={22} height={22} name={username} />
            <div>{username}</div>
          </div>
          {
            message.includes('-splits-') ?
              <RichMessage message={message} />
              :
              <p className="text-left py-3 border-y-2 border-gray-100 w-full break-words">{message}</p>
          }
          <p className="flex items-center justify-end text-xs text-gray-600 mt-2">
            <ClockIcon />
            <span className="ml-1">{moment.unix(date).calendar()}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
);


export function RichMessage({ message }) {
  const type = message.split('.').pop();
  if (IMG_TYPES.includes(type)) {
    return (
      <div className="flex flex-col border p-2 border-indigo-200 rounded">
        <img className="w-40 h-40 shadow-md" src={`http://localhost:4000/static/${message}`} alt="" />
      </div>
    )
  }
  return (
    <a
      href={`http://localhost:4000/static/${message}`}
      download={message.split('-splits-')[1]}
      className="flex justify-start items-center relative border p-2 border-indigo-200 rounded"
    >
      <svg t="1648624049221" className="icon w-16 h-16 self-end" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4623" width="200" height="200"><path d="M853.333333 960H170.666667V64h469.333333l213.333333 213.333333z" fill="#90CAF9" p-id="4624"></path><path d="M821.333333 298.666667H618.666667V96z" fill="#E1F5FE" p-id="4625"></path></svg>
      <svg t="1648624175461" className="icon w-4 h-6 self-end -ml-7 mr-4" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7712" width="200" height="200"><path d="M544 202.666667V405.333333h-64V202.666667a32 32 0 0 1 64 0zM653.226667 560.64l-102.4 78.933333a64.213333 64.213333 0 0 1-78.08 0l-101.973334-78.506666a32.085333 32.085333 0 1 1 39.253334-50.773334l69.973333 54.186667V405.333333h64v158.293334l69.973333-53.76a32.512 32.512 0 0 1 45.226667 5.973333 31.957333 31.957333 0 0 1-5.973333 44.8z" fill="#030835" p-id="7713"></path><path d="M938.666667 618.666667v21.333333a213.418667 213.418667 0 0 1-213.333334 213.333333H298.666667a213.12 213.12 0 0 1-213.333334-213.333333v-21.333333a213.12 213.12 0 0 1 213.333334-213.333334h181.333333v159.146667l-69.973333-54.186667a32.085333 32.085333 0 1 0-39.253334 50.773334l101.973334 78.506666a64.213333 64.213333 0 0 0 78.08 0l102.4-78.933333a31.957333 31.957333 0 0 0 5.973333-44.8 32.512 32.512 0 0 0-45.226667-5.973333l-69.973333 53.76V405.333333H725.333333a213.418667 213.418667 0 0 1 213.333334 213.333334z" fill="#FFB531" p-id="7714"></path></svg>
      <div className="self-end text-xl text-amber-500 pb-1">{message.split('-splits-')[1]}</div>
    </a>
  )
}

export default ReceiverMessage;
