import Spinner from '@/components/Spinner';
import useFetchData from '@/hooks/useFetchData';
import Head from 'next/head';
import Link from 'next/link';

export default function gallery() {
  const { alldata, loading } = useFetchData('/api/photos');
  return (
    <>
      <Head>
        <title>Gallery</title>
      </Head>

      <div className="gallerypage">
        <div className="container">
          <div className="gallerytopsec">
            <div className="topphonesec">
              <div className="lefttitlesec">
                <h4 data-aos="fade-right">PRAMUJA GALLERY ILLUSTRATION</h4>
                <h1 data-aos="fade-right">
                  Amazing <br />
                  Portrait Illustration
                </h1>
                <Link href={'/gallery#galleryimages'}>
                  <button>VIEW MORE</button>
                </Link>
              </div>
              <div className="rightimgsec">
                <img
                  src="/img/jordan.png"
                  alt=""
                  data-aos="flip-left"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="2000"
                />
                <div className="r_img_top">
                  <img
                    src="/img/kobe.png"
                    alt=""
                    data-aos="flip-left"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000"
                  />
                  <img
                    src="/img/lebron.png"
                    alt=""
                    data-aos="flip-left"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="gallerybtmphotos" id="galleryimages">
          <div className="container">
            <div className="gbtmtitles text-center">
              <h3>
                <span>01//</span> OUR PORTFOLIO
              </h3>
              <h2>
                {' '}
                Capture <span>All of my</span> <br />
                beautiful illustration
              </h2>
            </div>
            <div className="gallery_image_grid">
              {loading ? (
                <Spinner></Spinner>
              ) : (
                <>
                  {alldata.map((photo) => {
                    return (
                      <div
                        className="image-item"
                        data-aos="flip-left"
                        data-aos-easing="ease-out-cubic"
                        data-aos-duration="2000"
                      >
                        <img src={photo.images[0]} alt="" />
                        <div className="galeryimgiteminfo">
                          <h2>{photo.title}</h2>
                          <p>by Wira Pramuja</p>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
              <div className="image-item"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
