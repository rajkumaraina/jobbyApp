import './index.css'

const EmploymentType = props => {
  const {item, ChangeEmployment} = props
  const {label, employmentTypeId} = item
  const itemClick = () => {
    ChangeEmployment(employmentTypeId)
  }
  return (
    <li className="employmentListItem" onClick={itemClick}>
      <input type="checkbox" id="type" />
      <label htmlFor="type" className="employmentLabelElement">
        {label}
      </label>
    </li>
  )
}
export default EmploymentType
