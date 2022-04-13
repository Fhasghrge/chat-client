import { useState, useEffect, useCallback } from 'react'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import * as api from '@/apis';
import { useAppState } from '@/state'
import { notifyBaseConfig } from '@/util'

function useFriends() {
  const [state, dispatch] = useAppState();
  const [friends, setFriends] = useState([]);
  const [currentFrid, setCurrentFrid] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const searchUser = useCallback((searchKey) => {
    if (!searchKey.trim()) return;

    return api
      .search(searchKey)
      .then(res => {
        if (res.message) {
          return enqueueSnackbar(res.message, {
            ...notifyBaseConfig,
            variant: 'error'
          })
        }
        setCurrentFrid(res.data)
      })
  }, [])

  const addFriend = useCallback(async () => {
    const res = await api.addFriend(currentFrid.userId);
    if (res?.errcode === 0) {
      getFrids()
      return enqueueSnackbar('添加成功', {
        ...notifyBaseConfig,
        variant: 'success'
      })
    } else {
      enqueueSnackbar(res?.message, {
        ...notifyBaseConfig,
        variant: 'error'
      })
    }
  }, [currentFrid])

  const getFrids = useCallback(async () => {
    let timout;
    try {
      timout = setTimeout(() => {
        setLoading(true)
      }, 200);
      const allFridIds = await api.getAllFriends();
      
      if(allFridIds?.errcode !== 0) 
        return setError(allFridIds?.message);

      const fridInfos = await api.getUsers(allFridIds.data.friends);
      setFriends(Object.values(fridInfos))
    }catch(err) {
      setError(err.message)
    }finally {
      clearTimeout(timout)
      setLoading(false)
    }
  }, [])

  const contactFrid = useCallback(async (userId) => {
    const targetUser = state.users[userId];
    let roomId = targetUser?.room;
    if (roomId === undefined) {
      const room = await api.addRoom(userId);
      roomId = room.id;
      dispatch({ type: "set user", payload: { ...targetUser, room: roomId } });
      dispatch({
        type: "add room",
        payload: { id: roomId, name: room.names[0] },
      });
    }
    dispatch({ type: "set current room", payload: roomId });
    setTimeout(() => {
      navigate('/chat')
    }, 300);
  }, [])


  useEffect(() => {
    getFrids()
  }, []);

  return {
    error,
    loading,
    friends,
    currentFrid,
    setCurrentFrid,
    searchUser,
    addFriend,
    contactFrid
  }
}


export default useFriends;