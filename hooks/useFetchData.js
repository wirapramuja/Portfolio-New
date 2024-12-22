import axios from 'axios';
import { useState, useEffect } from 'react';

function useFetchData(apiEndPoint) {
  const [alldata, setalldata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    const fetchAllData = async () => {
      try {
        const res = await axios.get(apiEndPoint);
        const allData = res.data;
        setalldata(allData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    //fetch blog daya only if category exist

    if (apiEndPoint) {
      fetchAllData();
    }
  }, [initialLoad, apiEndPoint]); //depend on initaload and api enpoint to triger api call

  return { alldata, loading };
}

export default useFetchData;
