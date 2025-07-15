import React from 'react'
import { Link, useLocation } from 'react-router'

export default function DashboardSideBar({ navItems }) {
    const { pathname:path } = useLocation()
    return (
        <nav className='space-y-4 w-56'>
            {
                navItems?.map((nav, idx) =>
                    <Link to={nav?.path} key={idx} className={`flex w-full items-center px-4 py-2  ${path == nav?.path ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 "} rounded-md`}>
                        { 
                            nav?.icon && <nav.icon />
                        }
                        <span className="mx-4 font-medium">{nav?.title}</span>
                    </Link>
                )
            }

        </nav>
    )
}
