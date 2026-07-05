// Single source of truth for the command palette / navigation.
// `to` = internal route, `external` = open url, `download` = resume, `help` = expand list.
export const COMMANDS = [
  { cmd: "/home", desc: "back to the terminal", to: "/" },
  { cmd: "/projects", desc: "what I've shipped, and the hard parts", to: "/work" },
  { cmd: "/services", desc: "web · ai apps · automation — for hire", to: "/services", special: true },
  { cmd: "/about", desc: "who I am, fast", to: "/about" },
  { cmd: "/skills", desc: "the stack, honestly rated", to: "/skills" },
  { cmd: "/writing", desc: "notes and posts", to: "/writing" },
  { cmd: "/opensource", desc: "public code", to: "/opensource" },
  { cmd: "/achievements", desc: "certs and wins", to: "/achievements" },
  { cmd: "/resume", desc: "download the PDF", download: true },
  { cmd: "/contact", desc: "email · github · linkedin", to: "/contact" },
  { cmd: "/uni-verse", desc: "the platform I'm building", external: "https://uni-verse.co.in" },
  { cmd: "/help", desc: "list everything", help: true },
];

export const RESUME_PATH = "/images/Nipun_Sujesh_Resume.pdf";
export const RESUME_FILE = "Nipun_Sujesh_Resume.pdf";
