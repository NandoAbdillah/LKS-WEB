export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbiton: ["Orbitron", "serif"],
        audiowide: ["Audiowide", "serif"],
        roboto: ["Roboto Condensed", "serif"],
        exo: ["Exo 2", "serif"],
      },
      screens: { 
        mobile: '320px',
        tablet: '481px', 
        laptop: '769px',
        desktop: '1025px', // Perbaikan dari 'dekstop'
        tv: '1201px',
      },
    },
  },
  plugins: [],
}
