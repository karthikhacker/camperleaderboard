import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
    state = {
        top100Campers : [],
        top100CampersAllTime : [],
        tab : true
    }

    getCampers = () => {
        return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent').then((response) => {
            this.setState({top100Campers : response.data});
            //console.log(this.state.top100Campers);
        })
    }

   getCampersAllTime = () => {
        return  axios.get("https://fcctop100.herokuapp.com/api/fccusers/top/alltime").then((resp) => {
         this.setState({top100CampersAllTime : resp.data});
           console.log(this.state.top100CampersAllTime);
        })
   }


    componentDidMount(){
        this.getCampers();
        this.getCampersAllTime();
    }

  render() {
      const {  top100Campers, top100CampersAllTime } =  this.state;

      const renderCamper = top100Campers.map((camper,index) => {
            return  <tr key={index}>
                              <td>{index + 1}</td>
                              <td><img src={camper.img} alt={camper.username} className="circle responsive-img" />
                              </td>
                              <td>{camper.username}</td>
                              <td>{camper.recent}</td>
                              <td>{camper.alltime}</td>
                          </tr>
      })

      const renderAlltime = top100CampersAllTime.map((allTime,i) => {
           return <tr key={i}>
                           <td>{i + 1}</td>
                           <td><img  src={allTime.img} alt={allTime.username} className="circle responsive-img"/></td>
                           <td>{allTime.username}</td>
                           <td>{allTime.recent}</td>
                           <td>{allTime.alltime}</td>
                       </tr>
      })

    return (
      <div className="row">
          <nav>
           <div className="nav-wrapper">
             <a  className="brand-logo">Camper leaderboard</a>
          </div>
         </nav>
         <table>
             <thead>
                 <tr>
                     <th>#</th>
                     <th>Image</th>
                     <th>Camper name</th>
                     <th><a className="btn  orange"  onClick={() => this.setState({tab  : true})}>Points in 30 days</a></th>
                     <th><a className="btn " onClick={() => this.setState({ tab : false})}>All time points</a></th>
                 </tr>
             </thead>
             <tbody>
                {this.state.tab === true ?  renderCamper : renderAlltime }

             </tbody>
         </table>
      </div>
    );
  }
}

export default App;
