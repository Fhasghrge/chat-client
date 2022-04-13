import React, { useEffect, useState } from 'react';
import * as api from '@/apis'
import { useSnackbar } from 'notistack'
import { notifyBaseConfig } from '@/util'
import moment from 'moment'
import { EditLogo, EmailLogo, SuccessLogo } from './svgs'

export default function Setting({ user }) {
  const [userinfo, setUserinfo] = useState({});
  const { enqueueSnackbar } = useSnackbar()
  const handleSubmit = async (target) => {
    const data = new FormData(target);
    const [selfintroduce, realname, location, country] = [...data.values()];
    const updateRes = await api.updateSelfInfo({
      selfintroduce, 
      realname, 
      location, 
      country
    })
    if(!updateRes.errocde) {
      console.log(updateRes);
      enqueueSnackbar('修改成功', {
        ...notifyBaseConfig,
        variant: 'success'
      })
    }else {
      enqueueSnackbar(updateRes.message || '修改失败', {
        ...notifyBaseConfig,
        variant: 'error'
      })
    }
  }

  useEffect(() => {
    api.search(user.username).then((res) => {
      setUserinfo(res.data)
    })
  }, [user]);

  return (
    <div>
      <form id="login" onReset={(e) => {e.target.reset()}} onSubmit={(e) => {e.preventDefault(); handleSubmit(e.target)}}>
        <div className="bg-white dark:bg-gray-800">
          <div className="container mx-auto bg-white dark:bg-gray-800 rounded">
            <div className=" border-b border-gray-300 dark:border-gray-700 py-5 bg-white dark:bg-gray-800">
              <div className="flex w-11/12 mx-auto items-center">
                <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">Profile</p>
              </div>
            </div>
            <div className="mx-auto">
              <div className="w-11/12 mx-auto">
                <div className="rounded relative mt-8 h-48">
                  <img src="https://cdn.tuk.dev/assets/webapp/forms/form_layouts/form1.jpg" alt="" className="w-full h-full object-cover rounded absolute shadow" />
                  <div className="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded"></div>
                  <div className="flex items-center px-3 py-2 rounded absolute right-0 mr-4 mt-4 cursor-pointer">
                    <p className="text-xs text-gray-100">编辑背景图</p>
                    <div className="ml-2 text-gray-100">
                      <EditLogo />
                    </div>
                  </div>
                  <div className="w-20 h-20 rounded-full bg-cover bg-center bg-no-repeat absolute bottom-0 -mb-10 ml-12 shadow flex items-center justify-center">
                    <img src={`https://avatars.dicebear.com/api/micah/${userinfo.username}.svg`} alt="" className="absolute z-0 h-full w-full object-cover rounded-full shadow top-0 left-0 bottom-0 right-0" />
                    <div className="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded-full z-0"></div>
                    <div className="cursor-pointer flex flex-col justify-center items-center z-10 text-gray-100">
                      <EditLogo />
                      <p className="text-xs text-gray-100">编辑头像</p>
                    </div>
                  </div>
                </div>

                <div className="mt-16 flex flex-col w-1/3">
                  <label
                    className="py-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                  >
                    用户名
                  </label>
                  <div
                    className='text-gray-600 dark:text-gray-400 text-lg indent-4 cursor-not-allowed'
                    title='用户名无法修改'
                  >
                    {userinfo.username}
                  </div>
                </div>
                <div className="mt-6 flex flex-col w-2/3">
                  <label
                    className="py-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                  >
                    注册时间
                  </label>
                  <div
                    className='text-gray-600 dark:text-gray-400 indent-4 cursor-not-allowed text-sm mt-2'
                  >
                    {moment(userinfo.createDate).format('L')} （第{userinfo.userId}位用户）
                  </div>
                </div>
                <div className="mt-8 flex flex-col w-2/3">
                  <label
                    htmlFor="about"
                    className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                  >自我介绍</label>
                  <textarea
                    id="about"
                    name="about"
                    defaultValue={userinfo.selfintroduce}
                    required
                    className="bg-transparent border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 resize-none placeholder-gray-500 text-gray-600 dark:text-gray-400"
                    placeholder="介绍一下自己"
                    rows="5">
                  </textarea>
                  <p className="w-full text-right text-xs pt-1 text-gray-600 dark:text-gray-400">不超过100字</p>
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto bg-white dark:bg-gray-800 mt-10 rounded px-4">
            <div className=" border-b border-gray-300 dark:border-gray-700 py-5">
              <div className="flex w-11/12 mx-auto items-center">
                <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">个人信息</p>
              </div>
            </div>
            <div className="mx-auto pt-4">
              <div className="container w-11/12 mx-auto">
                <div className="w-1/3 flex flex-col mb-6">
                  <label htmlFor="realname" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">真实姓名</label>
                  <input
                    tabIndex="0"
                    type="text"
                    id="realname"
                    name="realname"
                    defaultValue={userinfo.realname}
                    required
                    
                    className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-600 dark:text-gray-400"
                    placeholder=""
                  />
                </div>
                <div className="flex flex-col mb-6 w-1/2">
                  <label htmlFor="Email" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">Email</label>
                  <div tabIndex="0" className="focus:outline-none py-3 dark:text-gray-100 flex items-center space-x-3">
                    <EmailLogo />
                    <div className='text-gray-400'>{userinfo.email}</div>
                    <div className='flex items-center space-x-1 text-green-500'>
                      <SuccessLogo />
                      <div className='text-xs'>已验证</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col mb-6 w-1/3">
                  <label htmlFor="City" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">居住地</label>
                  <div className="border border-gray-300 dark:border-gray-700 shadow-sm rounded flex">
                    <input
                      tabIndex="0"
                      type="text"
                      id="City"
                      defaultValue={userinfo.location}
                      name="city"
                      required
                      className="pl-3 py-3 w-full text-sm focus:outline-none border border-transparent focus:border-indigo-700 bg-transparent rounded placeholder-gray-500 text-gray-600 dark:text-gray-400"
                      placeholder="成都"
                    />
                  </div>
                </div>
                <div className="flex flex-col mb-6 w-1/3">
                  <label htmlFor="Country" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">国家</label>
                  <input
                    tabIndex="0"
                    type="text"
                    id="Country"
                    defaultValue={userinfo.country}
                    name="country"
                    required
                    className="border bg-transparent border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-600 dark:text-gray-400"
                    placeholder="中国"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto w-11/12 mt-20 pb-20">
            <div className="w-full py-4bg-white dark:bg-gray-800 flex justify-end">
              <button
                role="button"
                aria-label="cancel form"
                className="bg-gray-200 focus:outline-none transition duration-150 ease-in-out hover:bg-gray-300 dark:bg-gray-700 rounded text-indigo-600 dark:text-indigo-600 px-6 py-2 text-xs mr-4 focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                type='reset'
              >
                取消
              </button>
              <button
                role="button"
                aria-label="Save form"
                className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-2 text-sm"
                type="submit"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}