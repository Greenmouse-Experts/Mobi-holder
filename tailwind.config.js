const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mobiPink: 'rgba(163, 36, 242, 1)',
        mobiLight: 'rgba(238, 238, 238, 1)',
        mobiBlue: 'rgba(36, 46, 242, 1)',
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
        mobiNotification: 'var(--bs-notificationBorder)'
      }
    },
  },
  plugins: [],
})

