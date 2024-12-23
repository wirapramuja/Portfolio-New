'use client'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { FreeMode } from 'swiper/modules';
import Head from 'next/head';
import { useState } from 'react';
import useFetchData from '@/hooks/useFetchData';
import Spinner from '@/components/Spinner';
import Link from 'next/link';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import Blogsearch from '@/components/Blogsearch';

export default function blogs() {
  //pagination
  const [currentPage, setCurrentPage] = useState(1); //for page 1
  const [perPage] = useState(7);

  //search
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState(false);

  const handleSearchOpen = () => {
    setSearchInput(!searchInput);
  };

  const handleSearchClose = () => {
    setSearchInput(false);
  };


  //fetch blog data
  const { alldata, loading } = useFetchData('/api/blogs');

  //fucntion to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //total number of blogs
  const allblog = alldata.length;

  //filter all data based on search query
  const filteredBlogs =
    searchQuery.trim() === ''
      ? alldata
      : alldata.filter((blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  //calculate index of the first blog displayed on the current page

  const indexOfFirstBlog = (currentPage - 1) * perPage;
  const indexOfLastBlog = currentPage * perPage;

  //get the current page's blogs
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const publishedData = currentBlogs.filter((ab) => ab.status === 'publish');
  
  const sliderpubdata = alldata.filter(ab => ab.status === 'publish')

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
    pageNumbers.push(i);
  }

  const categories = [
    {
      name: 'Next Js',
      href: '/blogs/category/Next js',
      img: 'https://seeklogo.com/images/N/next-js-icon-logo-EE302D5DBD-seeklogo.com.png'
    },
    {
      name: 'Node Js',
      href: '/blogs/category/Node js',
      img: 'https://nodejs.org/static/logos/jsIconGreen.svg'
    },
    {
      name: 'React Js',
      href: '/blogs/category/React js',
      img: 'https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png'
    },
    {
      name: 'Digital',
      href: '/blogs/category/Digital Marketing',
      img: 'https://img.freepik.com/free-vector/abstract-globe-technology-logo-with-global-tech-text-purple-tone_53876-117490.jpg?w=826&t=st=1728985026~exp=1728985626~hmac=a88df6bab68eff413a148ba878e9badfa0a17f80685c4952f580e6411fccb4eb'
    },
    {
      name: 'Flutter',
      href: '/blogs/category/Flutter Dev',
      img: 'https://img.icons8.com/?size=256&id=7I3BjCqe9rjG&format=png'
    },
    {
      name: 'Tailwind',
      href: '/blogs/category/Tailwind CSS',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/512px-Tailwind_CSS_Logo.svg.png?20230715030042'
    }
  ];


  return (
    <>
      <Head>
        <title>Blogs</title>
      </Head>
      <div className="blogpage">
        <section className="tophero">
          <div className="container">
            <div className="toptitle">
              <div className="toptitlecont flex">
                <h1 data-aos="fade-right">
                  Welcome to <span>Pramuja Blogs!</span>
                </h1>
                <p data-aos="fade-right">
                  Welcome to my blog, a space where I document and share
                  everything I've learned about web and Frontend, Backend and
                  Fullstack Development. Here, you'll find articles, tutorials,
                  and insights on modern JavaScript frameworks and development
                  practices. I write to solidify my knowledge and provide
                  valuable resources for fellow developers. Whether you're
                  looking for the latest news, helpful links, or detailed
                  guides, this blog is your go-to destination for all things web
                  and Stack for web development.
                </p>
                <div className="subemail" data-aos="fade-up">
                  <form className="flex">
                    <input
                      onClick={handleSearchOpen}
                      placeholder="Search blogs here..."
                      type="text"
                    />
                    <button>Search</button>
                  </form>
                </div>
              </div>
            </div>

            <div className="featured">
              <div className="container">
                <div className="border"></div>
                <div className="featuredposts">
                  <div className="fetitle flex">
                    <h3 data-aos="fade-up">Featured Posts:</h3>
                  </div>
                  <div className="feposts flex">
                    <Swiper
                      slidesPerView={'auto'}
                      freeMode={true}
                      spaceBetween={30}
                      className="mySwiper"
                      modules={[FreeMode]}
                    >
                      {loading ? (
                        <Spinner />
                      ) : (
                        <>
                          {sliderpubdata.slice(0, 6).map((blog) => {
                            return (
                              <SwiperSlide key={blog._id}>
                                <div className="fpost" key={blog._id}>
                                  <Link
                                    href={`/blogs/${blog.slug}`}
                                    data-aos="flip-left"
                                    data-aos-easing="ease-out-cubic"
                                    data-aos-duration="2000"
                                  >
                                    <img
                                      src={blog.images[0]}
                                      alt={blog.title}
                                    />
                                  </Link>
                                  <div className="fpostinfo">
                                    <div className="tegs flex">
                                      {blog.blogcategory.map((cat) => {
                                        return (
                                          <Link
                                            href={`/blogs/category${cat}`}
                                            className="ai"
                                          >
                                            <span></span>
                                            {cat}
                                          </Link>
                                        );
                                      })}
                                    </div>
                                    <h2>
                                      <Link href={`/blogs/${blog.slug}`}>
                                        {blog.title}
                                      </Link>
                                    </h2>
                                    <div className="fpostby flex">
                                      <img src="/img/ppwira3.png" alt="" />
                                      <p>By Pramuja</p>
                                    </div>
                                  </div>
                                </div>
                              </SwiperSlide>
                            );
                          })}
                        </>
                      )}
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="populartegssec">
          <div className="container">
            <div className="border"></div>
            <div className="populartegsdata">
              <div className="fetitle">
                <h3>Popular Tags</h3>
              </div>

              <div className="poputegs">
                {categories.map((category, index) => (
                  <Link
                    href={category.href}
                    className="pteg"
                    key={index}
                    data-aos={index < 3 ? 'fade-right' : 'fade-left'}
                  >
                    <img
                      src={category.img}
                      style={{
                        width: 100,
                        height: 100
                      }}
                      alt={category.name}
                    />
                    <div className="tegs">
                      <div className="apps">
                        <span></span>
                        {category.name}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="latestpostssec">
          <div className="container">
            <div className="border"></div>
            <div className="latestpostsdata">
              <div className="fetitle">
                <h3>Latest Articles:</h3>
              </div>
              <div className="latestposts">
                {loading ? (
                  <Spinner />
                ) : (
                  <>
                    {publishedData.map((blog) => {
                      return (
                        <div
                          className="lpost"
                          key={blog._id}
                          data-aos="flip-left"
                          data-aos-easing="ease-out-cubic"
                          data-aos-duration="2000"
                        >
                          <div className="lpostimg">
                            <Link href={`/blogs/${blog.slug}`}>
                              <img src={blog.images[0]} alt={blog.title} />
                            </Link>
                            <div className="tegs">
                              {blog.blogcategory.map((cat) => {
                                return (
                                  <Link
                                    href={`/blogs/category${cat}`}
                                    className="ai"
                                  >
                                    <span></span>
                                    {cat}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                          <div className="lpostinfo">
                            <h3>
                              <Link href={`/blogs/${blog.slug}`}>
                                {blog.title}
                              </Link>
                            </h3>
                            <p>{blog.shortDescription}</p>
                            <h4 className="flex">
                              <img src="/img/ppwira3.png" alt="" />
                              <span>by Pramuja</span>
                            </h4>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
            {publishedData.length === 0 ? (
              ''
            ) : (
              <div className="blogspaginationbtn flex flex-center mt-3 ">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {pageNumbers
                  .slice(
                    Math.max(currentPage - 3, 0),
                    Math.min(currentPage + 2, pageNumbers.length)
                  )
                  .map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`${currentPage === number ? 'active' : ''}`}
                    >
                      {number}
                    </button>
                  ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentBlogs.length < perPage}
                >
                  Next
                </button>
              </div>
            )}
          </div>
          {searchInput ? <Blogsearch cls={handleSearchClose} /> : null}
        </section>
      </div>
    </>
  );
}
