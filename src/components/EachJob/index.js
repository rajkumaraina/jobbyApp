import {FaStar, FaBriefcase} from 'react-icons/fa'

import {Link} from 'react-router-dom'

import {IoLocationSharp} from 'react-icons/io5'

import './index.css'

const EachJob = props => {
  const {item} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    location,
    title,
    rating,
    packagePerAnnum,
    jobDescription,
  } = item
  return (
    <Link to={`/jobs/${id}`} className="jobLinkElement">
      <li className="particularJobContainer">
        <div className="companyLogoContainer">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="companyLogo"
          />
          <div>
            <h1 className="title">{title}</h1>
            <div className="starContainer">
              <FaStar className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="locationContainer">
          <div className="starContainer">
            <IoLocationSharp className="location" />
            <p className="locationPara">{location}</p>
            <FaBriefcase className="location" />
            <p className="locationPara">{employmentType}</p>
          </div>
          <div className="starContainer">
            <p className="PackagePara">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="horizontalJobLine" />
        <h1 className="description">Description</h1>
        <p className="jobDescription">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default EachJob
