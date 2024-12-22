import Head from 'next/head';
import Link from 'next/link';
import { HiXMark } from 'react-icons/hi2';

import {IoMdCheckmark} from 'react-icons/io'

export default function services() {

  const services = [
    {
      id: 1,
      title: 'Frontend Development',
      img: '/img/frontend.png',
      points: [
        'Pixel-perfect designs',
        'Responsive layouts',
        'Smooth animations',
        'Cross-browser compatibility',
        'Optimized performance'
      ],
      description:
        'I specialize in crafting stunning, responsive, and high-performing websites that ensure an engaging user experience.'
    },
    {
      id: 2,
      title: 'Fullstack Development',
      img: '/img/fullstack.png',
      points: [
        'Frontend and Backend integration',
        'Database management',
        'API development and integration',
        'Authentication and security',
        'Scalable architecture'
      ],
      description:
        'I build complete web applications, combining seamless functionality with scalable backend solutions to meet your business needs.'
    },
    {
      id: 3,
      title: 'UI/UX Design',
      img: '/img/uiux.png',
      points: [
        'User-centered design',
        'Wireframes and prototypes',
        'Interactive and engaging interfaces',
        'Consistent design systems',
        'Accessibility-focused design'
      ],
      description:
        'I design intuitive and visually appealing interfaces that enhance user satisfaction and drive engagement.'
    }
  ];


  return (
    <>
      <Head>
        <title>Services</title>
      </Head>

      <div className="servicespage">
        <div className="topservices">
          <div className="container">
            <h2 data-aos="fade-up">Pramuja Services</h2>
            <p data-aos="fade-up">
              Home <span>&gt;</span> Services
            </p>
          </div>
        </div>
        <div className="centerservices">
          <div className="container">
            <div className="cservicesbox">
              {services.map((service, index) => {
                // Tentukan animasi berdasarkan posisi
                let animation = '';

                // Menentukan posisi dalam satu baris (0 = kiri, 1 = tengah, 2 = kanan)
                const positionInRow = index % 3;

                if (positionInRow === 0) animation = 'fade-right'; // Kiri
                else if (positionInRow === 1) animation = 'fade-up'; // Tengah
                else if (positionInRow === 2) animation = 'fade-left'; // Kanan

                return (
                  <div
                    className="csservice"
                    key={service.id}
                    data-aos={animation}
                  >
                    <span>0{service.id}</span>
                    <div>
                      <h2>{service.title}</h2>
                      <img src={service.img} alt={service.title} />
                    </div>
                    <ul>
                      {service.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                    <p>{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="pricingplansec">
          <div className="container">
            <div className="pricingtitles text-center">
              <h3>
                <img src="/img/chevron_right.png" alt="" /> SERVICES
              </h3>
              <h2>What I Offer</h2>
            </div>

            <div className="pricingcards">
              <div className="pricingcard">
                <h4>Frontend Development</h4>
                <p>Creating visually appealing and responsive websites</p>
                <h2>
                  $299.00
                </h2>
                <Link href={'/contact'}>
                  <button>Get Started Now</button>
                </Link>
                <div>
                  <h5>Includes:</h5>
                  <ul>
                    <li>
                      <IoMdCheckmark /> Pixel-perfect designs
                    </li>
                    <li>
                      <IoMdCheckmark /> Responsive layouts
                    </li>
                    <li>
                      <IoMdCheckmark /> Smooth animations
                    </li>
                    <li>
                      <HiXMark /> Backend integration
                    </li>
                  </ul>
                </div>
              </div>
              <div className="pricingcard" data-aos="fade-up">
                <h4>Fullstack Development</h4>
                <p>
                  Building complete web applications with seamless functionality
                </p>
                <h2>
                  $599.00
                </h2>
                <Link href={'/contact'}>
                  <button>Get Started Now</button>
                </Link>
                <div>
                  <h5>Includes:</h5>
                  <ul>
                    <li>
                      <IoMdCheckmark /> Frontend and Backend development
                    </li>
                    <li>
                      <IoMdCheckmark /> Database integration
                    </li>
                    <li>
                      <IoMdCheckmark /> API development
                    </li>
                    <li>
                      <HiXMark /> UI/UX design
                    </li>
                  </ul>
                </div>
              </div>
              <div className="pricingcard">
                <h4>UI/UX Design</h4>
                <p>Designing intuitive and engaging user interfaces</p>
                <h2>
                  $199.00
                </h2>
                <Link href={'/contact'}>
                  <button>Get Started Now</button>
                </Link>
                <div>
                  <h5>Includes:</h5>
                  <ul>
                    <li>
                      <IoMdCheckmark /> User-centered design
                    </li>
                    <li>
                      <IoMdCheckmark /> Wireframes and prototypes
                    </li>
                    <li>
                      <IoMdCheckmark /> Interactive design
                    </li>
                    <li>
                      <HiXMark /> Development integration
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
