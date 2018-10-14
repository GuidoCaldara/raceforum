import { CheckBox } from 'packs/check-box.js'


const ButtonsContainer = (props) => {

	const selectSeason = (e) => {
		props.selectSeason(e)
		let boxes = document.querySelectorAll(".season-check")
		boxes.forEach((b) => {
			if (b.value != e.target.value) { b.checked = false }
		})
	}
	return (<div className="card filter-row row">
		<div className="col l5 m6 s12 col-searchbar">
			<div className="title-search">
				<p className="search-filter-title">Distanza</p>
			</div>
			<div className="d-flex-filter">
				<div className="checkbox-container">
					<CheckBox functionClick={props.searchRaces} name="race_distance" value="short" label="Da 0 a 21 Km" />
					<CheckBox functionClick={props.searchRaces} name="race_distance" value="medium" label="Da 22 a 42,195 km" />
				</div>
				<div className="checkbox-container">
					<CheckBox functionClick={props.searchRaces} name="race_distance" value="long" label="Da 42 a 100 Km" />
					<CheckBox functionClick={props.searchRaces} name="race_distance" value="ultra" label="Oltre i 100 Km" />
				</div>
			</div>
		</div>
		<div className="col l3 m6 s12 col-searchbar">
			<div className="title-search">
				<p className="search-filter-title">Tipo</p>
			</div>
			<div className="d-flex-filter">
				<div className="checkbox-container">
					<CheckBox functionClick={props.searchRaces} name="typo" value="skyrace" label="Skyrace" />
					<CheckBox functionClick={props.searchRaces} name="typo" value="vertical" label="Vertical" />
				</div>
				<div className="checkbox-container">
					<CheckBox functionClick={props.searchRaces} name="typo" value="trail" label="Trail" />
					<CheckBox functionClick={props.searchRaces} name="typo" value="race" label="Race" />
				</div>
			</div>

		</div>
		<div className="col l4 m6 s12 date-column">
			<div className="title-search">
				<p className="search-filter-title">Periodo</p>
			</div>
			<div className="d-flex-filter">
				<div className="checkbox-container">
					<CheckBox functionClick={selectSeason} classval="season-check" name="season" value="summer" data-value="1" label="Estate" />
					<CheckBox functionClick={selectSeason} classval="season-check" name="season" value="spring" data-value="2" label="Primavera" />
				</div>
				<div className="checkbox-container">
					<CheckBox functionClick={selectSeason} classval="season-check" name="season" value="autumn" data-value="3" label="Autunno" />
					<CheckBox functionClick={selectSeason} classval="season-check" name="season" value="winter" data-value="4" label="Inverno" />
				</div>
			</div>
		</div>
	</div>)
}

export default ButtonsContainer