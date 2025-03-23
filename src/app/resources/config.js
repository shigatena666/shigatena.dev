const baseURL = "shigatena.dev";

const routes = {
  "/": true,
  "/about": true,
  "/work": true,
  "/blog": true,
  "/gallery": true,
  "/documentation": false,
};

// Enable password protection on selected routes
// Set password in the .env file, refer to .env.example
const protectedRoutes = {
  "/work/anarchy": false,
};

const style = {
  theme: "dark",
  brand: "green",
  accent: "green",
  neutral: "gray",
  border: "conservative",
  solid: "color",
  solidStyle: "flat",
  surface: "translucent",
  transition: "all",
};

const effects = {
  mask: {
    cursor: false,
    x: 0,
    y: 0,
    radius: 75,
  },
  gradient: {
    display: false,
    x: 50,
    y: 0,
    width: 100,
    height: 100,
    tilt: 0,
    colorStart: "brand-background-strong",
    colorEnd: "static-transparent",
    opacity: 50,
  },
  dots: {
    display: false,
    size: 2,
    color: "brand-on-background-weak",
    opacity: 100,
  },
  lines: {
    display: true,
    color: "neutral-alpha-weak",
    opacity: 100,
  },
  grid: {
    display: true,
    color: "neutral-alpha-weak",
    opacity: 40,
  },
};

const display = {
  location: false,
  time: false,
};

const mailchimp = {
  action: "https://url/subscribe/post?parameters",
  effects: {
    mask: {
      cursor: false,
      x: 100,
      y: 0,
      radius: 100,
    },
    gradient: {
      display: false,
      x: 100,
      y: 50,
      width: 100,
      height: 100,
      tilt: -45,
      colorStart: "accent-background-strong",
      colorEnd: "static-transparent",
      opacity: 100,
    },
    dots: {
      display: true,
      size: 24,
      color: "brand-on-background-weak",
      opacity: 100,
    },
    lines: {
      display: false,
      color: "neutral-alpha-weak",
      opacity: 100,
    },
    grid: {
      display: false,
      color: "neutral-alpha-weak",
      opacity: 100,
    },
  },
};

export { routes, protectedRoutes, effects, style, display, mailchimp, baseURL };
