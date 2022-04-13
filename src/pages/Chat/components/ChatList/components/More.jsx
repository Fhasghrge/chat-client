import React, { useCallback, useEffect, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import * as api from '@/apis';
import Checkbox from '@mui/material/Checkbox';


export default function More({ dispatch }) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [diglogShow, setDiglogShow] = useState(false);

  const handleClick = useCallback((e) => {
    setAnchorEl(e.target);
    setOpen(pre => !pre)
  }, [])

  return (
    <div
      className="text-xl bg-white rounded-full w-6 h-6 flex justify-center items-center cursor-pointer"
    >
      <div onClick={handleClick}>+</div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setOpen(false)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => setDiglogShow(true)} className='text-sm flex space-x-2'>
          <svg t="1648556235058" className="icon w-6 h-6" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2213" width="200" height="200"><path d="M608 618.666667c70.4-34.133333 117.333333-106.666667 117.333333-189.866667 0-117.333333-96-213.333333-213.333333-213.333333s-213.333333 96-213.333333 213.333333c0 83.2 49.066667 155.733333 117.333333 189.866667-89.6 32-162.133333 110.933333-181.333333 209.066666-2.133333 10.666667 4.266667 23.466667 17.066666 25.6h4.266667c10.666667 0 19.2-6.4 21.333333-17.066666 23.466667-110.933333 121.6-192 234.666667-192s211.2 81.066667 234.666667 192c2.133333 10.666667 12.8 19.2 25.6 17.066666 10.666667-2.133333 19.2-12.8 17.066666-25.6-19.2-98.133333-89.6-174.933333-181.333333-209.066666z m-264.533333-189.866667c0-93.866667 76.8-170.666667 170.666666-170.666667s170.666667 76.8 170.666667 170.666667-76.8 170.666667-170.666667 170.666667c-96 0-170.666667-76.8-170.666666-170.666667zM258.133333 492.8c0-10.666667-6.4-19.2-17.066666-21.333333-61.866667-14.933333-72.533333-78.933333-72.533334-115.2 0-68.266667 46.933333-119.466667 108.8-119.466667 12.8 0 21.333333-8.533333 21.333334-21.333333s-8.533333-21.333333-21.333334-21.333334c-87.466667 0-151.466667 70.4-151.466666 162.133334 0 61.866667 21.333333 106.666667 57.6 134.4-59.733333 25.6-104.533333 76.8-117.333334 147.2-2.133333 10.666667 4.266667 23.466667 17.066667 25.6h4.266667c10.666667 0 19.2-6.4 21.333333-17.066667 14.933333-70.4 61.866667-117.333333 132.266667-128 10.666667-2.133333 19.2-12.8 17.066666-25.6zM962.133333 637.866667c-14.933333-70.4-57.6-121.6-117.333333-147.2 36.266667-27.733333 57.6-74.666667 57.6-134.4 0-91.733333-66.133333-162.133333-151.466667-162.133334-12.8 0-21.333333 8.533333-21.333333 21.333334s8.533333 21.333333 21.333333 21.333333c64 0 108.8 51.2 108.8 119.466667 0 36.266667-8.533333 100.266667-72.533333 115.2-10.666667 2.133333-14.933333 10.666667-14.933333 21.333333v2.133333c-2.133333 10.666667 6.4 23.466667 17.066666 23.466667 70.4 10.666667 117.333333 57.6 132.266667 128 2.133333 10.666667 10.666667 17.066667 21.333333 17.066667h4.266667c8.533333-2.133333 17.066667-14.933333 14.933333-25.6z" p-id="2214"></path></svg>
          <span>创建群组</span>
        </MenuItem>
      </Menu>
      {
        diglogShow &&
        <GroupCreateFrom
          handleClose={() => { setDiglogShow(false); setOpen(false) }}
          dispatch={dispatch}
        />
      }
    </div>
  )
}


function GroupCreateFrom({ handleClose, dispatch }) {
  const [friends, setFriends] = useState([]);

  const [groupName, setGroupName] = useState('');
  const [users, setUsers] = useState(new Set());

  const handleCreate = () => {
    api.createGroup(groupName, [...users]).then((res) => {
      dispatch({
        type: "add room",
        payload: { id: res.id, name: res.names[0] },
      });
      handleClose()
    })
  }
  useEffect(() => {
    api.getAllFriendsInfos().then(res => {
      setFriends(Object.values(res))
    })
  }, [])
  
  return (
    <Dialog
      open={true}
      onClose={handleClose}
      className='bg-gray-500 bg-opacity-50 dialog-form'
    >
      <DialogTitle className='text-base'>创建群组：</DialogTitle>
      <DialogContent>
        <div className='flex flex-col space-y-4 w-80 justify-center'>
          <div>
            <span className='font-bold'>群组名：</span>
            <input 
              className='bg-gray-100 px-1 pt-1 rounded' 
              type="text" 
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
          <div className='h-32 overflow-scroll relative'>
            <span className='sticky top-0 font-bold'>成员：</span>
            {
              friends.map((item) => (
                <div className='flex items-center justify-center' key={item.id}>
                  <span>{item.username}</span>
                  <Checkbox size='sm' onChange={(e) => {
                    if(e.target.checked) {
                      setUsers(pre => pre.add(item.id))
                    }else {
                      setUsers(pre => pre.delete(item.id))
                    }
                  }}/>
                </div>
              ))
            }
          </div>
        </div>
      </DialogContent>
      <DialogActions >
        <Button className='text-sky-600' onClick={handleClose}>取消</Button>
        <Button className='text-sky-600' onClick={handleCreate}>创建</Button>
      </DialogActions>
    </Dialog>
  )
}