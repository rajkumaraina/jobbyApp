import './index.css'

const SalaryRange = props => {
  const {item, changeSalary} = props
  const {label, salaryRangeId} = item
  const itemClicked = () => {
    changeSalary(salaryRangeId)
  }
  return (
    <li className="employmentListItem" onClick={itemClicked}>
      <input type="radio" id="type" name="salary" />
      <label htmlFor="type" className="employmentLabelElement">
        {label}
      </label>
    </li>
  )
}
export default SalaryRange
