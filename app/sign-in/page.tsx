import Footer from '@/components/Footer'
import Header from '@/components/Header'
import LoginForm from '@/components/mvpblocks/login-form1'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
  return (
    <div>
        <Header/>
        <LoginForm/>
        <Footer/>
    </div>
  )
}

export default Page