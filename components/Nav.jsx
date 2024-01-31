"use client";

import { useState, useEffect } from "react";
import {
  singIn,
  signOut,
  useSession,
  getProviders,
  signIn,
} from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const Nav = () => {
  const isUserLogged = true;
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setProvidersF = async () => {
      const response = getProviders();
      setProviders(response);
    };
    setProvidersF();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo4.png"
          alt="Promptekey logo"
          width={45}
          height={45}
          className="object-contain"
        />
        <p className="logo_text">Promptekey</p>
      </Link>
      {/*Desktop navigation*/}
      <div className="sm:flex hidden ">
        {isUserLogged ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign out
            </button>
            <Link href="/profile">
              <Image
                src="/assets/images/profile.svg"
                alt="Profile"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                <button
                  key={provider.name}
                  type="button"
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign in
                </button>;
              })}
          </>
        )}
      </div>
      {/*Mobile navigation*/}
      <div className="sm:hidden flex relative">
        {isUserLogged ? (
          <div className="flex">
            <Image
              src="/assets/images/profile.svg"
              alt="Profile"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  className="mt-5 w-full black_btn"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                <button
                  key={provider.name}
                  type="button"
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign in
                </button>;
              })}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
