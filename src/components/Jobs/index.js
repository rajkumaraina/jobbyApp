import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'

import EmploymentType from '../EmploymentType'

import SalaryRange from '../SalaryRange'

import EachJob from '../EachJob'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const Views = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Jobs extends Component {
  state = {
    typeOfEmployment: [],
    salaryRange: '',
    profileDetails: {},
    searchInput: '',
    view: Views.loading,
    jobView: Views.loading,
    JobsList: [],
    finalSearch: '',
  }

  componentDidMount = () => {
    this.getProfile()
    this.getJobs()
  }

  getProfile = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      let updatedData = data.profile_details
      updatedData = {
        name: updatedData.name,
        profileImageUrl: updatedData.profile_image_url,
        shortBio: updatedData.short_bio,
      }
      this.setState({profileDetails: updatedData, view: Views.success})
    } else {
      this.setState({view: Views.failure})
    }
  }

  getJobs = async () => {
    const {typeOfEmployment, salaryRange, finalSearch} = this.state
    const Employment = typeOfEmployment.join()
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const url = `https://apis.ccbp.in/jobs?employment_type=${Employment}&minimum_package=${salaryRange}&search=${finalSearch}`
    console.log(url)
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        id: each.id,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({JobsList: updatedData, jobView: Views.success})
    } else {
      this.setState({jobView: Views.failure})
    }
  }

  ChangeEmployment = item => {
    const {typeOfEmployment} = this.state
    console.log(typeOfEmployment)
    if (typeOfEmployment.includes(item) === false) {
      this.setState(
        prevState => ({
          typeOfEmployment: [...prevState.typeOfEmployment, item],
        }),
        this.getJobs,
      )
    } else {
      this.setState(
        prevState => ({
          typeOfEmployment: prevState.typeOfEmployment.filter(
            each => each !== item,
          ),
        }),
        this.getJobs,
      )
    }
    console.log(this.state)
  }

  changeSalary = item => {
    this.setState({salaryRange: item}, this.getJobs)
  }

  InputChange = event => {
    this.setState({searchInput: event.target.value})
  }

  Searching = () => {
    const {searchInput} = this.state
    this.setState({finalSearch: searchInput}, this.getJobs)
  }

  renderProfileSuccessView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profileContainer">
        <img src={profileImageUrl} alt="profile" className="profile" />
        <h1 className="profileName">{name}</h1>
        <p className="profilePara">{shortBio}</p>
      </div>
    )
  }

  retryProfileButton = () => {
    this.setState({view: Views.loading}, this.getProfile)
  }

  retryJobButton = () => {
    this.setState({view: Views.loading}, this.getJobs)
  }

  renderProfileFailureView = () => (
    <button
      className="retryButton"
      type="button"
      onClick={this.retryProfileButton}
    >
      Retry
    </button>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  profile = () => {
    const {view} = this.state
    switch (view) {
      case Views.success:
        return this.renderProfileSuccessView()
      case Views.failure:
        return this.renderProfileFailureView()
      case Views.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderSuccessJobView = () => {
    const {JobsList, finalSearch} = this.state
    const filteredList = JobsList.filter(each => {
      const EachItem = each.title.toLowerCase()
      return EachItem.includes(finalSearch.toLowerCase())
    })
    let JOB
    if (filteredList.length === 0) {
      JOB = (
        <div className="noJobContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="noJobView"
          />
          <h1 className="noJobHeading">No Jobs Found</h1>
          <p className="noJobPara">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      )
    } else {
      JOB = (
        <ul className="jobsUnordered">
          {filteredList.map(each => (
            <EachJob item={each} key={each.id} />
          ))}
        </ul>
      )
    }
    return JOB
  }

  renderFailureJobView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobFailure"
      />
      <h1 className="failureHeading">Oops! Something Went Wrong</h1>
      <p className="failurePara">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="failureButton"
        type="button"
        onClick={this.retryJobButton}
      >
        Retry
      </button>
    </>
  )

  EveryJob = () => {
    const {jobView} = this.state
    switch (jobView) {
      case Views.success:
        return this.renderSuccessJobView()
      case Views.failure:
        return this.renderFailureJobView()
      case Views.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobContainer">
          <div className="jobFirstContainer">
            <div className="searchContainer smallScreen">
              <input
                type="search"
                placeholder="Search"
                value={searchInput}
                className="searchInput"
                onChange={this.InputChange}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="searchButton"
                onClick={this.Searching}
              >
                .<BsSearch className="search-icon" />
              </button>
            </div>
            {this.profile()}
            <hr className="horizontalProfileLine" />
            <h1 className="type">Type of Employment</h1>
            <ul className="employmentUnordered">
              {employmentTypesList.map(each => (
                <EmploymentType
                  item={each}
                  key={each.employmentTypeId}
                  ChangeEmployment={this.ChangeEmployment}
                />
              ))}
            </ul>
            <hr className="horizontalProfileLine" />
            <h1 className="type">Salary Range</h1>
            <ul className="salaryUnordered">
              {salaryRangesList.map(each => (
                <SalaryRange
                  item={each}
                  key={each.salaryRangeId}
                  changeSalary={this.changeSalary}
                />
              ))}
            </ul>
          </div>
          <div className="jobSecondContainer">
            <div className="searchContainer bigScreen">
              <input
                type="search"
                placeholder="Search"
                value={searchInput}
                className="searchInput"
                onChange={this.InputChange}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="searchButton"
                onClick={this.Searching}
              >
                .<BsSearch className="search-icon" />
              </button>
            </div>
            {this.EveryJob()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
