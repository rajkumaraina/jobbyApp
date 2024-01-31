import {Component, Redirect} from 'react'

import {FaStar, FaBriefcase} from 'react-icons/fa'

import {IoLocationSharp} from 'react-icons/io5'

import {RiExternalLinkFill} from 'react-icons/ri'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import './index.css'

const Views = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const SimilarJobs = props => {
  const {item} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    id,
    location,
    rating,
    title,
  } = item
  return (
    <li className="similarListItem">
      <div className="companyLogoContainer">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="companyLogo"
        />
        <div>
          <p className="title white">{title}</p>
          <div className="starContainer">
            <FaStar className="star" />
            <p className="rating white">{rating}</p>
          </div>
        </div>
      </div>
      <p className="description jobItemdescription">Description</p>
      <p className="jobDescription detailDescription">{jobDescription}</p>
      <div className="locationContainer">
        <div className="starContainer">
          <IoLocationSharp className="location white" />
          <p className="locationPara">{location}</p>
          <FaBriefcase className="location white" />
          <p className="locationPara white">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

const Skills = props => {
  const {item} = props
  const {name, imageUrl} = item
  return (
    <li className="skillListItem">
      <img src={imageUrl} className="skillImg" alt={name} />
      <p className="skillName">{name}</p>
    </li>
  )
}

class JobItem extends Component {
  state = {
    jobDetails: [],
    similarJobs: [],
    skills: [],
    lifeAtCompany: [],
    view: Views.loading,
  }

  componentDidMount = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    let updatedData = data.job_details
    updatedData = {
      companyWebsiteUrl: updatedData.company_website_url,
      companyLogoUrl: updatedData.company_logo_url,
      employmentType: updatedData.employment_type,
      jobDescription: updatedData.job_description,
      id: updatedData.id,
      location: updatedData.location,
      packagePerAnnum: updatedData.package_per_annum,
      rating: updatedData.rating,
      title: updatedData.title,
    }
    const updatedSkills = data.job_details.skills.map(each => ({
      name: each.name,
      imageUrl: each.image_url,
    }))
    console.log(updatedSkills)
    const similar = data.similar_jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      jobDescription: each.job_description,
      id: each.id,
      location: each.location,
      rating: each.rating,
      title: each.title,
    }))
    let updatedLifeAtCompany = data.job_details.life_at_company
    updatedLifeAtCompany = {
      description: updatedLifeAtCompany.description,
      imageUrl: updatedLifeAtCompany.image_url,
    }
    console.log(updatedLifeAtCompany)
    if (response.ok === true) {
      this.setState({
        similarJobs: similar,
        lifeAtCompany: updatedLifeAtCompany,
        skills: updatedSkills,
        jobDetails: updatedData,
        view: Views.success,
      })
    } else {
      this.setState({view: Views.failure})
    }
  }

  renderJobItemSuccessView = () => {
    const {jobDetails, skills, similarJobs, lifeAtCompany} = this.state
    console.log(skills)
    const {
      companyWebsiteUrl,
      companyLogoUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails
    return (
      <div className="JobItemContainer">
        <div className="JobIteminsideContainer">
          <div className="companyLogoContainer">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="companyLogo"
            />
            <div>
              <p className="title white">{title}</p>
              <div className="starContainer">
                <FaStar className="star" />
                <p className="rating white">{rating}</p>
              </div>
            </div>
          </div>
          <div className="locationContainer">
            <div className="starContainer">
              <IoLocationSharp className="location white" />
              <p className="locationPara">{location}</p>
              <FaBriefcase className="location white" />
              <p className="locationPara white">{employmentType}</p>
            </div>
            <div className="starContainer">
              <p className="PackagePara white">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="horizontalJobItemLine" />
          <div className="descriptionJobItem">
            <p className="description jobItemdescription">Description</p>
            <a
              href={`${jobDetails.companyWebsiteUrl}`}
              rel="nofollow"
              className="anchorElement"
            >
              <button
                className="visitButton"
                onClick={this.visitClicked}
                type="button"
              >
                <p className="visitPara">Visit</p>
                <RiExternalLinkFill className="visit white" />
              </button>
            </a>
          </div>
          <p className="jobDescription detailDescription">{jobDescription}</p>
          <p className="description jobItemdescription">Skills</p>
          <ul className="unorderedSkills">
            {skills.map(each => (
              <Skills item={each} key={each.imageUrl} />
            ))}
          </ul>
          <p className="description jobItemdescription">Life at Company</p>
          <div className="lifeatcompany">
            <p className="jobDescription lifeDescription">
              {lifeAtCompany.description}
            </p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="lifeAtCompanyImg"
            />
          </div>
        </div>
        <div className="similarJobsContainer">
          <p className="description jobItemdescription">Similar Jobs</p>
          <ul className="similarJobsUnordered">
            {similarJobs.map(each => (
              <SimilarJobs item={each} key={each.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderJobItemFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobFailure"
      />
      <h1 className="failureHeading">Oops! Something Went Wrong</h1>
      <p className="failurePara">
        We cannot seem to find the page you are looking for.
      </p>
    </>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItem = () => {
    const {view} = this.state
    switch (view) {
      case Views.success:
        return this.renderJobItemSuccessView()
      case Views.failure:
        return this.renderJobItemFailureView()
      case Views.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return this.renderJobItem()
  }
}

export default JobItem
