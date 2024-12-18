const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px',        // Extra small devices (mobile)
        'sm': '640px',        // Small devices (tablets)
        'md': '1024px',       // Large devices (laptops/desktops)
        'lg': '1280px',       // Extra large devices (desktops)
        'xl': '1536px',
      },
      colors: {
        mobiPink: 'rgba(163, 36, 242, 1)',
        mobiLight: 'rgba(238, 238, 238, 1)',
        mobiBlue: 'rgba(36, 46, 242, 1)',
        mobiDarkBlue: 'rgba(40, 66, 242, 1)',
        mobiGrayDark: 'rgba(82, 81, 81, 1)',
        mobiDarkOlay: 'rgba(46, 47, 54, 1)',
        mobiFormGray: 'rgba(153, 151, 151, 1)',
        mobiDarkRoamn: 'var(--bs-bodyRoam)',
        mobiDarkCloud: 'var(--bs-darkCloud)',
        mobiDarkSide: 'var(--bs-darkSideBar)',
        mobiSilverDivider: 'var(--bs-lineDivider)',
        mobiBlueFade: 'rgba(36, 46, 242, 0.1)',
        mobiRomanSilver: 'rgba(127, 127, 127, 1)',
        mobiSearchDark: 'var(--bs-search)',
        mobiOrange: 'var(--bs-mobiOrange)',
        mobiSkyCloud: 'var(--bs-mobiSkyCloud)',
        mobiSubPurple: 'var(--bs-mobiSubPurple)',
        mobiLightGreen: 'var(--bs-mobiLightGreen)',
        mobiRadioBg: 'var(--bs-patchRadio)',
        mobiSkyBlue: 'var(--bs-skyBlue)',
        mobiUnread: 'var(--bs-unread)',
        mobiBorder: 'var(--bs-bgBody)',
        borderMB: 'rgba(96, 101, 116, 1)',
        mobiBorderFray: 'var(--bs-borderMobi)',
        mobiTheme: 'var(--bs-gray)',
        mobiBlock: 'var(--bs-profileBlock)',
        mobiTable: 'var(--bs-mobiTable)',
        mobiBorderTable: 'var(--bs-mobiBorderTable)',
        mobiTableText: 'var(--bs-tableText)',
        mobiNotification: 'var(--bs-notificationBorder)',
        'custom-dark': 'rgba(27, 28, 54, 0.16)',
        'custom-light': 'rgba(112, 113, 122, 0.16)',
        'inner-light': 'rgba(255, 255, 255, 0.07)',
        'outer-light': 'rgba(255, 255, 255, 0.15)'
      },
      backgroundImage: {
        'avatar-gradient': 'background: linear-gradient(to right, #A324F2, #242EF2)',
        'home-gradient': 'linear-gradient(to right, rgba(1, 12, 16, 0.42), rgba(1, 21, 26, 0.4))',
        'btn-gradient': 'background: linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%)',
        'custom-gradient': 'linear-gradient(195.05deg, rgba(43, 255, 255, 0.1) 0%, rgba(43, 255, 255, 0.02) 50%, rgba(43, 255, 255, 0.06) 100%)',
      },
      backdropBlur: {
        '40': '40px',
      },
      borderColor: {
        custom: 'rgba(36, 60, 242, 0.5)',
        lBlue: 'rgba(36, 46, 242, 1)'
      },
    },
  },
  plugins: [],
})

