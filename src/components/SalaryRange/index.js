import './index.css'

const SalaryRange = props => {
  const {item, changeSalary} = props
  const {label, salaryRangeId} = item
  const itemClicked = () => {
    changeSalary(salaryRangeId)
  }
  return (
    <li className="employmentListItem">
      <input
        type="radio"
        id={salaryRangeId}
        name="salary"
        onClick={itemClicked}
      />
      <label htmlFor={salaryRangeId} className="employmentLabelElement">
        {label}
      </label>
    </li>
  )
}
export default SalaryRange
