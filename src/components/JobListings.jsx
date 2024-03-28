/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import JobListing from "./JobListing";
const JobListings = ({ recentOnly }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const url = recentOnly ? "/api/jobs?_limit=3" : "/api/jobs";
        const res = await fetch(url);
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.log("Error in fetching data for jobs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);
  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {recentOnly ? "Recent Jobs" : "Browse Jobs"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
              Loading...
            </h2>
          ) : (
            jobs.length > 0 &&
            jobs.map((job) => <JobListing key={job.id} job={job} />)
          )}
        </div>
      </div>
    </section>
  );
};

export default JobListings;
