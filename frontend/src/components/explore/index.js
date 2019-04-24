import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getIris } from "../../actions/iris";

import C3Chart from 'react-c3js';
import 'c3/c3.css';


export class IrisExplore extends Component {
  static propTypes = {
    iris: PropTypes.array.isRequired,
    getIris: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getIris();
  };

  getIrisSeries(irisData){
    console.log(irisData)
    
    let sepalLenSeries = irisData.map((oneIris)=>oneIris.sepal_len);
    let sepalWidthSeries = irisData.map((oneIris)=>oneIris.sepal_width);
    let petalLenSeries = irisData.map((oneIris)=>oneIris.petal_len);
    let petalWidthSeries = irisData.map((oneIris)=>oneIris.petal_width);

    return {
      sepalLenSeries,
      sepalWidthSeries,
      petalLenSeries,
      petalWidthSeries
    }
  }

  setIrisSeries(irisData){
    this.irisSeries = this.getIrisSeries(irisData);
  }

  getSepalScatterData(){
    let irisSeries = this.irisSeries;

    let sepalLenSeries = irisSeries.sepalLenSeries;
    let sepalWidthSeries = irisSeries.sepalWidthSeries;

    let data = {
      x: 'sepalLen',
      columns: [
        ["sepalLen", ...sepalLenSeries],
        ["sepalWidth", ...sepalWidthSeries]
      ],
      type: 'scatter'
    };

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


  getPetalScatterData(){
    let irisSeries = this.irisSeries;

    let petalLenSeries = irisSeries.petalLenSeries;
    let petalWidthSeries = irisSeries.petalWidthSeries;

    let data = {
      x: 'petalLen',
      columns: [
        ["petalLen", ...petalLenSeries],
        ["petalWidth", ...petalWidthSeries]
      ],
      type: 'scatter'
    };

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

  render() {
    this.setIrisSeries(this.props.iris);
    
    let sepalData = this.getSepalScatterData();
    let sepalAxis = this.getSepalScatterAxis();

    let petalData = this.getPetalScatterData();
    let petalAxis = this.getPetalScatterAxis();

    return (
      <Fragment>
        <h2>Iris Sepal Scatter</h2>
        <C3Chart data={sepalData} axis={sepalAxis} />

        <h2>Iris Petal Scatter</h2>
        <C3Chart data={petalData} axis={petalAxis} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  iris: state.iris.iris
});

export default connect(
  mapStateToProps,
  { getIris }
)(IrisExplore);
