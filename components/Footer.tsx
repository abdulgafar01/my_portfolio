'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import {
//   Github,
//   Twitter,
//    Linkedin,
//   Dribbble,
  Mail,
  ArrowRight,
  ArrowUp,
} from 'lucide-react'
import { Button } from './ui/button'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'

export const Footer = () => {
  return (
    <section className="bg-neutral-100 dark:bg-black-100 pt-40 ">
        {/* Floating Call to Action */}
      {/* <div className="w-[80%] mx-auto px-6"> */}
        {/* <div className="relative z-10 -mb-24">
          <div className="bg-linear-to-r from-gray-200 to-gray-300 rounded-2xl overflow-hidden h-96 relative group shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1549979047-f06bb9619b61?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-black/20 flex flex-col justify-center p-12 md:p-24">
              <h2 className="text-white text-5xl md:text-6xl font-bold max-w-2xl mb-8">
                Let's build something extraordinary together
              </h2>
              <Button className="bg-violet-600 text-white px-8 py-6 rounded-full w-fit flex items-center gap-3 font-semibold hover:bg-violet-700 transition-colors group">
                Send me an Email
                <div className="size-8 bg-white rounded-full flex items-center justify-center text-violet-600">
                  <ArrowRight className="size-5" />
                </div>
              </Button>
            </div>
          </div>
        </div> */}
      {/* </div> */}
      <div className="w-full mx-auto px-6">
        {/* Main Black Footer Area */}
        <div className="bg-black dark:bg-white rounded-t-3xl pt-40 pb-20 px-6 md:px-12 text-white dark:text-black-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start pb-8">
              <div className="space-y-12">
                <div className="text-4xl font-bold tracking-tighter italic">
                  <span className="text-2xl not-italic ml-1 uppercase">Abdulgafar</span>
                  <br />
                  <span className="text-5xl ml-2 uppercase">Busari</span>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                    Connect
                  </h4>
                  <div className="flex gap-4">
                    <a
                      href="https://github.com/abdulgafar01"
                      className="size-10 border border-gray-700 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                    >
                      <FaGithub className="size-5" />
                    </a>
                    
                    <a
                      href="https://www.linkedin.com/in/abdulgafar-busari/"
                      className="size-10 border border-gray-700 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                    >
                      <FaLinkedinIn className="size-5" />
                    </a>
                    
                    <a
                      href="mailto:abdulgafarbusari49@gmail.com"
                      className="size-10 border border-gray-700 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                    >
                      <Mail className="size-5" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-6 lg:text-right">
                <h3 className="text-lg font-medium text-gray-400">
                  Subscribe to my newsletter for design insights & updates
                </h3>
                <p className="text-sm text-gray-500 max-w-md lg:ml-auto">
                  Get weekly design tips, industry trends, and exclusive
                  resources delivered straight to your inbox.
                </p>
                <div className="relative max-w-md lg:ml-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-transparent border border-gray-700 rounded-full px-6 py-3 pr-12  text-white dark:text-black focus:outline-none focus:border-black-500 transition-colors"
                  />
                  <button type='submit' className="absolute right-2 top-1/2 -translate-y-1/2 size-10 dark:bg-black bg-white cursor-pointer rounded-full flex items-center justify-center  transition-colors">
                    <span className="text-xl text-black-100 dark:text-white">
                      <ArrowRight/>
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="py-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
              <span className="font-semibold text-lg">Abdulgafar Busari.</span>
              <span className="text-gray-500 text-sm">
                {new Date().getFullYear()}  All rights reserved.
              </span>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
              >
                Back to top
                <div className="flex size-10 items-center justify-center rounded-full bg-white text-black">
                  <ArrowUp className="size-5" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
