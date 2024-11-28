import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import Theme from '../../components/Theme';

export default function Sidebar({mobile}) {
    const url = window.location.pathname;
    console.log(url)
    return (
        <div className={`h-full rounded-md flex-col ${mobile ? 'w-full lg:hidden md:hidden flex overflow-auto' : 'md:w-[22%] lg:flex md:hidden hidden custom-scrollbar overflow-auto h-[750px] fixed'} bg-mobiDarkCloud transition-all mb-10`}>
            {/* Logo */}
            <div className="py-6 px-4 flex gap-6 flex-col space-x-2 border-bottom">
                <Link to={'/'} className='flex px-3 gap-3'>
                    <img src="/mobiHolder.svg" alt="Logo" className="w-[32px] h-[32px] object-contain" />
                    <div className='flex flex-col justify-center'>
                        <span className='text-xl mt-1 font-semibold'>MobiHolder</span>
                    </div>
                </Link>
                <div className='w-full h-[1px] border-mobiSilverDivider border-bottom border'></div>
            </div>

            {/* Navigation Items */}
            <nav className="px-4 space-y-4">
                <Link to={'/app/dashboard'} className={`flex items-center py-2 px-4 h-[57px] rounded-lg ${url === '/app/dashboard' ? 'bg-mobiBlueFade' : 'hover:bg-mobiBlueFade text-mobiRomanSilver'} transition`}>
                    <i className="mr-3"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.9823 2.764C12.631 2.49075 12.4553 2.35412 12.2613 2.3016C12.0902 2.25526 11.9098 2.25526 11.7387 2.3016C11.5447 2.35412 11.369 2.49075 11.0177 2.764L4.23539 8.03912C3.78202 8.39175 3.55534 8.56806 3.39203 8.78886C3.24737 8.98444 3.1396 9.20478 3.07403 9.43905C3 9.70352 3 9.9907 3 10.5651V17.8C3 18.9201 3 19.4801 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.0799 21 6.2 21H8.2C8.48003 21 8.62004 21 8.727 20.9455C8.82108 20.8976 8.89757 20.8211 8.9455 20.727C9 20.62 9 20.48 9 20.2V13.6C9 13.0399 9 12.7599 9.10899 12.546C9.20487 12.3578 9.35785 12.2049 9.54601 12.109C9.75992 12 10.0399 12 10.6 12H13.4C13.9601 12 14.2401 12 14.454 12.109C14.6422 12.2049 14.7951 12.3578 14.891 12.546C15 12.7599 15 13.0399 15 13.6V20.2C15 20.48 15 20.62 15.0545 20.727C15.1024 20.8211 15.1789 20.8976 15.273 20.9455C15.38 21 15.52 21 15.8 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4801 21 18.9201 21 17.8V10.5651C21 9.9907 21 9.70352 20.926 9.43905C20.8604 9.20478 20.7526 8.98444 20.608 8.78886C20.4447 8.56806 20.218 8.39175 19.7646 8.03913L12.9823 2.764Z"
                            stroke={`${url === '/app/dashboard' ? 'rgba(163, 36, 242, 1)' : '#7F7F7F'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    </i>
                    <span className={`${url === '/app/dashboard' ? 'text-mobiPink' : ''}`}>Dashboard</span>
                </Link>
                <Link to={'/app/subscriptions'} className={`flex items-center py-2 px-4 h-[57px] rounded-lg ${url === '/app/subscriptions' ? 'bg-mobiBlueFade' : 'hover:bg-mobiBlueFade text-mobiRomanSilver'} transition`}>
                    <i className="mr-3">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 12.5V6.8C20 5.11984 20 4.27976 19.673 3.63803C19.3854 3.07354 18.9265 2.6146 18.362 2.32698C17.7202 2 16.8802 2 15.2 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H12M14 11H8M10 15H8M16 7H8M14.5 19L16.5 21L21 16.5"
                                stroke={`${url === '/app/subscriptions' ? 'rgba(163, 36, 242, 1)' : '#7F7F7F'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </i>
                    <span className={`${url === '/app/subscriptions' ? 'text-mobiPink' : ''}`}>Membership & Subscription</span>
                </Link>
                <Link to={'/app/id-cards'} className={`flex items-center py-2 px-4 h-[57px] rounded-lg ${url === '/app/id-cards' ? 'bg-mobiBlueFade' : 'hover:bg-mobiBlueFade text-mobiRomanSilver'} transition`}>
                    <i className="mr-3">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.7 13.5L20.7005 11.5L18.7 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C15.3019 3 18.1885 4.77814 19.7545 7.42909M12 7V12L15 14" stroke={`${url === '/app/id-cards' ? 'rgba(163, 36, 242, 1)' : '#7F7F7F'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </i>
                    <span className={`${url === '/app/id-cards' ? 'text-mobiPink' : ''}`}>ID Cards</span>
                </Link>
                <Link to={'/app/events'} className={`flex items-center py-2 px-4 h-[57px] rounded-lg ${url === '/app/events' ? 'bg-mobiBlueFade' : 'hover:bg-mobiBlueFade text-mobiRomanSilver'} transition`}>
                    <i className="mr-3">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 10H2M2 8.2L2 15.8C2 16.9201 2 17.4802 2.21799 17.908C2.40973 18.2843 2.71569 18.5903 3.09202 18.782C3.51984 19 4.07989 19 5.2 19L18.8 19C19.9201 19 20.4802 19 20.908 18.782C21.2843 18.5903 21.5903 18.2843 21.782 17.908C22 17.4802 22 16.9201 22 15.8V8.2C22 7.0799 22 6.51984 21.782 6.09202C21.5903 5.7157 21.2843 5.40974 20.908 5.21799C20.4802 5 19.9201 5 18.8 5L5.2 5C4.0799 5 3.51984 5 3.09202 5.21799C2.7157 5.40973 2.40973 5.71569 2.21799 6.09202C2 6.51984 2 7.07989 2 8.2Z"
                                stroke={`${url === '/app/events' ? 'rgba(163, 36, 242, 1)' : '#7F7F7F'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </i>
                    <span className={`${url === '/app/events' ? 'text-mobiPink' : ''}`}> Event </span>
                </Link>
                <a href="#" className={`flex items-center py-2 px-4 h-[57px] rounded-lg hover:bg-mobiBlueFade text-mobiRomanSilver transition`}>
                    <i className="mr-3">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 21H10M18 8C18 6.4087 17.3679 4.88258 16.2427 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.8826 2.63214 7.75738 3.75736C6.63216 4.88258 6.00002 6.4087 6.00002 8C6.00002 11.0902 5.22049 13.206 4.34968 14.6054C3.61515 15.7859 3.24788 16.3761 3.26134 16.5408C3.27626 16.7231 3.31488 16.7926 3.46179 16.9016C3.59448 17 4.19261 17 5.38887 17H18.6112C19.8074 17 20.4056 17 20.5382 16.9016C20.6852 16.7926 20.7238 16.7231 20.7387 16.5408C20.7522 16.3761 20.3849 15.7859 19.6504 14.6054C18.7795 13.206 18 11.0902 18 8Z" stroke="#7F7F7F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </i>
                    Verify
                </a>
                <Link to={'/app/notification'} className={`flex items-center py-2 px-4 h-[57px] rounded-lg ${url === '/app/notification' ? 'bg-mobiBlueFade' : 'hover:bg-mobiBlueFade text-mobiRomanSilver'} transition`}>
                    <i className="mr-3">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 21H10M18 8C18 6.4087 17.3679 4.88258 16.2427 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.8826 2.63214 7.75738 3.75736C6.63216 4.88258 6.00002 6.4087 6.00002 8C6.00002 11.0902 5.22049 13.206 4.34968 14.6054C3.61515 15.7859 3.24788 16.3761 3.26134 16.5408C3.27626 16.7231 3.31488 16.7926 3.46179 16.9016C3.59448 17 4.19261 17 5.38887 17H18.6112C19.8074 17 20.4056 17 20.5382 16.9016C20.6852 16.7926 20.7238 16.7231 20.7387 16.5408C20.7522 16.3761 20.3849 15.7859 19.6504 14.6054C18.7795 13.206 18 11.0902 18 8Z"
                                stroke={`${url === '/app/notification' ? 'rgba(163, 36, 242, 1)' : '#7F7F7F'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </i>
                    <span className={`${url === '/app/notification' ? 'text-mobiPink' : ''}`}>Notification</span>
                </Link>

                <div className='w-full h-[1px] px-4 border-mobiSilverDivider border-bottom border'></div>
            </nav>

            {/* Footer */}
            <div className="px-4 py-6">
                <Link to={'/app/settings'} className={`flex items-center py-2 px-4 h-[57px] rounded-lg ${url === '/app/settings' ? 'bg-mobiBlueFade' : 'hover:bg-mobiBlueFade'} transition`}>
                    <i className={`fas fa-cog mr-3 ${url === '/app/settings' ? 'text-mobiPink' : ''}`}></i>
                    <span className={`${url === '/app/settings' ? 'text-mobiPink' : ''}`}>Settings</span>
                </Link>
                <a href="#" className={`flex items-center py-2 px-4 h-[57px] rounded-lg text-red-500 hover:bg-mobiBlueFade transition`}>
                    <i className="fas fa-sign-out-alt mr-3"></i>
                    Logout
                </a>

                {/* Image/Advertisement */}
                <div className="mt-1 bg-cover bg-center p-4 rounded-lg md:flex hidden">
                    <img src='/mobi-image.png' />
                </div>

                {/* Dark Mode Toggle */}
                <div className="mt-4 flex justify-center space-x-2 p-4">
                    <Theme />
                </div>

            </div>
        </div>
    );
}
