import React, { useEffect, useContext, useState } from 'react';
import Loader from '../components/Loader';
import axios from 'axios';
import { URL } from '../url';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Home = () => {
    const { search } = useLocation();
    const [posts, setPosts] = useState([]); // Changed from post to posts for clarity
    const [noResults, setNoResults] = useState(false);
    const [loader, setLoader] = useState(false);
    const { user } = useContext(UserContext);
    const [cat, setCat] = useState([]);
    const [filteredData, setFilteredData] = useState([]); // Added state for filtered data

    const fetchPosts = async () => {
        setLoader(true);
        try {
            const res = await axios.get(URL + "/api/posts" + search);
            setPosts(res.data); // Set posts data
            setFilteredData(res.data); // Set filtered data to all posts initially

            // Extract categories
            let categories = res.data.flatMap(item => item.categories); // Use flatMap to flatten the array
            let uniqueCategories = new Set(categories); // Use Set to get unique categories
            setCat(Array.from(uniqueCategories)); // Convert Set back to array

            if (res.data.length === 0) {
                setNoResults(true);
            } else {
                setNoResults(false);
            }
        } catch (err) {
            console.log(err);
            setLoader(false); // Set loader to false on error
        } finally {
            setLoader(false); // Ensure loader is false after fetching
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [search]);

    const filterData = (category) => {
        const newPosts = posts.filter(post => post.categories.includes(category)); // Corrected to use categories
        setFilteredData(newPosts);
    };

    return (
        <div>
            <div className='h-[100vh] w-full bg-white dark:bg-black dark:text-white'>
            </div>
            <div className='flex flex-wrap'>
                <div className='p-3 m-5 flex flex-wrap justify-center'>
                    {
                        cat.length > 0 && cat.map((category) => (
                            <button
                                key={category} // Addkey prop for list items
                                className='p-3 m-5 h-[90px] w-[150px] border text-lg font-semibold bg-white hover:shadow-blue-200 shadow shadow-black'
                                onClick={() => filterData(category)} // Corrected function name
                            >
                                {category}
                            </button>
                        ))
                    }
                </div>
            </div>
            <div className='flex flex-wrap w-[95%] justify-center'>
                {
                    loader ? (
                        <div className='h-screen flex justify-center items-center'>
                            <Loader />
                        </div>
                    ) : !noResults ? (
                        filteredData.map((post) => (
                            <div key={post._id} className='flex flex-wrap m-2 sm:w-[35vw] lg:w-[45vw] md:w-[50vw]'>
                                <Link to={user ? `/posts/post/${post._id}` : "/login"}>
                                    <HomePost post={post} />
                                </Link>
                            </div>
                        ))
                    ) : (
                        <h3 className='text-center font-bold mt-16'>
                            No posts Available
                        </h3>
                    )
                }
            </div>
        </div>
    );
};

export default Home;
