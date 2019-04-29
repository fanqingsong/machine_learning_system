import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getIris, setIrisCluster } from "../../actions/iris";
import axios from 'axios'

import C3Chart from 'react-c3js';
import 'c3/c3.css';


export class IrisExplore extends Component {
  static propTypes = {
    iris: PropTypes.array.isRequired,
    getIris: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      cluster_number: 3
    }
  }

  componentDidMount() {
    this.props.getIris();
  };

  startTrain(){
    console.log("======")

    // axios.get("/api/train").then((resp)=>{
    //   console.log("data=", resp.data);
    // })

    this.props.setIrisCluster([]);

    let cluster_number = this.state.cluster_number;

    axios.post("/api/train", {cluster_number: cluster_number}).then((resp)=>{
      console.log("data=", resp.data);
      let irisData = JSON.parse(resp.data);
      this.props.setIrisCluster(irisData);
    })
  }

  handleChange(e) {
    this.setState({cluster_number: e.target.value});
  }

  getSepalScatterData(cluster_number){
    console.log("cluster_number=", cluster_number);

    let irisCluster = this.props.irisCluster;

    let data = {
      columns: [
        // ["setosa1", 0.2, 0.2],
        // ["setosa_x", 3.5, 3.0],
      ],
      xs: {
        // setosa1: 'setosa_x',
      },
      names: {

      },
      type: 'scatter'
    };

    for(let i=0; i<cluster_number; i++){
      let irisClusterFilter = irisCluster.filter((oneIris) => {
        if (i === oneIris.cluster) {
          console.log("filter OK! oneIris.cluster=", oneIris.cluster);
          return true;
        }
      });
  
      let sepalLen = "sepalLen"+i;
      let sepalWidth = "sepalWidth"+i;
      let sepalLenSeries = irisClusterFilter.map((oneIris)=>{
        return oneIris.sepal_len;
      });
      let sepalWidthSeries = irisClusterFilter.map((oneIris)=>{
        return oneIris.sepal_width;
      });

      let sepalLenTrain = [sepalLen, ...sepalLenSeries];
      let sepalWidthTrain = [sepalWidth, ...sepalWidthSeries];

      data.columns.push(sepalLenTrain);
      data.columns.push(sepalWidthTrain);

      data.names[sepalLen] = "cluster"+i;
      data.xs[sepalLen] = sepalWidth;
    }

    console.log(data);
    return data;
  }

  getSepalScatterAxis(){
    return {
        x: {
            label: 'Sepal.Length',
            tick: {
                fit: false
            }
        },
        y: {
            label: 'Sepal.Width'
        }
    };
  }

  getPetalScatterData(cluster_number){
    console.log("cluster_number=", cluster_number);

    let irisCluster = this.props.irisCluster;

    let data = {
      columns: [
        // ["setosa1", 0.2, 0.2],
        // ["setosa_x", 3.5, 3.0],
      ],
      xs: {
        // setosa1: 'setosa_x',
      },
      names: {

      },
      type: 'scatter'
    };

    for(let i=0; i<cluster_number; i++){
      let irisClusterFilter = irisCluster.filter((oneIris) => {
        if (i === oneIris.cluster) {
          console.log("filter OK! oneIris.cluster=", oneIris.cluster);
          return true;
        }
      });
  
      let petalLen = "petalLen"+i;
      let petalWidth = "petalWidth"+i;
      let petalLenSeries = irisClusterFilter.map((oneIris)=>{
        return oneIris.petal_len;
      });
      let petalWidthSeries = irisClusterFilter.map((oneIris)=>{
        return oneIris.petal_width;
      });

      let petalLenTrain = [petalLen, ...petalLenSeries];
      let petalWidthTrain = [petalWidth, ...petalWidthSeries];

      data.columns.push(petalLenTrain);
      data.columns.push(petalWidthTrain);

      data.names[petalLen] = "cluster"+i;
      data.xs[petalLen] = petalWidth;
    }

    console.log(data);
    return data;
  }

  getPetalScatterAxis(){
    return {
        x: {
            label: 'Petal.Length',
            tick: {
                fit: false
            }
        },
        y: {
            label: 'Petal.Width'
        }
    };
  }

  onSubmit = e => {
    e.preventDefault();
  }

  render() {
    let cluster_number = this.state.cluster_number;

    let sepalData = this.getSepalScatterData(cluster_number);
    let sepalAxis = this.getSepalScatterAxis();

    let petalData = this.getPetalScatterData(cluster_number);
    let petalAxis = this.getPetalScatterAxis();

    return (
      <Fragment>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="form-group">
            <label>cluster number</label>
            <input
              className="form-control"
              type="text"
              name="cluster_number"
              onChange={this.handleChange.bind(this)}
              value={cluster_number}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary" onClick={this.startTrain.bind(this)}>start train</button>
          </div>
        </form>

        <h2>Iris Sepal Scatter cluster</h2>
        <C3Chart data={sepalData} axis={sepalAxis} />

        <h2>Iris Petal Scatter cluster</h2>
        <C3Chart data={petalData} axis={petalAxis} />

        <h2>Iris Cluster Result</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>sepal_len</th>
              <th>sepal_width</th>
              <th>petal_len</th>
              <th>petal_width</th>
              <th>cluster</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.irisCluster.map(oneIris => (
              <tr>
                <td>{oneIris.sepal_len}</td>
                <td>{oneIris.sepal_width}</td>
                <td>{oneIris.petal_len}</td>
                <td>{oneIris.petal_width}</td>
                <td>{oneIris.cluster}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  iris: state.iris.iris,
  irisCluster: state.iris.irisCluster,
});

export default connect(
  mapStateToProps,
  { getIris, setIrisCluster }
)(IrisExplore);
