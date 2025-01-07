import useFetchData from '@/hooks/useFetchData';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';

import ReactMarkdown from 'react-markdown';

import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useState } from 'react';

export default function projectslug() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (image, index) => {
    setCurrentImage(image);
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage(null);
  };

  const handleNextImage = () => {
    const nextIndex = (currentIndex + 1) % alldata[0]?.images.length;
    setCurrentImage(alldata[0]?.images[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const handlePrevImage = () => {
    const prevIndex =
      (currentIndex - 1 + alldata[0]?.images.length) %
      alldata[0]?.images.length;
    setCurrentImage(alldata[0]?.images[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  const router = useRouter();

  const { slug } = router.query;

  const { alldata, loading } = useFetchData(`/api/projects?slug=${slug}`);

  const createdAtDate =
    alldata && alldata[0]?.createdAt
      ? new Date(alldata && alldata[0]?.createdAt)
      : null;

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

   const Code = ({ node, inline, className, children, ...props }) => {
     const match = /language-(\w+)/.exec(className || '');

     const [copied, setCopied] = useState(false);

     const handleCopy = () => {
       navigator.clipboard.writeText(children);
       setCopied(true);
       setTimeout(() => {
         setCopied(false);
       }, 3000);
     };

     if (inline) {
       return <code>{children}</code>;
     } else if (match) {
       return (
         <div style={{ position: 'relative' }}>
           <SyntaxHighlighter
             style={a11yDark}
             language={match[1]}
             PreTag="pre"
             {...props}
             codeTagProps={{
               style: {
                 padding: '0',
                 borderRadius: '5px',
                 overflow: 'auto',
                 whiteSpace: 'pre-wrap'
               }
             }}
           >
             {String(children).replace(/\n$/, '')}
           </SyntaxHighlighter>

           <button
             onClick={handleCopy}
             style={{
               position: 'absolute',
               top: '0',
               right: '0',
               zIndex: '1',
               background: '#3d3d3d',
               color: '#fff',
               padding: '10px'
             }}
           >
             {copied ? 'Copied' : 'Copy Code'}
           </button>
         </div>
       );
     } else {
       return (
         <code className="md-post-code" {...props}>
           {children}
         </code>
       );
     }
   };

  return (
    <>
      <Head>
        <title>{slug}</title>
      </Head>

      <div className="projectslug">
        <div className="projectslugimg">
          <div className="container">
            <div className="proslugimg">
              <img
                src={alldata && alldata[0]?.images[0]}
                alt={alldata && alldata[0]?.title}
              />
            </div>

            <div className="projectsluginfo">
              <div className="leftmainproinfo">
                <h1>{alldata && alldata[0]?.title}</h1>
                <p>{alldata && alldata[0]?.shortDescription}</p>
                <a target="_blank" href={alldata && alldata[0]?.livepreview}>
                  Live Preview
                </a>
              </div>
              <div className="rightmainproinfo">
                <div>
                  <h3>Category</h3>
                  <h2>{alldata && alldata[0]?.projectcategory?.join(', ')}</h2>
                </div>
                <div>
                  <h3>Client</h3>
                  <h2>{alldata && alldata[0]?.client}</h2>
                </div>
                <div>
                  <h3>Start Date</h3>
                  <h2>{formatDate(createdAtDate)}</h2>
                </div>
                <div>
                  <h3>Designer</h3>
                  <h2>Wira Pramuja</h2>
                </div>
              </div>
            </div>

            <div className="projectslugsliderimg">
              <Swiper
                slidesPerView={'auto'}
                spaceBetween={30}
                freeMode={true}
                grabCursor={true}
                modules={[FreeMode]}
                className="mySwiper"
              >
                {alldata &&
                  alldata[0]?.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={image}
                        alt="projects"
                        onClick={() => openModal(image, index)}
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
              {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                  <div
                    className="modal-content"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button className="modal-close" onClick={closeModal}>
                      Close
                    </button>
                    <img
                      src={currentImage}
                      alt="Preview"
                      className="modal-image"
                    />
                    <div className="modal-navigation">
                      <button onClick={handlePrevImage}>&lt; Prev</button>
                      <button onClick={handleNextImage}>Next &gt;</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Slider untuk Video */}
            <div className="projectslugsliderimg mt-4">
              <Swiper
                slidesPerView={'auto'}
                spaceBetween={30}
                freeMode={true}
                grabCursor={true}
                modules={[FreeMode]}
                className="mySwiper"
              >
                {alldata &&
                  alldata[0]?.videosUrl.map((video, index) => (
                    <SwiperSlide key={index}>
                      <video
                        src={video}
                        controls
                        className="object-cover"
                        style={{ maxWidth: '100%', maxHeight: '300px' }}
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        </div>

        <div className="projectslugdescription">
          <div className="container">
            <div className="psdescri">
              <h1>Project Description</h1>
              <div className="blogcontent">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{ code: Code }}
                >
                  {alldata[0]?.description}
                </ReactMarkdown>
              </div>
            </div>

            <div className="blogslugtags">
              <div className="blogstegs">
                <h2>Tags:</h2>
                <div className="flex flex-wrap gap-1">
                  {alldata &&
                    alldata[0]?.tags.map((cat) => {
                      return <span key={cat}>{cat}</span>;
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          position: relative;
          width: 75%; /* Tentukan lebar tetap untuk konten */
          height: 75%; /* Tentukan tinggi tetap untuk konten */
          display: flex;
          flex-direction: column;
          align-items: center;
          background: none;
        }
        .modal-image {
          width: 100%; /* Gambar memenuhi lebar modal */
          height: 100%; /* Gambar memenuhi tinggi modal */
          border-radius: 10px;
          object-fit: contain; /* Menjaga proporsi gambar tanpa memotong */
        }
        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          border: none;
          border-radius: 50%;
          font-size: 1.5rem;
          cursor: pointer;
          width: 40px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-navigation {
          margin-top: 10px;
          display: flex;
          gap: 20px;
        }
        .modal-navigation button {
          padding: 10px 20px;
          background: #845fb3;
          color: #fff;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
        }
        .modal-navigation button:hover {
          background: #6b47a2;
        }
      `}</style>
    </>
  );
}
