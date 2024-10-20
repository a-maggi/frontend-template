import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
//import ThemeSwitcher from "components/theme-switcher";
import { config } from "../../config";

export default function Footer() {
  return (
    <footer className="container mx-auto my-8 flex flex-col max-w-6xl justify-center text-sm text-muted-foreground">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          {/* <Logo className="w-5 h-5" /> */}
          <p>
            {`© ${new Date().getFullYear()} `} {config.name}
          </p>
        </div>
        <div className="flex items-center gap-x-4 text-sm leading-4">
          <Link href="/contact" className="hover:text-foreground">
            Contact
          </Link>
          {/* <ThemeSwitcher /> */}
          <div className="flex items-center gap-x-4">
            <a
              href="https://x.com/"
              className="p-2 hover:bg-foreground/10 rounded-lg hover:text-foreground"
              target="_blank"
            >
              <BsTwitterX className="w-3 h-3" />
            </a>
            {/* <a
            href="#"
            className="p-3 hover:bg-foreground/10 rounded-lg hover:text-foreground"
          >
            <FaInstagram className="w-4 h-4" />
          </a>
          <a
            href="#"
            className="p-3 hover:bg-foreground/10 rounded-lg hover:text-foreground"
          >
            <FaFacebook className="w-4 h-4" />
          </a>
          <a
            href="#"
            className="p-3 hover:bg-foreground/10 rounded-lg hover:text-foreground"
          >
            <FaTelegramPlane className="w-4 h-4" />
          </a> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
