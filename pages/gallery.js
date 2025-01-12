import Spinner from '@/components/Spinner';
import useFetchData from '@/hooks/useFetchData';
import Head from 'next/head';
import Image from 'next/image';
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
                <Image
                  src="/img/jordan.png"
                  alt="Jordan"
                  width={350}
                  height={450}
                  className="main-img"
                  data-aos="flip-left"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="2000"
                />
                <div className="r_img_top">
                  <Image
                    src="/img/kobe.png"
                    alt="Kobe"
                    width={420}
                    height={225}
                    className="top-img"
                    data-aos="flip-left"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000"
                  />
                  <Image
                    src="/img/lebron.png"
                    alt="Lebron"
                    width={300}
                    height={225}
                    className="top-img second"
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
                <Spinner />
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
                        <Image
                          src={photo.images[0]}
                          alt={photo.title || "Gallery Image"}
                          width={500} // Sesuaikan ukuran
                          height={300} // Sesuaikan ukuran
                          className="gallery-img"
                        />
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
