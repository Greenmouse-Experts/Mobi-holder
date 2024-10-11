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
        mobiDarkRoamn: 'rgba(46, 47, 54, 0.2)',
        mobiDarkCloud: 'var(--bs-darkCloud)',
        mobiSilverDivider: 'var(--bs-lineDivider)',
        mobiBlueFade: 'rgba(36, 46, 242, 0.1)',
        mobiRomanSilver: 'rgba(127, 127, 127, 1)',
        mobiSearchDark: 'rgba(18, 20, 19, 1)'
      }
    },
  },
  plugins: [],
})

