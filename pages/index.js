import Head from 'next/head';
import Link from 'next/link';
import { BiDownload } from 'react-icons/bi';
import { FaCalendarDays, FaGithub, FaTwitter } from 'react-icons/fa6';
import { GrLinkedinOption } from 'react-icons/gr';

import { GoArrowUpRight } from 'react-icons/go';
import { useEffect, useRef, useState } from 'react';
import Spinner from '@/components/Spinner';
import { LuMedal } from 'react-icons/lu';
import { PiGraduationCap } from 'react-icons/pi';
import { CiCircleMinus } from 'react-icons/ci';
import Typed from 'typed.js';
import Image from 'next/image';
import { experiences } from '@/constants/Experience';
import { education } from '@/constants/Education';
import { skills } from '@/constants/Skills';
import { funFacts } from '@/constants/FunFact';
import { services } from '@/constants/Services';

export default function Home() {
  const typedRef = useRef(null);
  //active service background color:
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        'Frontend Dev',
        'Fullstack Dev',
        'UX Designer',
        '3D Web / Game Dev'
      ], // Teks yang akan ditampilkan
      typeSpeed: 50, // Kecepatan mengetik (ms)
      backSpeed: 30, // Kecepatan menghapus (ms)
      loop: true // Aktifkan loop
    });

    return () => {
      typed.destroy(); // Hapus instance Typed.js saat komponen di-unmount
    };
  }, []);

  const handleHover = (index) => {
    setActiveIndex(index);
  };

  const handleMouseOut = () => {
    setActiveIndex(0); //set the first iem as active when mouse leaves
  };

  const [loading, setLoading] = useState(true);
  const [alldata, setAlldata] = useState([]);
  const [allwork, setAllwork] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProjects, setFilterProjects] = useState([]);

  console.log(alldata);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectResponse, blogsResponse] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/blogs')
        ]);

        const projectData = await projectResponse.json();
        const blogsData = await blogsResponse.json();

        setAlldata(projectData);
        setAllwork(blogsData);
      } catch (error) {
        console.log('Error Fetching Data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    //filter project based on selectedCategory
    if (selectedCategory === 'All') {
      setFilterProjects(alldata.filter((pro) => pro.status === 'publish'));
    } else {
      setFilterProjects(
        alldata.filter(
          (pro) =>
            pro.status === 'publish' &&
            pro.projectcategory.includes(selectedCategory)
        )
      );
    }
  }, [selectedCategory, alldata]);

  //function to format the date as '2- may 2024'
  const formatDate = (date) => {
    //check if date is valid
    if (!date || isNaN(date)) {
      return ''; //or handle the error as needed
    }

    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour12: true // use 12 hour format
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  

  return (
    <>
      <Head>
        <title>Pramuja - Personal Portfolio</title>
        <meta name="description" content="vbmcoder - Personal Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
      </Head>

      {/* hero section */}
      <section className="hero">
        <div className="intro_text">
          <svg viewBox=" 0 0 1320 300">
            <text
              x="50%"
              y="50%"
              text-acndhor="middle"
              className="animate-stroke"
            >
              HI
            </text>
          </svg>
        </div>
        <div className="container">
          <div className="flex w-100">
            <div className="heroinfoleft">
              <span className="hero_sb_title" data-aos="fade-right">
                I am Pramuja
              </span>
              <h1 className="hero_title" data-aos="fade-right">
                Web Developer + <br />{' '}
                <span ref={typedRef} className="typed-cursor"></span>
              </h1>
              <div
                className="hero_img_box heroimgbox"
                data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
              >
                <img src="/img/ppwira3.png" alt="coder" />
              </div>
              <div className="lead" data-aos="fade-up">
                I break down complex user experience problems to create
                integrity foccused solutions that connect billions of people
              </div>
              <div className="hero_btn_box" data-aos="fade-up">
                <Link
                  href="/img/wira-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="wira-resume-frontend.pdf"
                  className="download_cv"
                >
                  Download CV
                  <BiDownload />
                </Link>
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
              </div>
            </div>
            {/* Rightside image section */}
            <div className="heroimageright">
              <div
                className="hero_img_box"
                data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
              >
                <img
                  src="/img/ppwira3.png"
                  style={{
                    width: 500,
                    height: 500
                  }}
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="funfect_area flex flex-sb">
            {funFacts.map((fact) => (
              <div
                key={fact.id}
                className="funfect_item"
                data-aos={fact.aos}
              >
                <h3>{fact.value}</h3>
                <h4>
                  {fact.title} <br />
                  {fact.subtitle}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services">
        <div className="container">
          <div className="services_titles">
            <h2 data-aos="fade-up">My Quality Services</h2>
            <p data-aos="fade-up">
              We put your ideas and thus your wishes in the form of a unique web
              project that isnpires you and you customers.
            </p>
          </div>
          <div className="services_menu" data-aos="fade-up">
            {services.map((service, index) => (
              <div
                className={`services_item ${activeIndex === index ? 'sactive' : ''
                  }`}
                onMouseOver={() => handleHover(index)}
                key={index}
                onMouseOut={handleMouseOut}
              >
                <div className="left_s_box">
                  <span>0{index + 1}</span>
                  <h3>{service.title}</h3>
                </div>
                <div className="right_s_box">
                  <p>{service.description}</p>
                </div>
                <GoArrowUpRight />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="projects">
        <div className="container">
          <div className="project_titles" data-aos="fade-up">
            <h2>My Recent Works</h2>
            <p>
              We put your ideas and thus your wishes in the form of a unique web
              project that isnpires you and you customers.
            </p>
          </div>
          <div
            className="project_buttons"
            data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
            data-aos-delay="300"
            data-aos-offset="0"
          >
            <button
              className={selectedCategory === 'All' ? 'active' : ''}
              onClick={() => setSelectedCategory('All')}
            >
              All
            </button>
            <button
              className={selectedCategory === '3D Web/Game' ? 'active' : ''}
              onClick={() => setSelectedCategory('3D Web/Game')}
            >
              3D Web / Game
            </button>
            <button
              className={
                selectedCategory === 'Frontend Development' ? 'active' : ''
              }
              onClick={() => setSelectedCategory('Frontend Development')}
            >
              Frontend Development
            </button>
            <button
              className={
                selectedCategory === 'Fullstack Development' ? 'active' : ''
              }
              onClick={() => setSelectedCategory('Fullstack Development')}
            >
              Fullstack Delopment
            </button>
            <button
              className={selectedCategory === 'UI/UX Design' ? 'active' : ''}
              onClick={() => setSelectedCategory('UI/UX Design')}
            >
              UI/UX Design
            </button>
          </div>
          <div className="projects_cards">
            {loading ? (
              <div className="flex flex-center wh_50">
                <Spinner />
              </div>
            ) : filteredProjects.length === 0 ? (
              <h1>No Project Found</h1>
            ) : (
              filteredProjects.slice(0, 4).map((pro) => (
                <Link
                  href={`/projects/${pro.slug}`}
                  key={pro._id}
                  className="procard"
                  data-aos="flip-left"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="2000"
                >
                  <div className="proimgbox">
                    <Image priority={false} className='proimgbox-img' width={800} height={800} src={pro.images[0]} alt={pro.title} />
                  </div>
                  <div className="procontentbox">
                    <h2>{pro.title}</h2>
                    <GoArrowUpRight />
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Experience study */}
      <section className="exstudy">
        <div className="container flex flex-left flex-sb">
          <div className="experience">
            <div className="experience_title flex gap-1" data-aos="fade-right">
              <LuMedal />
              <h2>My Experience</h2>
            </div>
            <div className="exper_cards">
              {experiences.map((exp, index) => (
                <div className="exper_card" data-aos="fade-up" key={index}>
                  <span>{exp.date}</span>
                  <h3>{exp.title}</h3>
                  <hr className="mt-1" />
                  {exp.description.map((desc, i) => (
                    <p className="mt-1" key={i}>
                      {desc}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="education">
            <div className="experience_title flex gap-1" data-aos="fade-left">
              <PiGraduationCap />
              <h2>My Education</h2>
            </div>
            <div className="exper_cards">
              {education.map((edu, index) => (
                <div className="exper_card" data-aos="fade-up" key={index}>
                  <span>{edu.date}</span>
                  <h3>{edu.title}</h3>
                  <p>{edu.subtitle}</p>
                <hr className="mt-1" />
                  {edu.description.map((desc, i) => (
                    <p className="mt-1" key={i}>
                      {desc}
                    </p>
                  ))}
              </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* My Skills */}
      <section className="myskills">
        <div className="container">
          <div className="myskills_title" data-aos="fade-up">
            <h2>My Skills</h2>
            <p>
              We put your ideas and thus your wishes in the form of a unique web
              project that isnpires you and you customers.
            </p>
          </div>
          <div className="myskils_cards">
            {skills.map((skill, index) => (
              <div
                className="mys_card"
                key={index}
                data-aos={index % 6 < 3 ? 'fade-right' : 'fade-left'}
              >
                <div className="mys_inner">
                  <Image
                    width={80}
                    height={80}
                    src={skill.src}
                    alt={skill.alt}
                    className="skills-image"
                  />
                  <h3>{skill.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Blogs */}
      <section className="recentblogs">
        <section className="container">
          <div className="myskills_title">
            <h2 data-aos="fade-up">Recent Blogs</h2>
            <p data-aos="fade-up">
              We put your ideas and thus your wishes in the form of a unique web
              project that isnpires you and you customers.
            </p>
          </div>
          <div className="recent_blogs">
            {allwork.slice(0, 3).map((blog) => {
              return (
                <Link
                  href={`/blogs/${blog.slug}`}
                  key={blog._id}
                  className="re_blog"
                  data-aos="flip-left"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="2000"
                >
                  <div className="re_blogimg">
                    <img src={blog.images[0] || '/img/noimage.png'} alt="" />
                    <span>{blog.blogcategory[0]}</span>
                  </div>
                  <div className="re_bloginfo">
                    <div className="re_topdate flex gap-1">
                      <div className="res_date">
                        <FaCalendarDays />{' '}
                        <span>{formatDate(new Date(blog.createdAt))}</span>
                      </div>
                    </div>
                    <h2>{blog.title}</h2>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </section>
    </>
  );
}
