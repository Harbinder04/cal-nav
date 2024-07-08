"use client"
import React, { useRef, useState } from 'react'
import {motion} from 'framer-motion'
import Link from 'next/link'

function SlideTabs() {
  const [position , setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0
  })

  return (
    <ul
    onMouseLeave={()=>{setPosition((pv)=>({...pv,opacity: 0}))}} // used rounded bracket syntax because directly returning object literal
    className='relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1'>
        <Tab href='#Home' setPosition={setPosition}>Home</Tab>
        <Tab href='/Home' setPosition={setPosition}>Pricing</Tab>
        <Tab href='/Home' setPosition={setPosition}>Docs</Tab>
        <Tab href='/Home' setPosition={setPosition}>Blogs</Tab>
        <Cursor position={position}/>
    </ul>
  )
}

export default SlideTabs

const Tab = ({children, setPosition, href}: {children: React.ReactNode, 
  setPosition: React.Dispatch<React.SetStateAction<{
    left: number;
    width: number;
    opacity: number;
}>>,
href: string
}) =>{
  const ref = useRef<HTMLLIElement>(null);

  const handleMouseEnter = () =>{
    if(!ref.current){
      return;
    }
    const {width} = ref.current.getBoundingClientRect();
    console.log(width);
    // console.log(data.width);
    setPosition({
      width, 
      opacity: 1,
      left: ref.current.offsetLeft
    });
  }
    return (
      <Link href={href}>
        <li
        ref={ref}
        onMouseEnter={handleMouseEnter} className='relative z-10 block cursor-pointer px-3 py-1.5 text-lg uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base'>
            {children}
        </li>
        </Link>
    );
  }

const Cursor = ({position}: {position: {left: number,
  width: number,
  opacity: number}}) =>{
  return (
    <motion.li 
    animate={position}
    className={`absolute z-0 h-10 rounded-full bg-black md:h-20`}></motion.li>
  )
}