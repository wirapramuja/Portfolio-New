// pages/blogs/[slug].js

import { SlCalender } from 'react-icons/sl';
import { CiRead } from 'react-icons/ci';
import { RiFacebookFill } from 'react-icons/ri';
import { FaTwitter } from 'react-icons/fa';
import { RiWhatsappFill } from 'react-icons/ri';
import { BiLogoLinkedin } from 'react-icons/bi';
import { BsCopy } from 'react-icons/bs';
import {FiSearch} from 'react-icons/fi'
import Link from 'next/link';
import Head from 'next/head';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import axios from 'axios';
import { useRouter } from 'next/router';
import useFetchData from '@/hooks/useFetchData';
import { useEffect, useRef, useState } from 'react';
import Spinner from '@/components/Spinner';
import Blogsearch from '@/components/Blogsearch';

const BlogPage = () => {
  const router = useRouter();
  const { slug } = router.query; //fetch the slug parameter from the router

  //hook for all data fetching
  const { alldata } = useFetchData('/api/blogs');
  const [searchInput, setSearchInput] = useState(false)

  const handleSearchOpen = () => {
    setSearchInput(!searchInput)
  }

  const handleSearchClose = () => {
    setSearchInput(false)
  }
  

  const [blogData, setBlogData] = useState({ blog: {}, comments: [] }); //initial comments as an empty array
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    title: '',
    contentpera: '',
    maincomment: true,
    parent: null, //track parent comment id for repplies
    parentName: '' //track parent comment name
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messageOk, setMessageOk] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchBlogData = async () => {
      if (slug) {
        try {
          const response = await axios.get(`/api/blogs/${slug}`);
          setBlogData(response.data);
          setLoading(false);
        } catch (error) {
          setError('Failed to fetch blog data. Please try again later.');
          setLoading(false);
        }
      }
    };
    fetchBlogData();
  }, [slug]); //fetch data whenever slug changes

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/blogs/${slug}`, newComment);

      //check if its reply (nested comment) or root comment

      if (newComment.parent) {
        //add the new comment to its parent's children array
        setBlogData((prevData) => {
          const updatedComments = prevData.comments.map((comment) => {
            if (comment._id === newComment.parent) {
              return {
                ...comment,
                children: [...comment.children, response.data]
              };
            } else if (comment.children && comment.children.length > 0) {
              return {
                ...comment,
                children: updateChildrenComments(
                  comment.children,
                  newComment.parent,
                  response.data
                )
              };
            }
            return comment;
          });

          return {
            ...prevData,
            comments: updatedComments
          };
        });
      } else {
        //add new root comment
        setBlogData((prevData) => ({
          ...prevData,
          comments: [response.data, ...prevData.comments]
        }));
      }

      setMessageOk('✅ Comment posted successfully');
      setTimeout(() => {
        setMessageOk('');
      }, 5000);
      setNewComment({
        name: '',
        email: '',
        title: '',
        contentpera: '',
        maincomment: true,
        parent: null,
        parentName: '' //reset parent name after submission
      });
    } catch (error) {
      setMessageOk('❌ Failed to post comment');
      setTimeout(() => {
        setMessageOk('');
      }, 5000);
    }
  };

  //for scroll down to comment form
  const replyFormRef = useRef(null);

  const handleReply = (parentCommentId, parentName) => {
    setNewComment({
      ...newComment,
      parent: parentCommentId,
      parentName: parentName, //set parent name for the reply
      maincomment: false // set maincomment to false for replies
    })
    if (replyFormRef.current) {
      replyFormRef.current.scrollIntoView({behavior: 'smooth'})
    }
  }

  const handleRemoveReply = () => { 
    setNewComment({
      ...newComment,
      parent: null,
      parentName: null,
      maincomment: true //set mainccomment to true
    })
  }

  const updateChildrenComments = (comments, parentId, newComment) => {
    return comments.map(comment => {
      if (comment._id === parentId) {

        
        //add new reply
        return {
          ...comment,
          children: [...comment.children, newComment]
        };
      } else if (comment.children && comment.children.length > 0) {
        //reccurively update children comments
        return {
          ...comment,
          children: updateChildrenComments(comment.children, parentId, newComment)
        }
      }
      return comment
    })

  };

  if (loading) {
    return (
      <div className="flex flex-center wh_100">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const createdAtDate =
    blogData && blogData.blog.createdAt
      ? new Date(blogData && blogData.blog.createdAt)
      : 'no date';

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

  const blogUrl = `http://localhost:3000/blogs/${slug}`;

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000); //reset copied state after 3 sec
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

  const renderComments = (comments) => {
    if (!comments) {
      return null; //handle case when comments are not yet loaded
    }

    //create a map to efficiently find children of each comment
    const commentsMap = new Map()
    comments.forEach(comment => {
      if (comment.maincomment) {
        commentsMap.set(comment._id, [])
      }
    })

    //populate children comments into their respective parents

    comments.forEach(comment => {
      if (!comment.maincomment && comment.parent) {
        if (commentsMap.has(comment.parent)) {
          commentsMap.get(comment.parent).push(comment)
        }
      }
    })

    //render the comments
    return comments.filter(comment => comment.maincomment).map(parentComment => (
      <div className="blogcomment" key={parentComment._id}>
        <h3>
          {parentComment.name}{' '}
          <span>{new Date(parentComment.createdAt).toLocaleDateString()}</span>
        </h3>
        <h4>
          Topic: <span>{parentComment.title}</span>{' '}
        </h4>
        <p>{parentComment.contentpera}</p>
        <button
          onClick={() => handleReply(parentComment._id, parentComment.name)}
        >
          Reply
        </button>
        {parentComment.parent && (
          <span className="repliedto">
            Replied to {parentComment.parentName}
          </span>
        )}

        <div className='children-comments'>
          {commentsMap.get(parentComment._id).map(childComment => (
            <div className='child-comment' key={childComment._id}>
              <h3>
                {childComment.name} <span>{new Date(childComment.createdAt).toLocaleDateString()}</span>
              </h3>
              <span>Replied to {childComment.parentName}</span>
              <h4>Topic: <span>{childComment.title}</span> </h4>
              <p>{childComment.contentpera}</p>
            </div>
          ))}

        </div>
      </div>
    ))

    
  }

  return (
    <>
      <Head>
        <title>{slug}</title>
      </Head>

      <div>
        {blogData && (
          <div className="blogslugpage">
            <div className="container">
              <div className="blogslugpagecont">
                <div className="leftsitedetails">
                  <div className="leftbloginfoimg">
                    <img
                      src={blogData.blog.images[0] || '/img/noimage.png'}
                      alt=""
                    />
                  </div>
                  <div className="slugbloginfopub">
                    <div className="flex gap-2">
                      <div className="adminslug">
                        <img
                          src={'/img/ppwira.png' || '/img/noimage.png'}
                          alt=""
                        />
                        <span>by Pramuja</span>
                      </div>
                      <div className="adminslug">
                        <SlCalender />
                        <span>{formatDate(createdAtDate)}</span>
                      </div>
                      <div className="adminslug">
                        <CiRead />
                        <span>
                          Comments (
                          {blogData.comments ? blogData.comments.length : 0})
                        </span>
                      </div>
                    </div>

                    <div className="shareblogslug">
                      {/* copy url button */}

                      <div
                        style={{ cursor: 'pointer' }}
                        title="Copy URL"
                        onClick={() => handleCopyUrl(blogUrl)}
                      >
                        <BsCopy /> <span>{copied ? 'Copied!' : ''}</span>
                      </div>

                      {/* Facebook share button */}
                      <a
                        target="_blank"
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                          blogUrl
                        )}`}
                        rel="noopener noreferrer"
                      >
                        <RiFacebookFill />
                      </a>
                      <a
                        target="_blank"
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                          'Check out this blog post:' + blogUrl
                        )}`}
                        rel="noopener noreferrer"
                      >
                        <FaTwitter />
                      </a>
                      <a
                        target="_blank"
                        href={`https://wa.me/?text=Check out this blog post: ${encodeURIComponent(
                          'Check out this blog post:' + blogUrl
                        )}`}
                        rel="noopener noreferrer"
                      >
                        <RiWhatsappFill />
                      </a>
                      <a
                        target="_blank"
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                          'Check out this blog post:' + blogUrl
                        )}`}
                        rel="noopener noreferrer"
                      >
                        <BiLogoLinkedin />
                      </a>
                    </div>
                  </div>
                  <h1>{blogData.blog.title}</h1>
                  {loading ? (
                    <Spinner />
                  ) : (
                    <div className="blogcontent">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{ code: Code }}
                      >
                        {blogData.blog.description}
                      </ReactMarkdown>
                    </div>
                  )}

                  <div className="blogslugtags">
                    <div className="blogstegs">
                      <h2>Tags:</h2>
                      <div className="flex flex-wrap gap-1">
                        {blogData &&
                          blogData.blog.tags.map((cat) => {
                            return <span key={cat}>{cat}</span>;
                          })}
                      </div>
                    </div>
                  </div>

                  <div className="blogslugcomments">
                    <h2>Comments</h2>
                    {renderComments(blogData.comments)}
                  </div>
                  <div className="blogslugcomments" ref={replyFormRef}>
                    {newComment.parentName && (
                      <h2>
                        Leave a reply to{' '}
                        <span className="perentname">
                          {newComment.parentName}
                        </span>{' '}
                        <button
                          className="removereplybtn"
                          onClick={handleRemoveReply}
                        >
                          Remove Reply
                        </button>{' '}
                      </h2>
                    )}
                    {!newComment.parentName && <h2>Leave a reply</h2>}

                    <p>
                      Your email address will not be publish. Required field are
                      marked *
                    </p>
                    <form
                      className="leaveareplyform"
                      onSubmit={handleCommentSubmit}
                    >
                      <div className="nameemailcomment">
                        <input
                          type="text"
                          placeholder="Enter Name"
                          value={newComment.name}
                          onChange={(e) =>
                            setNewComment({
                              ...newComment,
                              name: e.target.value
                            })
                          }
                        />
                        <input
                          type="email"
                          placeholder="Enter Email"
                          value={newComment.email}
                          onChange={(e) =>
                            setNewComment({
                              ...newComment,
                              email: e.target.value
                            })
                          }
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Enter Title"
                        value={newComment.title}
                        onChange={(e) =>
                          setNewComment({
                            ...newComment,
                            title: e.target.value
                          })
                        }
                      />
                      <textarea
                        name=""
                        id="textcomments"
                        placeholder="Enter Your Comments"
                        rows={4}
                        value={newComment.contentpera}
                        onChange={(e) =>
                          setNewComment({
                            ...newComment,
                            contentpera: e.target.value
                          })
                        }
                      ></textarea>
                      <div className="flex gap-2">
                        <button type="submit">Post Comment</button>
                        <p>{messageOk}</p>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="rightsitedetails">
                  <div className="rightslugsearchbar">
                    <input
                      onClick={handleSearchOpen}
                      type="text"
                      placeholder="Search..."
                    />
                    <button>
                      <FiSearch />
                    </button>
                  </div>
                  <div className="rightslugcategory">
                    <h2>CATEGORIES</h2>
                    <ul>
                      <Link href={'/blogs/category/Next js'}>
                        <li>
                          Next Js{' '}
                          <span>
                            (
                            {
                              alldata.filter(
                                (ab) => ab.blogcategory[0] === 'Next js'
                              ).length
                            }
                            )
                          </span>
                        </li>
                      </Link>
                      <Link href={'/blogs/category/Javascript'}>
                        <li>
                          Javascript{' '}
                          <span>
                            (
                            {
                              alldata.filter(
                                (ab) => ab.blogcategory[0] === 'Javascript'
                              ).length
                            }
                            )
                          </span>
                        </li>
                      </Link>
                      <Link href={'/blogs/category/Digital Marketing'}>
                        <li>
                          Digital Marketing{' '}
                          <span>
                            (
                            {
                              alldata.filter(
                                (ab) =>
                                  ab.blogcategory[0] === 'Digital Marketing'
                              ).length
                            }
                            )
                          </span>
                        </li>
                      </Link>
                      <Link href={'/blogs/category/Node js'}>
                        <li>
                          Node JS{' '}
                          <span>
                            (
                            {
                              alldata.filter(
                                (ab) => ab.blogcategory[0] === 'Node js'
                              ).length
                            }
                            )
                          </span>
                        </li>
                      </Link>
                      <Link href={'/blogs/category/React js'}>
                        <li>
                          React Js
                          <span>
                            (
                            {
                              alldata.filter(
                                (ab) => ab.blogcategory[0] === 'React js'
                              ).length
                            }
                            )
                          </span>
                        </li>
                      </Link>
                      <Link href={'/blogs/category/Css'}>
                        <li>
                          Css
                          <span>
                            (
                            {
                              alldata.filter(
                                (ab) => ab.blogcategory[0] === 'Css'
                              ).length
                            }
                            )
                          </span>
                        </li>
                      </Link>
                      <Link href={'/blogs/category/Flutter Dev'}>
                        <li>
                          Flutter Dev
                          <span>
                            (
                            {
                              alldata.filter(
                                (ab) => ab.blogcategory[0] === 'Flutter Dev'
                              ).length
                            }
                            )
                          </span>
                        </li>
                      </Link>
                      <Link href={'/blogs/category/Database'}>
                        <li>
                          Database
                          <span>
                            (
                            {
                              alldata.filter(
                                (ab) => ab.blogcategory[0] === 'Database'
                              ).length
                            }
                            )
                          </span>
                        </li>
                      </Link>
                      <Link href={'/blogs/category/Deployment'}>
                        <li>
                          Deployment
                          <span>
                            (
                            {
                              alldata.filter(
                                (ab) => ab.blogcategory[0] === 'Deployment'
                              ).length
                            }
                            )
                          </span>
                        </li>
                      </Link>
                    </ul>
                  </div>
                  <div className="rightrecentpost">
                    <h2>RECENT POST</h2>
                    {alldata.slice(0, 3).map((blog) => {
                      return (
                        <Link
                          key={blog._id}
                          href={`/blogs/${blog.slug}`}
                          className="rightrecentp"
                        >
                          <img src={blog.images[0]} alt="" />
                          <div>
                            <h3>{blog.title}</h3>
                            <h4 className="mt-1">
                              {blog.tags.map((cat) => {
                                return <span key={cat}>{cat}</span>;
                              })}
                            </h4>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            {searchInput ? <Blogsearch cls={handleSearchClose} /> : null}
          </div>
        )}
      </div>
    </>
  );
};

export default BlogPage;
