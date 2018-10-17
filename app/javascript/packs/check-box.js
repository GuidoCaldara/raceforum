const CheckBox = (props) => {
	let name = `${props.name}[]`
	let id = `${props.name}_`
	let classattributes = `${props.classval} filled-in`
	return (
		<label>
			<div className='checkbox'>
				<input className={classattributes} onChange={props.functionClick} data-type={props.name} type="checkbox" name={name} id={id} value={props.value} />
				<span className="checkBoxSpan">{props.label}</span>
			</div>
		</label>
	)
}


export default CheckBox