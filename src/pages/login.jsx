import React, { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useSnackbar } from 'notistack';
import * as api from '../apis';

export default function LoginOrRegister({ onLogIn }) {
  const [loginOrRegis, setLoginOrRegis] = useState(true);

  return loginOrRegis ?
    <Login toRegister={() => setLoginOrRegis(false)} onLogIn={onLogIn} />
    :
    <Register toLogin={() => setLoginOrRegis(true)} />
}


function Login({ toRegister, onLogIn }) {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (target) => {
    const data = new FormData(target)
    const [
      ,
      username,
      password,
    ] = [...data.values()];
    onLogIn(username, password, (err) => {
      if (err) {
        return enqueueSnackbar(err, {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          },
          autoHideDuration: 1500
        })
      }
    })
  }

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-16 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={e => { e.preventDefault(); handleSubmit(e.target) }}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="username"
                  type="string"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockOutlinedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
              <div
                className='text-indigo-500 mt-2 text-center text-lg hover:cursor-pointer'
                onClick={toRegister}
              >
                Don&apos;t have an account? register now !
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

function Register({ toLogin }) {
  const { enqueueSnackbar } = useSnackbar();
  async function handleSubmit(target) {
    const data = new FormData(target)
    const [
      username,
      email,
      password,
      repassword
    ] = [...data.values()];
    if (password !== repassword) {
      return enqueueSnackbar(
        'Repeat-Password is not equal to Password',
        {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          },
          autoHideDuration: 2500
        }
      )
    }
    const res = await api.register(username, password, email);
    if (res.data?.username) {
      return enqueueSnackbar(
        'Register successfully, please login!',
        {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          },
          autoHideDuration: 2500
        }
      )
    }
    enqueueSnackbar(
      res.message || 'Something error',
      {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        },
        autoHideDuration: 1500
      }
    )
  }

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-16 text-center text-3xl font-extrabold text-gray-900">Register your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={e => { e.preventDefault(); handleSubmit(e.target) }}>
          <div className="rounded-md shadow-sm -space-y">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="string"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border 
                  border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md 
                  focus:outline-none focus:ring-indigo-500 
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border 
                border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none 
                focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full 
                px-3 py-2 border border-gray-300 placeholder-gray-500 
                text-gray-900 focus:outline-none focus:ring-indigo-500 
                focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="repassword"
                name="repassword"
                type="password"
                required
                className="appearance-none rounded-none relative block 
                w-full px-3 py-2 border border-gray-300 
                placeholder-gray-500 text-gray-900 
                rounded-b-md focus:outline-none 
                focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Repeat-Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full 
                flex justify-center py-2 px-4 border border-transparent text-sm font-medium 
                rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockOutlinedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
              Register
            </button>
            <div className='text-indigo-500 mt-2 text-center text-lg hover:cursor-pointer' onClick={toLogin}>Login now!</div>
          </div>
        </form>
      </div>
    </div>
  )
}