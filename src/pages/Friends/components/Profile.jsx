import React from 'react';
import moment from 'moment'
import Logo from '@/components/Logo'
import AvatarImage from '@/components/AvatarImage';

export default function Profile({
  user,
  isMyFriend,
  handleAddFriend,
  contactFrid
}) {
  if (!user) return (
    <div
      className='text-center text-4xl text-gray-400 selection:bg-indigo-300 
            h-full flex justify-center items-center'
    >
      <Logo />
    </div>
  )

  return (
    <div className='flex flex-col p-8'>
      <div >
        <div className='flex items-center m-auto justify-center space-x-8'>
          <div className='p-1 rounded-full bg-zinc-400'>
            <AvatarImage name={user.username} height={40} width={40}/>
          </div>
          <div>
            <div className='text-bold text-xl text-gray-700'>{user.username}</div>
            <div className='text-gray-500 text-sm'>{user.email}</div>
          </div>
        </div>
        <div className='w-1/2 m-auto mt-8 flex flex-col space-y-8'>
          <div>
            <span className='block'>自我介绍：</span>
            <div className='indent-3 text-gray-700 mt-2 text-sm'>{user?.selfintroduce}</div>
            </div>
          <div>
            <span className='block'>居住地：</span>
            <div className='indent-3 text-gray-700 mt-2 text-sm'>{user?.location}</div>
            </div>
          <div>
            <span className='block'>国家：</span>
            <div className='indent-3 text-gray-700 mt-2 text-sm'>{user?.country}</div>
          </div>
          <div>
            <span className='block'>真实姓名：</span>
            <div className='indent-3 text-gray-700 mt-2 text-sm'>{user?.realname}</div>
          </div>
          <div>
            <span className='block'>创建时间：</span>
            <div className='indent-3 text-gray-700 mt-2 text-sm'>{moment(user?.createDate).format('L')}</div>
          </div>
        </div>
      </div>
      <div className="actions mt-8 flex space-x-3 justify-center">
        {
          isMyFriend ?
            <div className="action-btn cursor-pointer" onClick={() => contactFrid(user.userId)}>Contact</div>
            :
            <div className="action-btn" onClick={handleAddFriend}>AddToFriend</div>
        }
      </div>
    </div>
  )
}