import React, { createElement } from 'react';
import {
  GroupOutlined,
  ChatBubbleOutlineOutlined,
  SettingsApplicationsOutlined,
  LogoutOutlined
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AvatarImage from './AvatarImage';

const OPTIONS = [
  {
    comp: ChatBubbleOutlineOutlined,
    path: '/chat',
  }, {
    comp: GroupOutlined,
    path: '/friends'
  }, {
    comp: SettingsApplicationsOutlined,
    path: '/settings'
  }
]
export default function Switch({ user, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate()
  return (
    <div className=
      'switch space-y-10 text-xl flex flex-col items-center pt-10 relative h-screen'
    >
      {
        OPTIONS.map(({ comp, path }) => {
          return (
            <div className={`hover:text-blue-500 hover:scale-105 ${path === location.pathname ? 'text-blue-500' : ''}`}
              key={path}
            >
              <Link to={path}>{createElement(comp)}</Link>
            </div>
          )
        })
      }
      <div className='absolute bottom-6 flex items-center flex-col'>
        <div className='bg-blue-500 rounded-full 
                h-8 w-8 text-center leading-8
                text-yellow-300 text-sm hover:scale-110'
            title={user?.username || 'none'}
            onClick={() => navigate('/settings')}
        >
          <AvatarImage name={user.username} />
        </div>
        <div
          className="loginout hover:text-blue-500 hover:scale-110 
              text-2xl mt-4"
          onClick={onLogout}
        >
          <LogoutOutlined />
        </div>
      </div>
    </div>
  )
}