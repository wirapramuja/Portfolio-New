import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { IoMoonSharp } from "react-icons/io5";
import { LuSun, LuSunMoon } from "react-icons/lu";

export default function Header() {
  //dark mode on off
  const [darkMode, setDarkMode] = useState(false);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    //

    //check local storage for dark mode prefernece on inital load

    const isDarkMode = localStorage.getItem('dakrMode') === 'true';
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    // apply dark mode styles when darkmode state changes
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('darkMode', true);
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('darkMode', false);
    }
  }, [darkMode]);

  //toggle  dark functiion

  const toggleDarkMode = () => {
    setDarkMode(!darkMode); //toggle dark mode status
  };

  // Handle scroll for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  //navlist

  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const [activeLink, setActiveLink] = useState('/');

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setClicked(false);
  };

  useEffect(() => {
    //update active link state when the page is reloaded
    setActiveLink(router.pathname);
  }, [router.pathname]);

  //mobile navbar
  const [mobile, setMobile] = useState(false);

  //open
  const handleMobileOpen = () => {
    setMobile(!mobile);
  };

  //close
  const handleMobileClose = () => {
    setMobile(false);
  };

  return (
    <>
      <header className={sticky ? 'sticky' : ''}>
        <nav className="container flex flex-sb">
          <div className="logo flex gap-2">
            <Link href={'/'}>
              <img src={`/img/${darkMode ? 'white' : 'logo'}.png`} alt="logo" />
            </Link>
            <h2>wiraapramuja44@gmail.com</h2>
          </div>
          <div className="navlist flex gap-2">
            <ul className="flex gap-2">
              <li>
                <Link
                  href={'/'}
                  onClick={() => handleLinkClick('/')}
                  className={activeLink === '/' ? 'active' : ''}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleLinkClick('/blogs')}
                  className={activeLink === '/blogs' ? 'active' : ''}
                  href={'/blogs'}
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleLinkClick('/gallery')}
                  className={activeLink === '/gallery' ? 'active' : ''}
                  href={'/gallery'}
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleLinkClick('/services')}
                  className={activeLink === '/services' ? 'active' : ''}
                  href={'/services'}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleLinkClick('/projects')}
                  className={activeLink === '/projects' ? 'active' : ''}
                  href={'/projects'}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleLinkClick('/shop')}
                  className={activeLink === '/shop' ? 'active' : ''}
                  href={'/shop'}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleLinkClick('/contact')}
                  className={activeLink === '/contact' ? 'active' : ''}
                  href={'/contact'}
                >
                  Contact
                </Link>
              </li>
            </ul>

            <div className="darkmodetoggle" onClick={toggleDarkMode}>
              {darkMode ? <IoMoonSharp /> : <LuSun />}
            </div>

            <button>
              <Link href={'/contact'}>Hire Me!</Link>
            </button>
            <div className="mobiletogglesvg" onClick={handleMobileOpen}>
              <HiMiniBars3BottomRight />
            </div>
          </div>

          <div className={mobile ? 'mobilenavlist active' : 'mobilenavlist'}>
            <span
              onClick={handleMobileClose}
              className={mobile ? 'active' : ''}
            ></span>
            <div className="mobilelogo">
              <img src="/img/white.png" alt="logo" />
              <h2>Pramuja</h2>
            </div>
            <ul
              className="flex gap-1 flex-col flex-left mt-3"
              onClick={handleMobileClose}
            >
              <li>
                <Link
                  href={'/'}
                  onClick={() => handleLinkClick('/')}
                  className={activeLink === '/' ? 'active' : ''}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleLinkClick('/blogs')}
                  className={activeLink === '/blogs' ? 'active' : ''}
                  href={'/blogs'}
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleLinkClick('/gallery')}
                  className={activeLink === '/gallery' ? 'active' : ''}
                  href={'/gallery'}
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleLinkClick('/services')}
                  className={activeLink === '/services' ? 'active' : ''}
                  href={'/services'}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleLinkClick('/projects')}
                  className={activeLink === '/projects' ? 'active' : ''}
                  href={'/projects'}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleLinkClick('/shop')}
                  className={activeLink === '/shop' ? 'active' : ''}
                  href={'/shop'}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleLinkClick('/contact')}
                  className={activeLink === '/contact' ? 'active' : ''}
                  href={'/contact'}
                >
                  Contact
                </Link>
              </li>
            </ul>
            <p>Copyright &copy; 2024 | Pramuja</p>
          </div>
        </nav>
      </header>
    </>
  );
}