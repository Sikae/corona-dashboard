import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, useLocation, Redirect, useHistory} from 'react-router-dom';

import { Cards, Chart, CountryPicker, Favorites, LineChart } from './components';
import { Typography } from '@material-ui/core';
import styles from './App.module.css';
import { fetchData } from './api';
import 'antd/dist/antd.css';

const Home = ({ data, country, handleCountryChange }) => {
//     <div className={styles.container}>
//     <Cards data={data}/>
//     <CountryPicker handleCountryChange={this.handleCountryChange}/>
//     
// </div>
// <h1>HEY {match.params.country}</h1>
let location = useLocation()

  useEffect(
    () => {
      console.log("New country:", location.pathname.substring(11));
      handleCountryChange(location.pathname.substring(11));
    },
    [location]
  )

  const history = useHistory();
 // return history.push('/countries/USA')
    let handleCountryPicked = (countryPicked) => {
        history.push('/countries/'+countryPicked)
    }

return (
    <div className={styles.container}>
    <Typography variant="h2" gutterBottom> COVID-19 State</Typography>
    <Typography variant="h4" gutterBottom> Global</Typography>
    <LineChart data={data} country={country}></LineChart>
    <Cards data={data}/>
    <CountryPicker handleCountryChange={handleCountryPicked}/>
    <Chart data={data} country={country}/>
    </div>
)

}

class App extends React.Component {
    state = {
        data: {},
        country: '',
    }

    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({data: fetchedData});
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        this.setState({ data: fetchedData, country: country });
        // const history = useHistory();
        // return history.push('/countries/USA')
    }

    render() {
        const { data, country } = this.state;
        return (
            <Router>
                <Route exact path={'/'} render={() => (<Redirect to='/countries/Ecuador' />)}/>
                <Route path={`/countries/:country`} render= {({match}) => <Home data={data} country={match.params.country} 
                handleCountryChange={this.handleCountryChange}/>}/>
                <Route exact path={'/favorites'} component={Favorites} />
            </Router>
        )
    }
}

export default App
