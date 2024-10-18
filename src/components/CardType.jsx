import React from 'react';
import { Link } from 'react-router-dom';

function CardType({ type, text, link }) {
    const isIndividual = type === 'Individual';

    return (
        <>
            <div className={`relative w-full max-w-md flex flex-col ${isIndividual ? 'bs-cageBlockIndividual' : 'bs-cageBlockOrganisation'}`} style={{
                border: '1px solid transparent',
                borderImageSlice: 1,
            }}>
                <div className="relative w-full h-[120px] sm:min-h-[200px] flex">
                    <div className={`absolute top-0 w-[1px] h-full left-[0%] ${isIndividual ? 'indGradient' : 'orgGradient'}`}></div>
                    <div className={`absolute top-0 w-[1px] h-full left-[10%] ${isIndividual ? 'indGradient' : 'orgGradient'}`}></div>
                    <div className={`absolute top-0 w-[1px] h-full left-[20%] ${isIndividual ? 'indGradient' : 'orgGradient'}`}></div>
                    <div className={`absolute top-0 w-[1px] h-full left-[30%] ${isIndividual ? 'indGradient' : 'orgGradient'}`}></div>
                    <div className={`absolute top-0 w-[1px] h-full left-[40%] ${isIndividual ? 'indGradient' : 'orgGradient'}`}></div>
                    <div className={`absolute top-0 w-[1px] h-full left-[50%] ${isIndividual ? 'indGradient' : 'orgGradient'}`}></div>
                    <div className={`absolute top-0 w-[1px] h-full left-[60%] ${isIndividual ? 'indGradient' : 'orgGradient'}`}></div>
                    <div className={`absolute top-0 w-[1px] h-full left-[70%] ${isIndividual ? 'indGradient' : 'orgGradient'}`}></div>
                    <div className={`absolute top-0 w-[1px] h-full left-[80%] ${isIndividual ? 'indGradient' : 'orgGradient'}`}></div>
                    <div className={`absolute top-0 w-[1px] h-full left-[90%] ${isIndividual ? 'indGradient' : 'orgGradient'}`}></div>
                    <div className={`absolute top-0 w-[1px] h-full left-[100%] ${isIndividual ? 'indGradient' : 'orgGradient'}`}></div>
                    <div className={`absolute left-0 w-full h-[1px] top-[0%] ${isIndividual ? 'indGradient' : 'orgGradient'}`}></div>
                    <div className={`absolute left-0 w-full h-[1px] top-[20%] ${isIndividual ? 'indGradient' : 'orgGradient'}`}></div>
                    <div className={`absolute left-0 w-full h-[1px] top-[40%] ${isIndividual ? 'indGradient' : 'orgGradient'}`}></div>
                    <div className={`absolute left-0 w-full h-[1px] top-[60%] ${isIndividual ? 'indGradient' : 'orgGradient'}`}></div>
                    <div className={`absolute left-0 w-full h-[1px] top-[80%] ${isIndividual ? 'indGradient' : 'orgGradient'}`}></div>
                    <div className={`absolute left-0 w-full h-[1px] top-[100%] ${isIndividual ? 'indGradient' : 'orgGradient'}`}></div>
                </div>
                <div className='absolute lg:top-20 md:top-20 top-7 left-4'>
                    <img src={type === 'Individual' ? `/individual.svg` : `/organisation.svg`} width={isIndividual ? 60 : 90} />
                </div>
                <div className='absolute w-auto lg:py-2 md:py-2 lg:px-3 md:px-3 p-1 top-[0%] left-[91.3%] lg:left-[89.5%] md:left-[89%] border border-mobiBorder border-b-2 border-t-0 border-l-2 border-r-0 bg-black'>
                    {isIndividual ?
                        <svg width="20" height="20" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="7.35376" y="27.5723" width="27.0277" height="2.57406" transform="rotate(-45 7.35376 27.5723)" fill="#76129B" />
                            <path d="M13.3905 9.36428C13.392 9.18213 13.4294 9.00138 13.5006 8.83239C13.5718 8.6634 13.6753 8.50949 13.8053 8.37947C13.9354 8.24945 14.0893 8.14588 14.2583 8.07469C14.4273 8.0035 14.608 7.96609 14.7902 7.9646L27.81 7.84159C27.9551 7.84007 28.0985 7.86718 28.2321 7.92137C28.3656 7.97556 28.4867 8.05577 28.5883 8.1574C28.6899 8.25903 28.7701 8.38009 28.8243 8.51364C28.8785 8.6472 28.9056 8.79063 28.9041 8.93573L28.7811 21.9556C28.7739 22.7233 28.1491 23.348 27.3814 23.3552C26.6137 23.3625 26.0007 22.7495 26.0079 21.9818L26.1073 10.6306L14.7483 10.7379C13.9962 10.745 13.3755 10.1242 13.3905 9.36428Z" fill="#D324F2" />
                        </svg>
                        :
                        <svg width="20" height="20" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="7.35376" y="27.5723" width="27.0277" height="2.57406" transform="rotate(-45 7.35376 27.5723)" fill="#12199B" />
                            <path d="M13.3905 9.36428C13.392 9.18213 13.4294 9.00138 13.5006 8.83239C13.5718 8.6634 13.6753 8.50949 13.8053 8.37947C13.9354 8.24945 14.0893 8.14588 14.2583 8.07469C14.4273 8.0035 14.608 7.96609 14.7902 7.9646L27.81 7.84159C27.9551 7.84007 28.0985 7.86718 28.2321 7.92137C28.3656 7.97556 28.4867 8.05577 28.5883 8.1574C28.6899 8.25903 28.7701 8.38009 28.8243 8.51364C28.8785 8.6472 28.9056 8.79063 28.9041 8.93573L28.7811 21.9556C28.7739 22.7233 28.1491 23.348 27.3814 23.3552C26.6137 23.3625 26.0007 22.7495 26.0079 21.9818L26.1073 10.6306L14.7483 10.7379C13.9962 10.745 13.3755 10.1242 13.3905 9.36428Z" fill="#242EF2" />
                        </svg>
                    }
                </div>
                <div className={`w-[100.2%] rounded-sm lg:py-8 md:py-8 lg:px-4 md:px-4 p-4 flex flex-col gap-4 ${type === 'Individual' ? 'bg-mobiPink' : 'bg-mobiBlue'}`}>
                    <Link to={`${link}`} className='w-full'>
                        <p className='lg:text-xl text-base font-semibold text-mobiLight'>
                            {type}
                        </p>
                        <p className='text-sm text-mobiLight'>
                            {text}
                        </p>
                    </Link>
                </div>
            </div>

            <style jsx="true">{`
        .indGradient {
          background: linear-gradient(90deg, rgba(41, 22, 61, 1), rgba(163, 58, 160, 1));
        }

        .orgGradient {
            background: linear-gradient(90deg, rgba(22, 24, 61, 1), rgba(60, 58, 163, 1));
        }
      `}</style>
        </>
    )
};

export default CardType;