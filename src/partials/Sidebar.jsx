import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import SidebarLinkGroup from './SidebarLinkGroup';

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <defs>
                <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
                  <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                  <stop stopColor="#A5B4FC" offset="100%" />
                </linearGradient>
                <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
                  <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                  <stop stopColor="#38BDF8" offset="100%" />
                </linearGradient>
              </defs>
              <rect fill="#6366F1" width="32" height="32" rx="16" />
              <path d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z" fill="#4F46E5" />
              <path
                d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                fill="url(#logo-a)"
              />
              <path
                d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                fill="url(#logo-b)"
              />
            </svg>
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Pages</span>
            </h3>
            <ul className="mt-3">
              {/* Dashboard */}
              <SidebarLinkGroup activecondition={pathname === '/' || pathname.includes('dashboard')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 truncate transition duration-150 ${
                          pathname === '/' || pathname.includes('dashboard') ? 'hover:text-slate-200' : 'hover:text-white'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <path
                                className={`fill-current ${
                                  pathname === '/' || pathname.includes('dashboard') ? 'text-indigo-500' : 'text-slate-400'
                                }`}
                                d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                              />
                              <path
                                className={`fill-current ${
                                  pathname === '/' || pathname.includes('dashboard') ? 'text-indigo-600' : 'text-slate-600'
                                }`}
                                d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                              />
                              <path
                                className={`fill-current ${
                                  pathname === '/' || pathname.includes('dashboard') ? 'text-indigo-200' : 'text-slate-400'
                                }`}
                                d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                              />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Dashboard
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (isActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Students
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/dashboard/analytics"
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (isActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Teachers
                              </span>
                            </NavLink>
                          </li>
                          
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* E-Commerce */}
              <SidebarLinkGroup activecondition={pathname.includes('ecommerce')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 truncate transition duration-150 ${
                          pathname.includes('ecommerce') ? 'hover:text-slate-200' : 'hover:text-white'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                         
                            
                          </div>
                          {/* Icon */}
                         
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                       
               <li className={` py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('inbox') && 'bg-slate-900'}`}>

                <NavLink
                  end
                  to="/inbox"
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 36 36"><path fill="#292F33" d="M26 28H10a6 6 0 0 0-6 6v2h28v-2c0-3.314-2.685-6-6-6"/><path fill="#66757F" d="M8.083 33.341c.251 0 .401 2.659.401 2.659h-.956s.193-2.659.555-2.659m3 0c.251 0 .401 2.659.401 2.659h-.957c.001 0 .194-2.659.556-2.659m13.846 0c-.251 0-.401 2.659-.401 2.659h.956c-.001 0-.194-2.659-.555-2.659m3 0c-.251 0-.401 2.659-.401 2.659h.956c-.001 0-.194-2.659-.555-2.659"/><path fill="#FA743E" d="M12.38 28s.24.838.77 1.971c.827 1.766 2.366 4.254 4.85 5.441c2.485-1.187 4.024-3.675 4.85-5.441c.53-1.133.77-1.971.77-1.971z"/><path fill="#DD551F" d="M18 32c2.329 0 3.882-1.02 4.85-2.029c.53-1.133.77-1.971.77-1.971H12.38s.24.838.77 1.971C14.118 30.98 15.671 32 18 32"/><path fill="#FFDC5D" d="M13.64 28.106c0 .894 2.36 1.993 4.36 1.993s4.359-1.099 4.359-1.992V24.29h-8.72z"/><path fill="#F9CA55" d="M13.632 25.973c1.216 1.374 2.724 1.746 4.364 1.746c1.639 0 3.146-.373 4.363-1.746v-3.491h-8.728v3.491z"/><path fill="#FFAC33" d="M21.152 3.3c-1.925-.623-5.876-.46-7.008 1.012c-2.944.057-6.083 2.932-6.536 6.443c-.448 3.475.235 4.874.591 7.486c.403 2.96 2.067 3.907 3.397 4.303c1.914 2.529 3.949 2.421 7.366 2.421c6.672 0 9.271-4.458 9.552-12.04c.169-4.585-2.522-8.059-7.362-9.625"/><path fill="#FFDC5D" d="M25.547 13.244c-.646-.894-1.472-1.614-3.284-1.868c.68.311 1.331 1.387 1.416 1.982c.085.595.17 1.076-.368.481c-2.155-2.382-4.502-1.444-6.827-2.899c-1.624-1.016-2.119-2.141-2.119-2.141s-.198 1.5-2.661 3.029c-.714.443-1.566 1.43-2.038 2.888c-.34 1.048-.234 1.982-.234 3.578c0 4.66 3.841 8.578 8.578 8.578s8.578-3.953 8.578-8.578c-.002-2.899-.305-4.031-1.041-5.05"/><path fill="#C1694F" d="M18.961 20.677h-1.906a.477.477 0 1 1 0-.954h1.906a.477.477 0 1 1 0 .954"/><path fill="#662113" d="M14.195 17.341a.953.953 0 0 1-.953-.953v-.953a.953.953 0 0 1 1.906 0v.953a.953.953 0 0 1-.953.953m7.626 0a.953.953 0 0 1-.953-.953v-.953a.953.953 0 0 1 1.906 0v.953a.953.953 0 0 1-.953.953"/><path fill="#C1694F" d="M18.134 24.657c-2.754 0-3.6-.705-3.741-.848a.655.655 0 0 1 .902-.95c.052.037.721.487 2.839.487c2.2 0 2.836-.485 2.842-.49a.638.638 0 0 1 .913.015a.67.67 0 0 1-.014.939c-.142.142-.987.847-3.741.847"/><path fill="#292F33" d="m32.104 3.511l-14-3a.491.491 0 0 0-.209 0l-14 3a.5.5 0 0 0-.032.97l4.944 1.413C8.615 6.489 8.5 7.176 8.5 8c0 2.29 3.285 3.5 9.5 3.5s9.5-1.21 9.5-3.5c0-.824-.115-1.511-.307-2.106l4.945-1.413a.5.5 0 0 0-.034-.97"/><path fill="#66757F" d="M32.48 3.863a.502.502 0 0 0-.618-.344L18 7.48L4.137 3.519a.5.5 0 1 0-.274.962l14 4a.49.49 0 0 0 .273 0l14-4a.498.498 0 0 0 .344-.618"/><path fill="#FFCC4D" d="m17.958 3.502l-12 1c-.026.002-.458.057-.458.498v6.095c-.299.186-.5.74-.5 2.405c0 2.485.448 4.5 1 4.5s1-2.015 1-4.5c0-1.665-.201-2.219-.5-2.405V5.46l11.542-.962a.5.5 0 0 0-.084-.996"/></svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Add student</span>
                  </div>
                </NavLink>

                </li>

                <li className={` py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('inbox') && 'bg-slate-900'}`}>

                <NavLink
                  end
                  to="/inbox"
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                 <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 36 36"><path fill="#D99E82" d="M30 26a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h22a4 4 0 0 1 4 4z"/><path fill="#5C913B" d="M28 26a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h22a2 2 0 0 1 2 2z"/><path fill="#FFF" d="M7.515 8.898c-.08.096-.184.24-.184.408c0 .368.272.528.624.528h2.67c.304 0 .576-.16.576-.528s-.271-.528-.624-.528H9.114c.679-.855 1.919-1.958 1.919-3.07c0-1.015-.792-1.663-1.775-1.663s-1.879.807-1.879 1.815c0 .311.2.583.584.583c.768 0 .328-1.295 1.247-1.295c.328 0 .576.288.576.616c0 .288-.136.536-.28.744c-.608.879-1.327 1.599-1.991 2.39m-1.307 5.433H5.049v-1.16c0-.288-.184-.479-.48-.479c-.295 0-.479.192-.479.479v1.16H2.931c-.296 0-.48.192-.48.479c0 .288.184.48.48.48H4.09v1.159c0 .288.184.479.479.479c.296 0 .48-.191.48-.479V15.29h1.159c.296 0 .48-.192.48-.48c0-.287-.184-.479-.48-.479m4.369 1.447H9.113c.68-.855 1.919-1.958 1.919-3.07c0-1.015-.792-1.663-1.775-1.663s-1.879.808-1.879 1.815c0 .311.2.583.583.583c.768 0 .328-1.295 1.248-1.295c.328 0 .576.288.576.616c0 .288-.136.536-.28.744c-.608.879-1.327 1.599-1.991 2.391c-.08.096-.184.24-.184.408c0 .368.272.528.624.528h2.67c.304 0 .576-.16.576-.528c0-.369-.271-.529-.623-.529m.84 3.192H3.083a.5.5 0 0 1 0-1h8.333a.5.5 0 0 1 .001 1"/><path fill="#CCD6DD" d="M36 36v-2a6 6 0 0 0-6-6H14a6 6 0 0 0-6 6v2z"/><path fill="#99AAB5" d="M22.073 30.805s3.297.891 4.545 1.307c.16.053-.951-2.108-.951-2.108h-7.453s-.679 1.542-1.071 2.197c1.96-.624 4.798-1.485 4.798-1.485"/><path fill="#FFDC5D" d="M17.64 28.101c.774.562 1.206 1.644 2.3 1.911c.326.702.746 1.635 1.122 2.476c.355.795 1.486.783 1.825-.02c.355-.84.755-1.767 1.074-2.456c1.105-.446 1.611-1.339 2.399-1.911V24.29h-8.72z"/><path fill="#F9CA55" d="M17.632 25.973c1.216 1.374 2.724 1.746 4.364 1.746c1.639 0 3.146-.373 4.363-1.746v-3.491h-8.728v3.491z"/><path fill="#FFAC33" d="M25.731 3.323c-1.925-.623-6.455-.453-7.588 1.019c-2.944.057-6.398 2.718-6.851 6.228c-.448 3.475.551 5.088.906 7.701c.403 2.96 2.067 3.907 3.397 4.303c1.914 2.529 3.949 2.421 7.366 2.421c6.672 0 9.85-4.464 10.131-12.047c.17-4.585-2.521-8.059-7.361-9.625"/><path fill="#FFDC5D" d="M29.547 13.273c-.646-.894-1.472-1.614-3.284-1.868c.68.311 1.331 1.387 1.416 1.982c.085.595.17 1.076-.368.481c-2.155-2.382-4.502-1.444-6.827-2.899c-1.624-1.016-2.119-2.141-2.119-2.141s-.198 1.5-2.661 3.029c-.714.443-1.566 1.43-2.038 2.888c-.34 1.048-.234 1.982-.234 3.578c0 4.66 3.841 8.578 8.578 8.578s8.578-3.953 8.578-8.578c-.002-2.898-.305-4.031-1.041-5.05"/><path fill="#C1694F" d="M22.961 20.707h-1.906a.477.477 0 1 1 0-.954h1.906a.477.477 0 1 1 0 .954"/><path fill="#662113" d="M18.195 17.37a.953.953 0 0 1-.953-.953v-.953a.953.953 0 0 1 1.906 0v.953a.952.952 0 0 1-.953.953m7.626 0a.953.953 0 0 1-.953-.953v-.953a.953.953 0 0 1 1.906 0v.953a.953.953 0 0 1-.953.953"/><path fill="#C1694F" d="M22.134 24.686c-2.754 0-3.6-.705-3.741-.848a.655.655 0 0 1 .902-.95c.052.037.721.487 2.839.487c2.2 0 2.836-.485 2.842-.49a.638.638 0 0 1 .913.015a.669.669 0 0 1-.014.938c-.142.143-.987.848-3.741.848"/><path fill="#F5F8FA" d="M17.229 26.629c.565.566 2.71 3.383 2.71 3.383s-1.188.695-2.608 2.004c-.516.476-1.35.055-1.287-.644c.121-1.349.249-2.909.225-3.534c-.011-.303.69-1.481.96-1.209m9.433 0c-.565.566-2.71 3.383-2.71 3.383s1.188.695 2.608 2.004c.516.476 1.35.055 1.287-.644c-.121-1.349-.249-2.909-.225-3.534c.012-.303-.689-1.481-.96-1.209"/></svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Add Teacher</span>
                  </div>
                </NavLink>

                </li>
            




                       
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Community */}
           
              {/* Finance */}
             
              {/* Tasks */}
           
              {/* Messages */}
              <li className={`px-3 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('messages') && 'bg-slate-900'}`}>
                <NavLink
                  end
                  to="/messages"
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname.includes('messages') ? 'hover:text-slate-200' : 'hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"><path fill="#2F88FF" stroke="#000" d="M44.0001 24C44.0001 35.0457 35.0458 44 24.0001 44C18.0266 44 4.00006 44 4.00006 44C4.00006 44 4.00006 29.0722 4.00006 24C4.00006 12.9543 12.9544 4 24.0001 4C35.0458 4 44.0001 12.9543 44.0001 24Z"/><path stroke="#fff" d="M14 18L32 18"/><path stroke="#fff" d="M14 26H32"/><path stroke="#fff" d="M14 34H24"/></g></svg>
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Messages
                      </span>
                    </div>
                    {/* Badge */}
                    <div className="flex flex-shrink-0 ml-2">
                      <span className="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-indigo-500 px-2 rounded">4</span>
                    </div>
                  </div>
                </NavLink>
              </li>
            
            </ul>
          </div>
          {/* More group */}
          
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                <path className="text-slate-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
