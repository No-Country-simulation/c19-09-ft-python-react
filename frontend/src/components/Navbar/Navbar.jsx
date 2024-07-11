"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from 'react'

const categories = [
  { name: 'Todos', path: 'todos' },
  { name: 'Utensilios de cocina', path: 'utensilios' },
  { name: 'Muebles', path: 'muebles' },
  { name: 'juguetes', path: 'juguetes' },
  { name: 'Accesorios', path: 'accesorios' },
  { name: 'Calzado', path: 'calzado' },
];

const Navbar = () => {

  const [menuClicked, setMenuClicked] = useState(true)

  const handleClick = () => {
    setMenuClicked(prevState => !prevState)
  }

  return (
    <>
      <ul className={`${menuClicked ? 'hidden' : ''} z-50 absolute bg-primary text-white top-0 right-0 w-[256px] p-[24px] h-full text-[18px] sm:flex sm:items-center sm:w-[600px] sm:place-content-around sm:p-0 sm:h-auto sm:relative sm:text-[16px]`}>
      <Link href="/" legacyBehavior>
        <li className={`${menuClicked ? 'hidden' : ''} cursor-pointer sm:hidden  flex place-content-end`}>
          <Image className='w-8 h-8 mb-[87px]' src='/icons/icon-menu-close.svg' onClick={handleClick} alt="logo" width={32} height={32} />
        </li>
        </Link>
        {categories.map((category) => (
          <li key={category.path} className='mb-8 sm:mb-0'>
            <Link legacyBehavior  href={`/Products/${category.path}` }>
              <a className='hover:border-b-2 border-white'>{category.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <Image className={`${menuClicked ? '' : 'hidden'} w-10 h-4 cursor-pointer sm:hidden`} src='/icons/icon-menu.svg' onClick={handleClick} alt="" width={100} height={100}/>
    </>
  )
}

export default Navbar