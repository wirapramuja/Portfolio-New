import Link from 'next/link';
import { FaFacebookF, FaGithub, FaTwitter } from 'react-icons/fa6';
import { GrLinkedinOption } from 'react-icons/gr';
import { LiaBasketballBallSolid } from 'react-icons/lia';

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footersec flex flex-center flex-col gap-2">
          <div className="logo">
            <img src="/img/logo.png" alt="" />
          </div>
          <div className="flex ul flx gap-2">
            <li>
              <Link href={'/services'}>Services</Link>
            </li>
            <li>
              <Link href={'/projects'}>Works</Link>
            </li>
            <li>
              <Link href={'/'}>Resume</Link>
            </li>
            <li>
              <Link href={'/'}>Skills</Link>
            </li>
            <li>
              <Link href={'/'}>testimonials</Link>
            </li>
            <li>
              <Link href={'/contact'}>Contact</Link>
            </li>
          </div>

          <ul className="hero_social">
            <li>
              <a
                href="https://x.com/wirapramuja44"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/wirapramuja/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GrLinkedinOption />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/wirapramuja"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
            </li>
          </ul>
          <div className="copyrights">
            &copy; 2024 All Rights Reserved By <span>Pramuja</span>
          </div>
        </div>
      </footer>
    </>
  );
}
