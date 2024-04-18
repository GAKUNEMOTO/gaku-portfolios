import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
<div className='border sticky top-full'>
        <div className="container h-16 flex gap-1 items-center">
            <p className='text-muted-foreground'>© Gaku Nemoto</p>
            <span className="flex-1"></span>
            <Button size="icon" asChild variant='ghost'>
                <Link href="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-mountain-snow"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/><path d="M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19"/></svg>
                </Link>
            </Button>   
        </div>
    </div>
  )
}
