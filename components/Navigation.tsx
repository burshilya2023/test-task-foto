'use client'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {signIn, signOut, useSession} from 'next-auth/react'
//auth have function SignIn and signOut
type navLink ={
    label:string,
    href:string
}
type Props={
    navLinks:navLink[]
}
export const Navigation =({navLinks}:Props)=>{
const pathname= usePathname()
const session =useSession() //email/name/image
return <>
        {navLinks.map((link, index)=>{
            const isActive=pathname===link.href 
            return <Link 
                key={index}
                href={link.href}
                className={isActive ? 'active':''}>
                {link.label}
                </Link>             
        })}
        {session?.data &&(<Link href='#' onClick={()=>signOut({callbackUrl:'/'})}>SignOut</Link>)} 
    </>
}