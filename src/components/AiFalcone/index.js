import {Component} from 'react'

import './index.css'

const VehicleRadioGroups = props => {
  const {eachVehicle, selectingVehicle, radioGroupName} = props
  const {name, totalNo} = eachVehicle
  const onSelectingVehicle = event => {
    if (radioGroupName === '') selectingVehicle(name)
  }
  const disabledStatus = totalNo <= 0
  console.log(disabledStatus)
  return (
    <div className="">
      <input
        onChange={onSelectingVehicle}
        type="radio"
        name={radioGroupName}
        value={name}
        disabled={disabledStatus}
        id={`${radioGroupName} ${eachVehicle.name}`}
      />
      <label htmlFor={`${radioGroupName} ${eachVehicle.name}`}>
        {name}
        {` (${totalNo})`}
      </label>
    </div>
  )
}

class AIFalcon extends Component {
  state = {
    planetDetails: [],
    vehcileDetails: [],
    remainingVehicleDetails: [],
    Destination1: '',
    Destination2: '',
    Destination3: '',
    Destination4: '',
    radioOptionsGroup1: '',
    radioOptionsGroup2: '',
    radioOptionsGroup3: '',
    radioOptionsGroup4: '',
    radioGroup1: [],
    radioGroup2: [],
  }

  componentDidMount() {
    this.gettingPlanetDetails()
    this.gettingVehicleDetails()
  }

  gettingPlanetDetails = async () => {
    const url = 'https://findfalcone.herokuapp.com/planets'
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    this.setState({planetDetails: data})
  }

  gettingVehicleDetails = async () => {
    const url = 'https://findfalcone.herokuapp.com/vehicles'
    const response = await fetch(url)
    const data = await response.json()
    const formattedData = data.map(eachVehicle => ({
      name: eachVehicle.name,
      speed: eachVehicle.speed,
      maxDistance: eachVehicle.max_distance,
      totalNo: eachVehicle.total_no,
    }))
    console.log(formattedData)
    this.setState({
      vehcileDetails: formattedData,
      radioGroup1: formattedData,
      radioGroup2: formattedData,
      radioGroup3: formattedData,
    })
  }

  handlingSelectedDestination1 = event => {
    // console.log(event.target.value)
    this.setState({Destination1: event.target.value})
  }

  handlingSelectedDestination2 = event => {
    // console.log(event.target.value)
    this.setState({Destination2: event.target.value})
  }

  handlingSelectedDestination3 = event => {
    // console.log(event.target.value)
    this.setState({Destination3: event.target.value})
  }

  handlingSelectedDestination4 = event => {
    // console.log(event.target.value)
    this.setState({Destination4: event.target.value})
  }

  selectingVehicleGroup1 = event => {
    this.setState({radioOptionsGroup1: event.target.value})
  }

  render() {
    const {
      planetDetails,
      vehcileDetails,
      Destination1,
      Destination2,
      Destination3,
      Destination4,
      radioGroup1,
      radioGroup2,
      radioGroup3,
    } = this.state

    return (
      <div className="app-background">
        <div className="grouping-design">
          <select
            onChange={this.handlingSelectedDestination1}
            id="destination-1"
          >
            <option value="" disabled selected hidden>
              Select your option
            </option>
            {planetDetails.map(eachPlanet => {
              if (
                (!eachPlanet.name.includes(Destination2) ||
                  Destination2 === '') &&
                (!eachPlanet.name.includes(Destination3) ||
                  Destination3 === '') &&
                (!eachPlanet.name.includes(Destination4) || Destination4 === '')
              ) {
                return (
                  <option key={eachPlanet.name} value={eachPlanet.name}>
                    {eachPlanet.name}
                  </option>
                )
              }
              return null
            })}
          </select>
          {Destination1 !== ''
            ? radioGroup1.map(eachVehicle => (
                <VehicleRadioGroups
                  key={`$destination1${eachVehicle.name}`}
                  eachVehicle={eachVehicle}
                  selectingVehicle={this.selectingVehicleGroup1}
                  radioGroupName="Destination1Vehicles"
                />
              ))
            : ''}
        </div>
        <div className="grouping-design">
          <select
            onChange={this.handlingSelectedDestination2}
            id="destination-2"
          >
            <option value="" disabled selected hidden>
              Select your option
            </option>
            {planetDetails.map(eachPlanet => {
              if (
                (!eachPlanet.name.includes(Destination1) ||
                  Destination1 === '') &&
                (!eachPlanet.name.includes(Destination3) ||
                  Destination3 === '') &&
                (!eachPlanet.name.includes(Destination4) || Destination4 === '')
              ) {
                return (
                  <option key={eachPlanet.name} value={eachPlanet.name}>
                    {eachPlanet.name}
                  </option>
                )
              }
              return null
            })}
          </select>
          {Destination2 !== ''
            ? radioGroup2.map(eachVehicle => (
                <VehicleRadioGroups
                  key={`$destination2${eachVehicle.name}`}
                  eachVehicle={eachVehicle}
                  selectingVehicle={this.selectingVehicleGroup2}
                  radioGroupName="Destination2Vehicles"
                />
              ))
            : ''}
        </div>
      </div>
    )
  }
}

export default AIFalcon
