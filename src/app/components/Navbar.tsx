"use client"

import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { CaretDownIcon } from '@radix-ui/react-icons';   
import LoginLogoutButton from './LoginLogoutButton';

type ListItemProps = {
  className?: string
  children?: React.ReactNode
  title?: string
  href: string
}

const Navbar:React.FC = () => {

 


  return (
    <NavigationMenu.Root className="fixed bg-white flex w-screen justify-center z-20">
      <NavigationMenu.List className="center shadow-blackA4 m-0 flex list-none rounded-[6px] p-1">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
            Materyales{' '}
            <CaretDownIcon
              className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
              aria-hidden
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto">
            <ul className="one m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[500px] sm:grid-cols-[0.75fr_1fr]  ">
              <li className="row-span-3 grid">
                <NavigationMenu.Link asChild>
                  <a
                    className="focus:shadow-violet7 from-purple9 to-indigo9 flex
                    h-full w-full select-none flex-col justify-end rounded-[6px] bg-gradient-to-b p-[15px] no-underline outline-none focus:shadow-[0_0_0_2px]"
                    href="/"
                  >
                     
                    <div className="mt-4 mb-[7px] text-[18px] font-medium leading-[1.2] text-white">
                      Materyales Online Estimates
                    </div>
                    <p className="text-mauve4 text-[14px] leading-[1.3]">
                      Let's build it!
                    </p>
                  </a>
                </NavigationMenu.Link>
              </li>

              <ListItem href="#" title="Home">
                Materyales helps you to estimate your projects be it DIY or a professional venture
              </ListItem>
              <ListItem href="#" title="About">
                Materyales helps you to estimate your projects be it DIY or a professional venture
              </ListItem>
              <ListItem href="#" title="Contact Us">
                Send us a message for inquiry or an question.
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
            Estimates{' '}
            <CaretDownIcon
              className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
              aria-hidden
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute top-0 left-0 w-full sm:w-auto">
            <ul className="m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[600px] sm:grid-flow-col sm:grid-rows-3">
              <ListItem title="Tiles" href="#">
                Ceramic tiles, marbles, granites, travertine, grouts 
              </ListItem>
              <ListItem title="Painting" href="#">
                Top coats, primer, sanding
              </ListItem>
              <ListItem title="Modular Cabinet" href="#">
                Boards, MDFs, hinges, handles
              </ListItem>
              <ListItem title="Simple Shelves" href="#">
                Boards, brackets
              </ListItem>
              <ListItem title="Ceiling" href="#">
                Fiber cement board, metal furring, black screw
              </ListItem>
              <ListItem title="Roofing" href="#">
                Purlins, rafters, roof sheets, terra cotta
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        
          <LoginLogoutButton />
       

        <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
          <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
        <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
      </div>
    </NavigationMenu.Root>
  );
};

const ListItem = React.forwardRef<any, ListItemProps >(({ className, children, title, ...props }, forwardedRef) => (
  <li>
    <NavigationMenu.Link asChild>
      <a
        className={classNames(
          'focus:shadow-[0_0_0_2px] focus:shadow-violet7 hover:bg-mauve3 block select-none rounded-[6px] p-3 text-[15px] leading-none no-underline outline-none transition-colors',
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <div className="text-violet12 mb-[5px] font-medium leading-[1.2]">{title}</div>
        <p className="text-mauve11 leading-[1.4]">{children}</p>
      </a>
    </NavigationMenu.Link>
  </li>
));

//for typing error
ListItem.displayName = 'ListItem'

export default Navbar;