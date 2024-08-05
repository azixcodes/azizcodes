"use client";
import * as React from "react";
import { useRouter, usePathname } from "next/navigation";

import { motion } from "framer-motion";
import { useStore } from "@/context/context-provider";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { projects } from "@/constants/projects";
import Link from "next/link";
import { links } from "@/constants/nav-links";
import { suggestions } from "@/constants/command-list";
import { LayoutPanelLeft, Menu, Search } from "lucide-react";

const Navbar = () => {
  const { open: sidebarOpen, setOpen: setSidebarOpen } = useStore();
  const [openMenu, setOpneMenu] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const pathName = usePathname();
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  const handleItemClick = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpneMenu(false);
        e.stopPropagation();
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="h-7 shadow-md w-full bg-bgNavbar border-b !sticky select-none top-0 left-0 z-50 flex items-center justify-between px-3 gap-5">
      <div className="space-x-1 items-center   hidden md:flex">
        {links.map((link) => (
          <Link
            href={`/${link}`}
            className={`text-[10px] xl:text-sm px-2 py-0.5 rounded-sm hover:bg-[#3f3f3f] ${
              pathName === `/${link}` && "text-sky-500"
            }`}
            key={link}
          >
            {link}
          </Link>
        ))}
      </div>

      <div
        className="md:hidden hover:bg-[#3f3f3f] flex items-center justify-center h-5 w-5 relative"
        ref={menuRef}
      >
        <Menu
          strokeWidth={1.5}
          className="w-3 h-3 cursor-pointer"
          onClick={() => setOpneMenu(!openMenu)}
        />
        {openMenu && (
          <motion.div
            className="flex flex-col gap-2 h-auto py-3 rounded-md w-44 absolute top-6 shadow-lg px-3 left-2 bg-bgMain  border-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {links.map((link) => (
              <Link
                href={`/${link}`}
                className={`text-[10px] xl:text-sm px-2 py-0.5 rounded-sm hover:bg-[#3f3f3f] ${
                  pathName === `/${link}` && "text-sky-500"
                }`}
                key={link}
                onClick={() => setOpneMenu(false)}
              >
                {link}
              </Link>
            ))}
          </motion.div>
        )}
      </div>

      <>
        <div
          className="flex items-center border px-2 py-[1px] space-x-2 rounded-sm bg-transparent flex-1  border-[#3f3f3f] justify-between cursor-pointer hover:bg-muted hover:border-slate-700 w-full max-w-sm"
          onClick={() => setOpen(true)}
        >
          <Search className="w-4 h-4 text-muted-foreground " />
          <p className="text-[10px] text-muted-foreground ">
            Press
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded   px-1.5  font-semobild text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>J
            </kbd>
          </p>
          <div></div>
        </div>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Explore the portfolio" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {suggestions.map((suggestion, index) => {
                const Icon = suggestion.icon;
                return (
                  <CommandItem
                    className="!py-1 my-2  cursor-pointer"
                    key={index}
                  >
                    <div
                      className="flex items-center space-x-2"
                      onClick={() => handleItemClick(suggestion.path)}
                    >
                      <Icon className="!w-4 !h-4" strokeWidth={0.9} />
                      <span className="text-xs">{suggestion.label}</span>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Projects">
              {projects.map((project, index) => (
                <CommandItem className="!py-1 my-2  cursor-pointer" key={index}>
                  <div
                    onClick={() => handleItemClick(`/projects/${project.id}`)}
                  >
                    <span>{project.title}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </>

      <div className="justify-end flex items-center">
        <div
          className={`h-5 w-5 rounded-sm hover:bg-[#3f3f3f] flex items-center justify-center ${
            sidebarOpen && "bg-[#3f3f3f]"
          }`}
        >
          <LayoutPanelLeft
            className="w-3 h-3 cursor-pointer"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
