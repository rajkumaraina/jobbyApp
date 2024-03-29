import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = props => {
  const jobsButton = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <div className="homeContainer">
      <Header />
      <h1 className="homeHeading">Find The Job That Fits Your Life</h1>
      <p className="homePara">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs" className="LinkElement">
        <button className="jobsButton" type="button" onClick={jobsButton}>
          Find Jobs
        </button>
      </Link>
    </div>
  )
}
export default Home
