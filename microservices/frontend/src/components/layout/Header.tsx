import { ThemeSwitch } from '@app/components/theme/ThemeSwitch';

export const Header = () => {
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <div className="flex items-center justify-between">
          <div className="mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="30" fill="currentColor">
              <path d="M192 32c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32V64h48c26.5 0 48 21.5 48 48V240l44.4 14.8c23.1 7.7 29.5 37.5 11.5 53.9l-101 92.6c-16.2 9.4-34.7 15.1-50.9 15.1c-19.6 0-40.8-7.7-59.2-20.3c-22.1-15.5-51.6-15.5-73.7 0c-17.1 11.8-38 20.3-59.2 20.3c-16.2 0-34.7-5.7-50.9-15.1l-101-92.6c-18-16.5-11.6-46.2 11.5-53.9L96 240V112c0-26.5 21.5-48 48-48h48V32zM160 218.7l107.8-35.9c13.1-4.4 27.3-4.4 40.5 0L416 218.7V128H160v90.7zM306.5 421.9C329 437.4 356.5 448 384 448c26.9 0 55.4-10.8 77.4-26.1l0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 501.7 417 512 384 512c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4c18.1-4.2 36.2-13.3 50.6-25.2c11.1-9.4 27.3-10.1 39.2-1.7l0 0C136.7 437.2 165.1 448 192 448c27.5 0 55-10.6 77.5-26.1c11.1-7.9 25.9-7.9 37 0z" />
            </svg>
          </div>
          <a className="hidden h-6 text-2xl font-semibold sm:block" href="/">
            Relegatio
          </a>
        </div>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        <a className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block" href="/blog">
          Blog
        </a>
        <a className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block" href="/tags">
          Tags
        </a>
        <a className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block" href="/about">
          About
        </a>
        <button aria-label="Search">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6 text-gray-900 dark:text-gray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            ></path>
          </svg>
        </button>
        <div className="mr-5">
          <ThemeSwitch />
        </div>
        {/* authorized user avatar or sign in button */}
        <div className="hidden sm:block relative">
          {/*<button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">*/}
          {/*  <span className="relative px-4 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">*/}
          {/*    Sign In*/}
          {/*  </span>*/}
          {/*</button>*/}
          <img
            className="rounded-full h-8 w-8 cursor-pointer"
            src="https://gravatar.com/avatar/348972347298942312123123?d=identicon"
            alt="avatar"
          />
          <div className="absolute top-12 left-0">
            <div className="z-10 bg-gray-50 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-900 dark:divide-gray-600">
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>John Doe</div>
                <div className="font-medium truncate">john.doe@example.com</div>
              </div>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Articles
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Earnings
                  </a>
                </li>
              </ul>
              <div className="py-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </a>
              </div>
            </div>
          </div>
        </div>
        <button aria-label="Toggle Menu" className="sm:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-8 w-8 text-gray-900 dark:text-gray-100"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="fixed left-0 top-0 z-10 h-full w-full transform bg-white opacity-95 duration-300 ease-in-out dark:bg-gray-950 dark:opacity-[0.98] translate-x-full">
          <div className="flex justify-end">
            <button className="mr-8 mt-11 h-8 w-8" aria-label="Toggle Menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="text-gray-900 dark:text-gray-100"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <nav className="fixed mt-8 h-full">
            <div className="px-12 py-4">
              <a className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100" href="/">
                Home
              </a>
            </div>
            <div className="px-12 py-4">
              <a className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100" href="/blog">
                Blog
              </a>
            </div>
            <div className="px-12 py-4">
              <a className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100" href="/tags">
                Tags
              </a>
            </div>
            <div className="px-12 py-4">
              <a className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100" href="/about">
                About
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
