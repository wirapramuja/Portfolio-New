import Spinner from '@/components/Spinner';
import useFetchData from '@/hooks/useFetchData';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function gallery() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (image, index) => {
    setCurrentImage(image);
    setCurrentIndex(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage(null);
  };

  const handleNextImage = () => {
    if (currentImage && currentImage.images.length > 1) {
      const nextIndex = (currentIndex + 1) % currentImage.images.length;
      setCurrentIndex(nextIndex);
    }
  };

  const handlePrevImage = () => {
    if (currentImage && currentImage.images.length > 1) {
      const prevIndex = (currentIndex - 1 + currentImage.images.length) % currentImage.images.length;
      setCurrentIndex(prevIndex);
    }
  };


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
                    {alldata.map((image, index) => {
                    return (
                      <div
                        className="image-item"
                        data-aos="flip-left"
                        data-aos-easing="ease-out-cubic"
                        data-aos-duration="2000"
                        key={index}
                      >
                        <Image
                          src={image.images[0]}
                          alt={image.title || "Gallery Image"}
                          width={500} // Sesuaikan ukuran
                          height={300} // Sesuaikan ukuran
                          className="gallery-img"
                          onClick={() => openModal(image, index)}
                        />
                        <div className="galeryimgiteminfo">
                          <h2>{image.title}</h2>
                          <p>by Wira Pramuja</p>
                        </div>
                      </div>
                    );
                  })}

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
                            src={currentImage?.images ? currentImage.images[currentIndex] : ''}
                            alt="Preview"
                            className="modal-image"
                          />
                          {currentImage?.images.length > 1 && (
                            <div className="modal-navigation">
                              <button onClick={handlePrevImage}>&lt; Prev</button>
                              <button onClick={handleNextImage}>Next &gt;</button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                </>
              )}
              <div className="image-item"></div>
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
