import React, { useState, useRef } from 'react';
import _ from 'lodash'
import { SearchOutlined } from '@mui/icons-material'
import AvatarImage from '@/components/AvatarImage';
export default function FriendList({
  friends,
  searchUser,
  currentFrid
}) {
  const [searchKey, setSearchKey] = useState('');
  const inputRef = useRef()
  return (
    <>
      <div className='h-10 flex items-center'>
        <input
          type="text"
          ref={inputRef}
          className='bg-slate-300 rounded-md w-full mr-2 text-sm 
            h-7 focus:outline-none p-2 focus:border-b border-gray-500'
          onChange={_.throttle(e => setSearchKey(e.target.value), 500)}
        />
        <span className='w-10'
          onClick={() => {
            searchUser(searchKey).then(() => {
              inputRef.current.value = '';
            })
          }}
        >
          <SearchOutlined />
        </span>
      </div>
      <div className='mt-3 overflow-hidden h-full' >
        <div className='overflow-scroll space-y-3'>
          {
            friends.length ?
              friends.map((props) => (
                <FriendItem
                  isMe={
                    currentFrid &&
                    (Number(currentFrid.userId) === Number(props.id))
                  }
                  searchUser={searchUser}
                  key={props.id}
                  {...props}
                />
              ))
              :
              <div className='uppercase text-center flex h-96'>
                <div className='m-auto text-gray-600 text-xl'>no friends</div>
              </div>
          }
        </div>
      </div>
    </>
  )
}

function FriendItem({
  username,
  searchUser,
  online,
  email,
  isMe
}) {
  return (
    <div
      className={`flex rounded-md py-2 border-gray-500 shadow hover:shadow-md ${isMe && 'bg-slate-50'}`}
      onClick={() => searchUser(username)}
    >
      <div className='bg-slate-200 rounded-full p-1 ml-1'>
        <AvatarImage name={username} />
      </div>
      <div className='ml-3'>
        <div className='font-bold'>{username}</div>
        <div className='text-xs text-gray-600'>{email}</div>
      </div>
      <div className={`ml-6 w-2 h-2 rounded-full ${online ? 'bg-green-400' : 'bg-gray-400'}`}></div>
    </div>
  )
}