"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navbarItem } from "./menu";
import { signOut, useSession } from "next-auth/react";

export default function App() {
  const pathname = usePathname();
  const { data: session } = useSession();
  // if(pathname === "/login" || pathname === "/signup"){
  //   return null
  // }
  return (
    <Navbar className="bg-blue-200 " disableAnimation>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="start">
        <NavbarBrand>
          <Image
            width={40}
            className="mr-4 rounded-full"
            height={40}
            src={"/assets/pic.jpg"}
            alt={""}
          />
          <p className="font-bold text-inherit">JESS SHOP</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4 lg: " justify="start">
        <NavbarBrand>
          <Image
            width={40}
            className="mr-4 rounded-full"
            height={40}
            src={"/assets/pic.jpg"}
            alt={""}
          />
          <p className="font-bold text-inherit">JESS SHOP</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4 lg: " justify="center">
        {navbarItem.map((item, index: any) => (
          <NavbarItem key={index}>
            <Link
              color="foreground"
              href={item.path}
              className={`${
                pathname === item.path && "font-bold text-blue-800"
              }`}
            >
              {item.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/dashboard">Dashboard</Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          {session ? (
            <div className="flex gap-5">
              <Image
                src={session.user?.image as string}
                width={40}
                height={40}
                alt=""
                className="object-cover rounded-full"
              />
              <Button
                as={Link}
                onClick={() => signOut()}
                className="bg-gradient-to-r from-blue-500 to-pink-400 text-white"
                href="/login"
                variant="flat"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <Button
              as={Link}
              className="bg-gradient-to-r from-blue-500 to-pink-400 text-white"
              href="/login"
              variant="flat"
            >
              Login
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {navbarItem.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === navbarItem.length - 1
                  ? "danger"
                  : "foreground"
              }
              href={item.path}
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarItem className="w-full text-[18px]">
          <Link href="/dashboard">Dashboard</Link>
        </NavbarItem>
        <NavbarItem className="w-full text-[18px]">
          <Link href="/dashboard">Login</Link>
        </NavbarItem>
      </NavbarMenu>
    </Navbar>
  );
}
