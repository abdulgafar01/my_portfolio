import {delay, m} from 'framer-motion'
import { Component } from 'react';

    const revealVariants = {
    hidden: { opacity: 0, y: 20 },
    show: (index: number) => ({ opacity: 1,
         y: 0, 
        transition: { duration: 0.55, delay: index * 0.1 } })
  };   

  const staggerParent = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

type RevealTag = "div" | "span" | "p" | "li" | "ul" |   "section" | "article" | "header" | "footer" | "main" | "aside" | "nav";

export const RevelGroup = ({
    as = 'div',
    ...props
}: {
    as?: RevealTag,
    [key: string]: any
}) => {


  const Component = m[as] as typeof m.div
  return <Component
    initial="hidden"
    whileInView="show"
    variants={staggerParent}
    viewport={{once:true}}
    {...props}
    >
    
  </Component>
}

export const Revel = ({
    as = 'div',
    ...props
}: {
    as?: RevealTag,
    [key: string]: any
}) => {


  const Component = m[as] as typeof m.div
  return <Component
  
    variants={revealVariants}
    {...props}
    >
    
  </Component>
}

