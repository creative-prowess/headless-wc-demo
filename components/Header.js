'use client'
import Image from 'next/image'
import Link from 'next/link'
import MiniCart from './MiniCart'
import WishlistButton from './WishlistButton'
import AccountMenu from './AccountMenu'
import { LuGitCompareArrows } from "react-icons/lu"
import { GiLindenLeaf,GiBleedingHeart,GiLockedHeart } from "react-icons/gi";
import { TbTruckDelivery } from "react-icons/tb";
import { useCompare } from '@/context/CompareContext'
import HeaderIcon from './HeaderIcon'
import { useState } from 'react'
import LoginModal from './LoginForm'
import { useToast } from '@/context/ToastContext'
import {signOut, useSession} from 'next-auth/react'

import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'

const products = [
  { name: 'Pure Ingredients', description: 'Hand-blended with Grannys favorite herbs & botanicals.', href: '#', icon: GiLindenLeaf },
  { name: 'Soothing Formulas', description: 'Gentle, effective care for every body and everybody.', href: '#', icon: GiBleedingHeart },
  { name: 'Family-Safe & Secure', description: 'Every batch tested for quality. Every order packed with care.', href: '#', icon: GiLockedHeart },
  { name: 'Fast Shipping', description: 'Straight from Grannys kitchen to your doorstep.', href: '#', icon: TbTruckDelivery },
  { name: 'Customer Joy', description: 'See why so many trust Grannys Naturals. Results that sparkle!', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

export default function Header() {

    const { showToast } = useToast()
    const { data: session, status } = useSession()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(false)
  const { count } = useCompare()
  return (
<div>
   <header className="bg-white">

    
    <div className="bg-brandblue text-white text-sm border-b-2 border-b-brandblue/50">
  <div className="max-w-7xl mx-auto flex justify-between items-center p-4 md:p-0 md:py-4">
    <div>
      📧 <a href="mailto:contact@consolepartsdepot.com" className="hover:underline">contact@consolepartsdepot.com</a>
    </div>
    <div className="flex space-x-4">
      <Link href="/account" className="hover:underline">My Account</Link>
{status === 'loading' ? null : session ? (
  <button
    onClick={() => {
      signOut()
      showToast(
        { name: 'You', customLink: { href: '/login', label: 'Log in again' } },
        'have been logged out.'
      )
    }}
  >
    Logout
  </button>
) : (
  <button onClick={() => setIsLoginOpen(true)}>Login</button>
)}

    </div>
  </div>
</div>
      <nav aria-label="Global" className="bg-brandblue">
        
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-0">
        <div className="flex lg:flex-1">
   <Link href="/" className="flex items-center">
          <Image
            src="/cpd-logo-transparent.webp"
            alt="Console Parts Depot Logo"
            width={320}
            height={75}
            className="object-contain h-auto"
            priority
          />
        </Link>

        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
              Product
              <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute left-1/2 z-[9999] mt-3 w-screen max-w-96 -translate-x-1/2 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
            >
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                  >
                    <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
                    </div>
                    <div className="flex-auto">
                      <a href={item.href} className="block font-semibold text-gray-900">
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                {callsToAction.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100"
                  >
                    <item.icon aria-hidden="true" className="size-5 flex-none text-gray-400" />
                    {item.name}
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            Features
          </a>
          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            Marketplace
          </a>
          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            Company
          </a>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">

  <div className="flex items-center gap-4">
          <HeaderIcon href="/compare" Icon={LuGitCompareArrows} count={count} label="Compare" />
          <WishlistButton />
          <MiniCart />
        </div>
 
        </div>
          </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    Product
                    <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...products, ...callsToAction].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Company
                </a>
              </div>
              <div className="py-6">
   <button onClick={() => setIsLoginOpen(true)}>Login</button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
      
    </header>
          <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
            </div>
  )
}
