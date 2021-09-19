module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      cda: {
        medium: "#666",
        dark: "#444",
        darker: "#222",
        darkest: "#000",
        darken: "rgba(0,0,0,.04)",
        darken_medium: "rgba(0,0,0,.1)",
        darken_strong: "rgba(0,0,0,.2)",
        light: "#B4B4B4",
        lighter: "#F2F2F2",
        lightest: "#FFF",
        lighten: "rgba(255,255,255,0.1)",
        lighten_strong: "rgba(255,255,255,0.3)",
        accent: "#FFCC00",
        error: "#CC0000",
      },
    },
    // use with <KEY>
    screens: {
      'medium': '720px',
      'large': '1024px',
      'xlarge': '1400px',
      'xxlarge': '1700px',
      '3xlarge': '2000px',
      '4xlarge': '2300px',
    },
    // use with font-<KEY>
    fontFamily: {
      'sans': ['IBMPlexSans','ui-sans-serif', 'system-ui'],
      'code': ['Menlo', 'Consolas', 'Courier New', 'Courier', 'Liberation Mono', 'monospace'],
     },
    // use with font-<KEY>
     fontWeight: {
      'light': 200,
      'regular': 300,
      'semibold': 400,
      'bold': 600,
     },
    // use with leading-<KEY>
     lineHeight: {
      'tight': '120%',
      'normal': '140%',
      'loose': '160%',
      'headline': '120%',
     },
     // use with duration-<KEY>
     transitionDuration: {
      'slow': '800ms',
      'medium': '500ms',
      'fast': '300ms',
     },
     // use with z-<KEY>
     zIndex: {
      'background': 0,
     'content': 10,
     'content-nav': 20,
     'section-nav': 30,
     'overall-nav': 40,
    },
    // use with shadow-<KEY>
    boxShadow: {
      DEFAULT: '1px 1px 0.3rem rgba(0, 0, 0, 0.4)',
      xs: '1px 1px 0.2rem rgba(0, 0, 0, 0.4)',
      s: '1px 1px 0.8rem rgba(0, 0, 0, 0.4)',
      m: '1px 1px 1.3rem rgba(0, 0, 0, 0.4)',
      top: '0px 0px 0.3rem rgba(0,0,0,0.4)',
      'top-s': '0px 0px 0.8rem rgba(0,0,0,0.4)',
      'top-m': '0px 0px 1.3rem rgba(0,0,0,0.4)',
      'inner': 'inset 0 0 0.8rem rgba(0, 0, 0, 10)',
      none: 'none',
    },
    // use with opacity-<KEY>
    opacity: {
      'medium': '.5',
      'low': '.2',
    },
    // use with border-<KEY>
    borderWidth: {
      DEFAULT: '2px',
      's': '1px',
    },
    // use with border-radius-<KEY>
    borderRadius: {
      'none': '0',
      's': '4px',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar'),],
};
