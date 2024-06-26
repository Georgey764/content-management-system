"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import useScrollY from "../hooks/useScrollY.js";
import { useAuth } from "../hooks/AuthProvider.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Cloud,
  HomeIcon,
  Handshake,
  LogOut,
  Settings,
  User,
  CircleHelpIcon,
  LogIn,
  UserPlus,
  Menu,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation.js";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function HeaderComponent() {
  const value = useAuth();
  const path = usePathname();
  const [active, setActive] = useState(path);
  const router = useRouter();
  const scrollY = useScrollY();

  useEffect(() => {
    setActive(path);
  }, [path]);

  return (
    <header
      className={`fixed top-0 left-0 z-10 w-full flex flex-row items-center justify-between h-10 px-2 py-8 md:p-8 ${
        scrollY >= 80 ? "bg-white border-b border-gray-200" : ""
      }`}
      style={{
        transition: "background 0.1s, border 0.1s",
      }}
    >
      <Image
        src="/images/logo-no-bg.png"
        width={60}
        height={60}
        alt=" Zaad's Logo"
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="sm:hidden p-2 text-neutral h-10 w-10"
          >
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Navigation</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/">
            <DropdownMenuItem>
              <HomeIcon className="mr-2 h-4 w-4" />
              <span>Home</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/about">
            <DropdownMenuItem>
              <CircleHelpIcon className="mr-2 h-4 w-4" />
              <span>About</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/opportunities">
            <DropdownMenuItem>
              <Handshake className="mr-2 h-4 w-4" />
              <span>Opportunities</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/blog">
            <DropdownMenuItem>
              <Handshake className="mr-2 h-4 w-4" />
              <span>Blog</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />

          {value.session ? (
            <>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="cursor-pointer"
                onClick={(e) => {
                  value.signOut();
                  router.push("/login?success=Successfully%20Logged%20Out");
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href="/login">
                  <DropdownMenuItem>
                    <LogIn className="mr-2 h-4 w-4" />
                    <span>Sign In</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/signup">
                  <DropdownMenuItem>
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Register</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="hidden flex-row items-center sm:flex">
        <Breadcrumb className="mr-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">
                  {active === "/" ? (
                    <BreadcrumbPage name="/">Home</BreadcrumbPage>
                  ) : (
                    <span name="/">Home</span>
                  )}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/about">
                  {active === "/about" ? (
                    <BreadcrumbPage name="/about">About</BreadcrumbPage>
                  ) : (
                    <span name="/about">About</span>
                  )}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/opportunities">
                  {active === "/opportunities" ? (
                    <BreadcrumbPage name="/opportunities">
                      Opportunities
                    </BreadcrumbPage>
                  ) : (
                    <span name="/opportunities">Opportunities</span>
                  )}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/blog">
                  {active === "/blog" ? (
                    <BreadcrumbPage name="/blog">Blog</BreadcrumbPage>
                  ) : (
                    <span name="/blog">Blog</span>
                  )}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {value.session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  className="cursor-pointer"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-2">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={(e) => {
                  value.signOut();
                  router.push("/login?success=Successfully%20Logged%20Out");
                }}
              >
                <LogOut className="mr-2 h-4 w-4 " />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Button className="mr-2" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/signup">Register</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
