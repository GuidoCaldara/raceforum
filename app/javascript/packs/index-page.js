import React from 'react';
import ReactDOM from 'react-dom';
import Flatpickr from 'react-flatpickr'
import {Component} from 'react'
import { compose, withProps } from "recompose"
import {  withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { calculateCenter } from "packs/calculateCenter"
import { MapWithAMakredInfoWindow } from 'packs/react-map.js';
import {calcCrow} from 'packs/geoloc-calculator.js'
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyCFlJdOlbwUvf8Dn0Dov_urzaVvgxdRgxs");

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.filterDistance = this.filterDistance.bind(this)
    this.filterType = this.filterType.bind(this)
    this.resetSearch = this.resetSearch.bind(this)
    this.selectSeason = this.selectSeason.bind(this)
    this.resetLocation = this.resetLocation.bind(this)
    this.orderByDate = this.orderByDate.bind(this)
    this.filterBySeason = this.filterBySeason.bind(this)
    this.filterDate = this.filterDate.bind(this)
    this.filterRaces = this.filterRaces.bind(this)
    this.resetDate = this.resetDate.bind(this)
    this.getCordinates = this.getCordinates.bind(this)
    this.searchRaces = this.searchRaces.bind(this)
    this.state = {
      startDate: new Date(),
      races: this.props.races,
      locationName: null,
      locationValueDefault: null,
      filters: [],
      location: null,
      selectedDate: null,
      distances: [],
      filteredRaces: null,
      dates: [],
      typos: [],
      choosen_season: []
    };
  }

  resetSearch(){
    this.setState(this.getInitialState());
  }

  filterRaces() {
    races = this.state.races
    if (this.state.filters.includes("distance")) {
      races = this.filterByDistance(races)
    }
    if (this.state.filters.includes("season")) {
      races = this.filterBySeason(races)
    }

    if (this.state.filters.includes("type")) {
      races = this.filterByType(races)
    }
    if (this.state.filters.includes("dates")) {
      races = this.filterByDate(races)
    }
    if (this.state.filters.includes("location")) {
      races = this.filterByLocation(races)
    }
    this.setState(() => {
      return {filteredRaces: races}
    })

  }

  filterBySeason(races){
    let races_list = races
    const loc = this.state.choosen_season
    races_list = races_list.filter(function (e) {
      return loc.includes((new Date(e.next_edition).getMonth() + 1))
    });

    // races_list = races.filter(e =>  this.state.choosen_season.includes(new Date(e.next_edition).getMonth()) )
    return races_list;

  }

  filterByLocation(races) {
    let races_list = races
    const loc = this.state.location
    races_list = races.filter(e => calcCrow(loc.lat, loc.lng, e.latitude, e.longitude) < 40)
    return races_list;
  }

  filterByDate(races) {
    let races_list = races
    races_list = races_list.filter(e => new Date(e.next_edition) >= this.state.dates[0])
    races_list = races_list.filter(e => new Date(e.next_edition) <= this.state.dates[1])
    return races_list
  }

  filterByDistance(races) {
    let races_list = races
    races_list = races_list.filter(e => this.state.distances.includes(e.distance_type))
    return races_list
  }

  filterByType(races) {
    let races_list = races
    races_list = races_list.filter(e => this.state.typos.includes(e.typo))
    return races_list
  }

  resetDate() {
    let filters = this.state.filters
    let index_filter = filters.indexOf("dates")
    filters.splice(index_filter, 1)
    this.setState(() => {
      return {filters: filters, selectedDate: null}
    })
  }

  resetLocation() {
    let filters = this.state.filters
    let index_filter = filters.indexOf("location")
    filters.splice(index_filter, 1)
    this.setState(() => {
      return {filters: filters, location: null, locationName: null}
    })
    this.filterRaces()
  }

  filterDate(e) {
    let filters = this.state.filters
    if (e.length > 1) {
      this.setState(() => {
        return {selectedDate: e}
      })
      if (filters.indexOf("dates") == -1) {
        filters.push("dates")
      }
      this.setState(() => {
        return {dates: e, filters: filters}
      })
    }
    this.filterRaces()
  }

  filterDistance(e) {
    let distances_array = this.state.distances
    let filters = this.state.filters
    const value = e.target.value
    if (e.target.checked) {
      distances_array.push(value)
      if (filters.indexOf("distance") == -1)
        filters.push("distance")
      this.setState(() => {
        return {distances: distances_array, filters: filters}
      })
    } else {
      let index_distance = distances_array.indexOf(value)
      let index_filter = filters.indexOf("distance")
      distances_array.splice(index_distance, 1)
      if (distances_array.length == 0) {
        filters.splice(index_filter, 1)
      }
      this.setState(() => {
        return {distances: distances_array, filters: filters}
      })
    }
    this.filterRaces()
  }

  filterType(e) {
    let typos_array = this.state.typos
    let filter_type = this.state.filters
    const value = e.target.value
    if (e.target.checked) {
      typos_array.push(value)
      if (filter_type.indexOf("type") == -1)
        filter_type.push("type")
      this.setState(() => {
        return {typos: typos_array, filter_type: filter_type}
      })
    } else {
      let index_typos = typos_array.indexOf(value)
      let index_filter = filter_type.indexOf("type")
      typos_array.splice(index_typos, 1)
      if (typos_array.length == 0) {
        filter_type.splice(index_filter, 1)
      }
      this.setState(() => {
        return {typos: typos_array, filter_type: filter_type}
      })
    }
    this.filterRaces()
  }

  searchRaces(e) {
    if (e.target != null) {
      if (e.target.dataset.type == "race_distance")
        this.filterDistance(e)
      if (e.target.dataset.type == "typo")
        this.filterType(e)
    }
  }

  selectSeason(e){
    this.setState(() => {
      return {choosen_season: []}
    })
    let seasons = this.state.choosen_season
    let filter_type = this.state.filters
    if (e.target.checked){
      if (filter_type.indexOf("season") == -1)
        filter_type.push("season")
        switch(e.target.value) {
            case "summer":
                seasons[0] = 6
                seasons[1] = 7
                seasons[2] = 8
                break;
            case "spring":
                seasons[0] = 3
                seasons[1] = 4
                seasons[2] = 5
                break;
            case "autumn":
                seasons[0] = 9
                seasons[1] = 10
                seasons[2] = 11
                break;
            case "spring":
                seasons[0] = 12
                seasons[1] = 1
                seasons[2] = 2
                break;
        }
      this.setState((prevState) => {
        return {choosen_season: seasons, filter_type: filter_type}
      })
    } else {
      let index_filter = filter_type.indexOf("season")
      filter_type.splice(index_filter, 1)
      this.setState(() => {
        return {filter_type: filter_type}
      })
    }
    this.filterRaces()
  }

  getCordinates(e) {
    e.preventDefault()
    let place = e.target.elements[0].value
    Geocode.fromAddress(place).then(response => {
      const {lat, lng} = response.results[0].geometry.location;
      let filters = this.state.filters
      if (filters.indexOf("location") == -1)
        filters.push("location")
      this.setState(() => {
        return {
          location: {
            lat,
            lng
          },
          filters: filters
        }
      })
      this.filterRaces()
    }, error => {
      console.error(error);
    });
  }

  orderByDate(races){
   var orderedRaces = races.sort((a,b) => {
      return new Date(a.next_edition).getTime() -
          new Date(b.next_edition).getTime()
  })
     return orderedRaces
  }

  render() {
    let races = this.state.races.filter(e => new Date(e.next_edition) <= new Date(new Date().getTime()+(100*24*60*60*1000)))
    if (this.state.filteredRaces != null) {
      races = this.state.filteredRaces
    }
    races = this.orderByDate(races)
    let  markers = races.map(item => { return { lat:item.latitude, lng: item.longitude }});
    return (<div>
      <Place resetSearch={this.resetSearch} resetLocation={this.resetLocation} getCordinates={this.getCordinates} locationValueDefault={this.state.locationValueDefault}/>
      <ButtonsContainer selectSeason={this.selectSeason} selectedDate={this.state.selectedDate} searchRaces={this.searchRaces} filteredRaces={this.state.filteredRaces} filterDate={this.filterDate} filterType={this.filterType} filterDistance={this.filterDistance} resetDate={this.resetDate} startDate={this.state.startDate}/>
      <DisplayRaces markers={ markers} races={races}/>
    </div>);
  }
}






const ButtonsContainer = (props) => {

  const selectSeason = (e) => {
    props.selectSeason(e)
    let boxes = document.querySelectorAll(".season-check")
    boxes.forEach((b) => {
      if (b.value != e.target.value) {b.checked = false}
    })
  }
  return (<div className=" filter-row row px-4">
    <div className="col-lg-3 col-md-6 col-sm-6  d-flex flex-column col-searchbar ">
      <div className="">
        <p className="mb-1 search-filter-title">Distanza</p>
      </div>
      <div className="d-flex">
        <div className="">
          <CheckBox functionClick={props.searchRaces} name="race_distance" value="short" label="Da 0 a 21 Km"/>
          <CheckBox functionClick={props.searchRaces} name="race_distance" value="medium" label="Da 22 a 42,195 km"/>
        </div>
        <div className="">
          <CheckBox functionClick={props.searchRaces} name="race_distance" value="long" label="Da 42 a 100 Km"/>
          <CheckBox functionClick={props.searchRaces} name="race_distance" value="ultra" label="Oltre i 100 Km"/>
        </div>
      </div>

    </div>
    <div className="col-lg-2 col-md-6 col-sm-6  d-flex flex-column col-searchbar">
      <div className="">
        <p className="mb-1 search-filter-title">Tipo</p>
      </div>
      <div className="d-flex">
        <div className="">
          <CheckBox functionClick={props.searchRaces} name="typo" value="skyrace" label="Skyrace"/>
          <CheckBox functionClick={props.searchRaces} name="typo" value="vertical" label="Vertical"/>
        </div>
        <div className="">
          <CheckBox functionClick={props.searchRaces} name="typo" value="trail" label="Trail"/>
          <CheckBox functionClick={props.searchRaces} name="typo" value="race" label="Race"/>
        </div>
      </div>

    </div>
    <div className="col-lg-3 col-md-6 col-sm-6 col-md-4 pb-3 date-column">
      <div>
        <p className="mb-1 search-filter-title">Periodo</p>
      </div>
      <div className="d-flex">
        <div className="d-flex flex-column">
          <CheckBox functionClick={selectSeason} classval="season-check" name="season" value="summer" data-value = "1" label="Estate"/>
          <CheckBox functionClick={selectSeason} classval="season-check" name="season" value="spring" data-value = "2"  label="Primavera"/>
        </div>
        <div className="d-flex flex-column">
          <CheckBox functionClick={selectSeason} classval="season-check" name="season" value="autumn" data-value = "3"  label="Autunno"/>
          <CheckBox functionClick={selectSeason} classval="season-check" name="season" value="winter" data-value = "4" label="Inverno"/>
        </div>
      </div>
    </div>

    <div className="col-lg-4 col-md-6 col-sm-6 col-md-4 pb-3 date-column">
      <div>
        <p className="mb-1 search-filter-title">Data</p>
      </div>
      <div className="d-flex">
        <Flatpickr onChange={props.filterDate} options={{
            mode: "range",
            enableTime: false,
            altInput: true,
            altFormat: "F j, Y",
            dateFormat: "Y-m-d"
          }} className="form-control" value={props.selectedDate}/>
        <button onClick={props.resetDate} id="loc-search" className="btn medium-btn ml-3" type="button" name="button">Resetta Data</button>
      </div>
    </div>
  </div>)
}

class Place extends React.Component {
  constructor(props) {
    super(props);
    this.changeLocation = this.changeLocation.bind(this)
    this.resetLocation = this.resetLocation.bind(this)
    this.resetSearch = this.resetSearch.bind(this)
    this.setValue = this.setValue.bind(this)
    this.state = {
      value: ""
    };
}


    setValue(e){
      let value = e.target.value
      this.setState(() => {
        return {value: value}
      })
    }

    changeLocation(e){
      e.preventDefault()
      let place = e.target.elements[0].value
      this.props.getCordinates(e)
      this.setState(() => {
        return {value: place}
      })
    }

    resetSearch(){
      this.props.resetSearch()
    }

    resetLocation(){
      this.setState(() => {
        return {value: ""}
      })
     this.props.resetLocation()
   }

    render() {
      return (<div>
        <h5>Cerca per luogo</h5>
        <div className="d-flex mb-2">
          <form className="w-75 d-flex" onSubmit={this.changeLocation}>
            <input onChange={this.setValue} value={this.state.value} type="search" id="address-input" placeholder="inserisci una località" />
            <button className="btn medium-btn ml-3" type="submit"><i className="fas fa-search"></i></button>
          </form>
          <button className="btn medium-btn ml-3" onClick={this.resetLocation}>Cancella località</button>
          <button className="reset-btn btn medium-btn ml-3" onClick={this.resetSearch}>Resetta tutti i filtri</button>

        </div>
      </div>)
    }
  }

const Stars = (props) =>{
  const n = parseInt(props.rating.toString().split(".")[0])
  const h = (parseInt(props.rating.toString().split(".")[1]) > 5)
  console.log(h);
  let full_stars = [...Array(n)].map((e, i) =><i key={i} className="fas fa-star"></i>)
  return (
    <div className="mb-2 small-stars-box" id="race-rating">
      {full_stars}
      { h ? <i className="fas fa-star"></i> : <i class="<%= type %> fas fa-star-half"></i> }
    </div>
  )
}



const CheckBox = (props) => {
  let name = `${props.name}[]`
  let id = `${props.name}_`
  return (<div className='checkbox'>
    <input className={props.classval} onChange={props.functionClick} data-type={props.name} type="checkbox" name={name} id={id} value={props.value}/>
    <p>{props.label}</p>
  </div>)
}

const RaceCard = (props) => {
  const formatDate = (date) => {
  var monthNames = [
    "Gennaio", "Febbraio", "Marzo",
    "Aprile", "Maggio", "Giugno", "Luglio",
    "Agosto", "Settembre", "Ottobre",
    "Novembre", "Dicembre"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

  let background_image  = ""
  if (props.race.photo_list[0] != null ){
      background_image = `url('${props.race.photo_list[0]}')`
  } else {
    if (props.race.typo == "skyrace" || props.race.typo == "trail"){
      background_image = `url('/assets/roadbackground.jpg')`
    } else {
      background_image = `url('/assets/trailbackground.jpg')`
    }
  }

  let divStyle = {
    backgroundImage: background_image
   };

return(
  <div className="col-md-6 col-sm-6">
    <a className="link-index-card" target="_blank" href={'/races/' + props.race.id}>
    <div className="card-wrapper-race">
      <div className="pb-1 race-card-index" data-value={props.race.id}>
        <div style ={divStyle} className="image-card-background" data-value={props.race.id}>
        </div>
        <div className="d-flex flex-column " data-value="<%= race.id  %>">
          <p className="mt-1 mb-0" data-value={props.race.id}>{props.race.name.substring(0,48)}</p>
          <div className="d-flex justify-content-between" data-value={props.race.id}>
            <p className="mb-0 race-info-card" data-value={props.race.id}>{formatDate(new Date(props.race.next_edition))}</p>
            <p>{props.race.typo} | {props.race.race_distance}Km</p>
          </div>
          <div className="d-flex justify-content-between" data-value={props.race.id}>
            <p className="mb-0 race-info-card " data-value={props.race.id}>
              <i className="mr-2 fas fa-map-marked-alt" data-value={props.race.id}></i>
                {props.race.location}
            </p>
              <Stars rating={props.race.rating}/>
          </div>
        </div>
      </div>
    </div>
  </a>
  </div>

)

}

const DisplayRaces = (props) => {
  return(
    <div className="row">
      <div className="col-md-7">
        <div id="races-list" className="row pt-4 pl-3">
            {props.races.map(e => <RaceCard key={e.id} race={e}/>)}
        </div>
      </div>
      <div className="col-md-5">
        <div className="map-container">
          <MapWithAMakredInfoWindow
            races={props.races}
            markers={props.markers}
            loadingElement={<div  style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100vh`, position: `sticky` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
      </div>
    </div>
  )
}



let races = new Object()
fetch("/api/v1/races").then(response => response.json()).then((data) => {
  ReactDOM.render(<IndexPage races={data}/>, document.querySelector("#index-page-search"))
  var places = require('places.js');
  var placesAutocomplete = places({container: document.querySelector('#address-input')});

});
