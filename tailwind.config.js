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
        mobiOrange: 'rgba(104, 78, 70, 1)',
        mobiSkyCloud: 'rgba(64, 79, 109, 1)',
        mobiSubPurple: 'rgba(109, 66, 92, 1)',
        mobiLightGreen: 'rgba(64, 105, 102, 1)',
        mobiSkyBlue: 'var(--bs-skyBlue)',
        mobiUnread: 'var(--bs-unread)',
        mobiBorder: 'var(--bs-bgBody)'
      }
    },
  },
  plugins: [],
})

