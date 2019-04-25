import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getIris } from "../../actions/iris";

import C3Chart from 'react-c3js';
import 'c3/c3.css';

import { Histogram, WrappedComponent, withParentSize, PatternLines, DensitySeries, BarSeries, XAxis, YAxis } from '@data-ui/histogram';

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
    
    const ResponsiveHistogram = withParentSize(({ parentWidth, parentHeight, ...rest}) => (
      <Histogram
        width={parentWidth}
        height={parentHeight}
        {...rest}
      />
    ));

    const rawData11 = Array(100).fill().map(Math.random);

    return (
      <Fragment>
        <h2>Iris Sepal Length</h2>
        <div style={{height:"500px"}}>
        <ResponsiveHistogram
            orientation="vertical"
            cumulative={false}
            normalized={false}
            binCount={20}
            valueAccessor={datum => datum}
            binType="numeric"
            renderTooltip={({ event, datum, data, color }) => (
              <div>
                <strong style={{ color }}>{datum.bin0} to {datum.bin1}</strong>
                <div><strong>count </strong>{datum.count}</div>
                <div><strong>cumulative </strong>{datum.cumulative}</div>
                <div><strong>density </strong>{datum.density}</div>
              </div>
            )}
          >
            <BarSeries
              rawData={this.irisSeries.sepalLenSeries /* or binnedData={...} */}
            />
            <DensitySeries
              rawData={this.irisSeries.sepalLenSeries /* or binnedData={...} */}
            />
            <XAxis />
            <YAxis />
          </ResponsiveHistogram>
        </div>

        <h2>Iris Sepal Width</h2>
        <div style={{height:"500px"}}>
        <ResponsiveHistogram
            orientation="vertical"
            cumulative={false}
            normalized={false}
            binCount={20}
            valueAccessor={datum => datum}
            binType="numeric"
            renderTooltip={({ event, datum, data, color }) => (
              <div>
                <strong style={{ color }}>{datum.bin0} to {datum.bin1}</strong>
                <div><strong>count </strong>{datum.count}</div>
                <div><strong>cumulative </strong>{datum.cumulative}</div>
                <div><strong>density </strong>{datum.density}</div>
              </div>
            )}
          >
            <BarSeries
              rawData={this.irisSeries.sepalWidthSeries /* or binnedData={...} */}
            />
            <DensitySeries
              rawData={this.irisSeries.sepalWidthSeries /* or binnedData={...} */}
            />
            <XAxis />
            <YAxis />
          </ResponsiveHistogram>
        </div>

        <h2>Iris Petal Length</h2>
        <div style={{height:"500px"}}>
        <ResponsiveHistogram
            orientation="vertical"
            cumulative={false}
            normalized={false}
            binCount={20}
            valueAccessor={datum => datum}
            binType="numeric"
            renderTooltip={({ event, datum, data, color }) => (
              <div>
                <strong style={{ color }}>{datum.bin0} to {datum.bin1}</strong>
                <div><strong>count </strong>{datum.count}</div>
                <div><strong>cumulative </strong>{datum.cumulative}</div>
                <div><strong>density </strong>{datum.density}</div>
              </div>
            )}
          >
            <BarSeries
              rawData={this.irisSeries.petalLenSeries /* or binnedData={...} */}
            />
            <DensitySeries
              rawData={this.irisSeries.petalLenSeries /* or binnedData={...} */}
            />
            <XAxis />
            <YAxis />
          </ResponsiveHistogram>
        </div>


        <h2>Iris Petal Width</h2>
        <div style={{height:"500px"}}>
        <ResponsiveHistogram
            orientation="vertical"
            cumulative={false}
            normalized={false}
            binCount={20}
            valueAccessor={datum => datum}
            binType="numeric"
            renderTooltip={({ event, datum, data, color }) => (
              <div>
                <strong style={{ color }}>{datum.bin0} to {datum.bin1}</strong>
                <div><strong>count </strong>{datum.count}</div>
                <div><strong>cumulative </strong>{datum.cumulative}</div>
                <div><strong>density </strong>{datum.density}</div>
              </div>
            )}
          >
            <BarSeries
              rawData={this.irisSeries.petalWidthSeries /* or binnedData={...} */}
            />
            <DensitySeries
              rawData={this.irisSeries.petalWidthSeries /* or binnedData={...} */}
            />
            <XAxis />
            <YAxis />
          </ResponsiveHistogram>
        </div>

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
