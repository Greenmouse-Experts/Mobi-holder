import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

export default function Theme() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <>
            <div className='md:min-h-[40px] h-[30px] w-full md:p-1 bg-black border border-gray-800 flex md:rounded-lg rounded-md'>
                    <div className={`md:h-[30px] h-[29px] w-full ${theme === 'light' ? 'bg-mobiPink' : ''} text-white md:rounded-md rounded-l-md cursor-pointer flex justify-center py-1`}
                        onClick={toggleTheme}>
                        <span className='flex flex-col justify-center'>
                            <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 1V3M11 19V21M3 11H1M5.31412 5.31412L3.8999 3.8999M16.6859 5.31412L18.1001 3.8999M5.31412 16.69L3.8999 18.1042M16.6859 16.69L18.1001 18.1042M21 11H19M16 11C16 13.7614 13.7614 16 11 16C8.23858 16 6 13.7614 6 11C6 8.23858 8.23858 6 11 6C13.7614 6 16 8.23858 16 11Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </div>
                <div className={`md:h-[30px] h-[29px] w-full ${theme === 'dark' ? 'bg-mobiPink' : ''} md:rounded-md rounded-r-md text-white cursor-pointer flex justify-center py-1`}
                        onClick={toggleTheme}
                    >
                        <span className='flex flex-col justify-center'>
                            <svg width="17" height="17" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.9548 11.9566C19.5779 14.3719 16.9791 16.0003 14 16.0003C9.58172 16.0003 6 12.4186 6 8.00033C6 5.02096 7.62867 2.42199 10.0443 1.04517C4.96975 1.52631 1 5.79961 1 11.0001C1 16.5229 5.47715 21.0001 11 21.0001C16.2002 21.0001 20.4733 17.0308 20.9548 11.9566Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </div>
                </div>
        </>
    )
}