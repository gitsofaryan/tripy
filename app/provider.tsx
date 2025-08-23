"use client"
import React, { useContext, useEffect, useState } from 'react'
import { useMutation } from 'convex/react'
import Header from './_components/Header';
import { useUser } from '@clerk/nextjs'
import { api } from '@/convex/_generated/api';
import { CreateNewUSer } from '@/convex/user';
import { UserDetailContext } from '@/context/UserDetailContext';

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const CreateUser = useMutation(api.user.CreateNewUSer)
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState<any>();


  useEffect(() => {
    user && CreateNewUser();
  }, [user])

  const CreateNewUser = async () => {
    // Logic to create a new user
    const result = await CreateUser({
      email: user?.primaryEmailAddress?.emailAddress,
      imageUrl: user?.imageUrl,
      name: user?.fullName ? user?.fullName : ''
    });
    setUserDetail(result);

  }

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <div>
        <Header />
        {children}
      </div>
    </UserDetailContext.Provider>
  )
}

export default Provider

export const useUserDetail = () => {
  return useContext(UserDetailContext);
}