import './index.css'

const EmploymentType = props => {
  const {item, ChangeEmployment} = props
  const {label, employmentTypeId} = item

  const itemClick = () => {
    ChangeEmployment(employmentTypeId)
  }
  return (
    <li className="employmentListItem">
      <input type="checkbox" id={employmentTypeId} onClick={itemClick} />
      <label htmlFor={employmentTypeId} className="employmentLabelElement">
        {label}
      </label>
    </li>
  )
}
export default EmploymentType
