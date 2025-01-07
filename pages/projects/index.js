import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";

export default function projects() {
    const {alldata, loading} = useFetchData('/api/projects')

    const publishedData = alldata.filter(ab => ab.status === 'publish')

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [filteredProjects, setFilterProjects] = useState([]);

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
    
    return (
      <>
        <Head>
          <title>Project</title>
        </Head>
        <div className="projectpage">
          <div className="projects">
            <div className="container">
              <div className="project_titles">
                <h2 data-aos="fade-up">My Recents Works</h2>
                <p data-aos="fade-up">
                  We put your ideas and thus your wishes in the form of a unique
                  web project that inspires you and customers.
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
                  className={
                    selectedCategory === '3D Web/Game' ? 'active' : ''
                  }
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
                  className={
                    selectedCategory === 'UI/UX Design' ? 'active' : ''
                  }
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
                  filteredProjects.map((pro) => (
                    <Link
                      href={`/projects/${pro.slug}`}
                      key={pro._id}
                      className="procard"
                      data-aos="flip-left"
                      data-aos-easing="ease-out-cubic"
                      data-aos-duration="2000"
                    >
                      <div className="proimgbox">
                        <img src={pro.images[0]} alt={pro.title} />
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
          </div>
        </div>
      </>
    );
}