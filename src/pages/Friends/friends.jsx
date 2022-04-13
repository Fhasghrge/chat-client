import React from 'react'
import useFriends from './useFriends';
import FriendList from './components/friendsList'
import Profile from './components/Profile';

export default function Friends() {
  const {
    loading,
    friends,
    currentFrid,
    searchUser,
    addFriend,
    contactFrid
  } = useFriends()

  return (
    <div className="h-full flex">
      <div className="col-span-2 w-80 py-2 px-2 h-full overflow-scroll box-border bg-slate-200">
        {
          loading ? 
            <div>loading</div>
            :
            <FriendList currentFrid={currentFrid} friends={friends} searchUser={searchUser} />
        }
      </div>
      <div className="w-full">
        <Profile
          user={currentFrid}
          isMyFriend={friends.some(item => Number(item.id) === currentFrid?.userId)}
          handleAddFriend={addFriend}
          contactFrid={contactFrid}
        />
      </div>
    </div>
  )
}
