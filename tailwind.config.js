/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    // colors: {
    //   'red':"#FF0000",
    //   'blue':'#ADD8E6',
    //   'dark-blue':'#0ABAB5',
    //   'white':'#fff',
    //   'gray':'#777777',
    //   'red-project':'#DA292A',
    //   'Learn':'#F2F2F2'
      
    // },
    extend: {
      screens: {
        'vsm':'360px',
        'ssm':'470px',
        'mdsm':'600px',
        'sm': '640px',
        'md': '768px',
        'ssmd':'800px',
        'mmd':'850px',
        'mmmd':'900px',
        'lg': '1024px',
        'llg':'1180px',
        'xl': '1280px',
      },
      fontFamily: {
        Montserrat:'Montserrat',
        Roboto:"Roboto",
      },
    },
  },
  plugins: [],
}

