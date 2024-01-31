import './index.css'

const NotFound = () => (
  <div className="NotFoundContainer">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="notFound"
    />
    <h1 className="failureHeading">Page Not Found</h1>
    <p className="failurePara white">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)
export default NotFound
