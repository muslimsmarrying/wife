import Header from '@/components/Header'
import ProfilePage from '@/components/Profile'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
  return (
    <>
        <Header/>
        <ProfilePage/>
    </>
  )
}

export default Page