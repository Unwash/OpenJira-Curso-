import Head from 'next/head'
import Image from 'next/image'
import {Typography} from "@mui/material"
import { NextPage } from 'next'
import { Layout } from '@/components/layouts/Layout'

 const  HomePage : NextPage = () => {
  return (
    <Layout>
    <Typography variant='h1' color="primary">Hola mundo</Typography>
    </Layout>
  )
}

export default HomePage
