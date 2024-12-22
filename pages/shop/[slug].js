import Spinner from '@/components/Spinner';
import useFetchData from '@/hooks/useFetchData';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function shopslug() {
  const router = useRouter();

  const { slug } = router.query;

  const { alldata, loading } = useFetchData(`/api/shops?slug=${slug}`);

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

  const [mainImage, setMainImage] = useState('')

  //useEffect to set main Image once alldata is available

  useEffect(() => {
    if (alldata && alldata.length > 0 && alldata[0]?.images[0]) {
        setMainImage(alldata[0]?.images[0])
    }
  },[alldata])

  //function to handle click on product list image 

  const handleImageClick = (imageSrc) => {
    setMainImage(imageSrc)
  }

  return (
    <>
      <Head>
        <title>Shop Page</title>
      </Head>

      <div className="shopslugpage">
        <div className="shopcontent">
          <div className="container">
            <div className="shopcontbox">
              <div className="leftshopimgbox">
                <div className="leftshopmainimg">
                    {loading ? <Spinner/> : <img src={mainImage} alt='image'/>}
                </div>
                <div className='leftsimgboxlist'>
                    <Swiper
                        slidePerView={'auto'}
                        spaceBetween={30}
                        freeMode={true}
                        grabCursor={false}
                        modules={[FreeMode]}
                        className='mySwiper'
                        
                    >
                        {alldata && alldata[0]?.images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img onClick={()=> handleImageClick(`${image}`)} src={image} alt="" />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>
              </div>
              <div className='rightshopcontbox'>
                <h1>{alldata && alldata[0]?.title}</h1>
                <h3 className='rightshopprice'>Price: <span>{alldata && alldata[0]?.price}</span></h3>
                <a className='shopnowbtn' target='_blank' href={alldata && alldata[0]?.afilink}>
                    Shop Now
                </a>
                <div className='blogcontent'>
                    <h2 className='bctitle'>Product Details:  </h2>
                    <ReactMarkdown
                     rehypePlugins={[remarkGfm]}
                     components={{code: Code,}}
                    >
                        {alldata && alldata[0]?.description}
                    </ReactMarkdown>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
