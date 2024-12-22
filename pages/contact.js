import Head from 'next/head';
import { FaPhoneVolume, FaTwitter } from 'react-icons/fa6';
import { GrLinkedin } from 'react-icons/gr';
import { MdAttachEmail, MdPriceChange } from 'react-icons/md';
import { BsTwitterX } from 'react-icons/bs';
import { useState } from 'react';
import axios from 'axios';

export default function contact() {
  const [name, setName] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [project, setProject] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDecription] = useState('');

  const [messageOk, setMessageOk] = useState('');

  async function createProduct(ev) {
    ev.preventDefault();

    setMessageOk('Sending...');

    const data = {
      name,
      lname,
      email,
      company,
      phone,
      country,
      project,
      price,
      description
    };

    try {
      await axios.post('/api/contacts', data);
      setMessageOk('✅ Message sent succesfully');

      setName('');
      setLname('');
      setEmail('');
      setCompany('');
      setPhone('');
      setCountry('');
      setProject('');
      setPrice('');
      setDecription('');
    } catch (error) {
      if (error.response) {
        //the req was made and the server responded with a status code
        //the falls out of the range of 2xx

        console.log('server error', error.response.data);
      } else if (error.request) {
        //the req was made but no response was received
        console.log('Network error', error.request);
      } else {
        //something happeed in setting up the req that triggered an error
        console.error('error', error.message);
      }

      setMessageOk('❌ failed to send message');
    }
  }

  const handleProjectChange = (projectName) => {
    if (project.includes(projectName)) {
      setProject(project.filter((project) => project !== projectName));
    } else {
      setProject([...project, projectName]);
    }
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Contact us</title>
      </Head>

      <div className="contactpage">
        <div className="container">
          <div className="contactformp">
            <div className="leftcontp">
              <h2>Get in touch</h2>
              <h2>Let's talk about your project</h2>
              <p>
                Thinking about a new project, a problem to solve, or just want
                to connect? Let's do it!
              </p>
              <p>Use the form on this page or get in touch by other means.</p>
              <p>
                We love questions and feedback - and we're always happy to help!
              </p>
              <div className="leftsociinfo">
                <ul>
                  <li>
                    <FaPhoneVolume />{' '}
                    <span className="">
                      Phone:{' '}
                      <a href="tel:+6289673914054" target="_blank">
                        +62 89673914054
                      </a>
                    </span>
                  </li>
                  <li>
                    <MdAttachEmail />{' '}
                    <span className="">
                      Email:{' '}
                      <a href="mailto:wiraapramuja44@gmail.com" target="_blank">
                        wiraapramuja44@gmail.com
                      </a>
                    </span>
                  </li>
                  <li>
                    <GrLinkedin />{' '}
                    <span className="">
                      Linkedin:{' '}
                      <a
                        href="https://www.linkedin.com/in/wirapramuja/"
                        target="_blank"
                      >
                        linkedin/in/wirapramuja
                      </a>
                    </span>
                  </li>
                  <li>
                    <BsTwitterX />{' '}
                    <span className="">
                      Twitter:{' '}
                      <a href="https://x.com/wirapramuja44" target="_blank">
                        @Wirapramuja44
                      </a>
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="rightcontp">
              <form onSubmit={createProduct}>
                <div className="rightconttitle">
                  <h2>Your Contact Information</h2>
                </div>
                <div className="rightcontinputs">
                  <input
                    type="text"
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
                    placeholder="First Name"
                    required
                  />
                  <input
                    type="text"
                    value={lname}
                    onChange={(ev) => setLname(ev.target.value)}
                    placeholder="Last Name"
                    required
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    placeholder="Email Address"
                    required
                  />
                  <input
                    type="text"
                    value={company}
                    onChange={(ev) => setCompany(ev.target.value)}
                    placeholder="Company Name"
                    required
                  />
                  <input
                    type="number"
                    value={phone}
                    onChange={(ev) => setPhone(ev.target.value)}
                    placeholder="Phone Number"
                    required
                  />
                </div>

                <div className="rightconttitle">
                  <h2>What services do you need for your project?</h2>
                </div>
                <div className="rightcontcheckbox">
                  {[
                    'Website Development',
                    'App Development',
                    'Design System',
                    'Website Migration',
                    'E-ccomerce Site',
                    'Performance Evaluation'
                  ].map((projectOption) => (
                    <label
                      key={projectOption}
                      className="cyberpunk-checkbox-label"
                    >
                      <input
                        type="checkbox"
                        className="cyberpunk-checkbox"
                        value={projectOption}
                        checked={project.includes(projectOption)}
                        onChange={() => handleProjectChange(projectOption)}
                      />
                      {projectOption}
                    </label>
                  ))}
                </div>
                <div className="rightconttitle">
                  <h2>
                    How much is the anticipated budget for your next project
                  </h2>
                </div>
                <div className="rightcontredio">
                  {[
                    'Less than $400',
                    '$400 - $800',
                    '$800 - $1000',
                    'More than $1000'
                  ].map((priceRange) => (
                    <div key={priceRange} className="radio-button">
                      <input
                        type="radio"
                        id={priceRange}
                        name="example-radio"
                        value={priceRange}
                        checked={price === priceRange}
                        onChange={handlePriceChange}
                      />
                      <span className="radio"></span>
                      <label
                        htmlFor={priceRange}
                        style={{
                          cursor: 'pointer'
                        }}
                        >{priceRange}
                      </label>
                    </div>
                  ))}
                </div>
                <div className='rightconttitle'>
                    <h2>Tell me about your project </h2>
                </div>
                <div className='rightcontpera'>
                  <textarea value={description} onChange={ev => setDecription(ev.target.value)} name='description' rows={4} placeholder='Project Description'>
                  </textarea>
                </div>
                    <div className='righhcontsbtn flex gap-3'>
                      <button type='submit'>Submit</button>
                      <p>{messageOk}</p>
                    </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
