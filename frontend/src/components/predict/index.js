import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getIris } from "../../actions/iris";
import axios from 'axios'

import C3Chart from 'react-c3js';
import 'c3/c3.css';


export class IrisPredict extends Component {
  static propTypes = {
    iris: PropTypes.array.isRequired,
    getIris: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      sepal_len: 5.1,
      sepal_width: 3.2,
      petal_len: 1.2,
      petal_width: 0.3
    }
  }

  componentDidMount() {
    this.props.getIris();
  };

  startPredict(){
    console.log("======")

    let {sepal_len, sepal_width, petal_len, petal_width, predicted_cluster} = this.state;

    let postData = {
      sepal_len,
      sepal_width,
      petal_len,
      petal_width
    }

    axios.post("/api/predict", postData).then((resp)=>{
      console.log("data=", resp.data);
      let irisData = JSON.parse(resp.data);
      
      this.setState({predicted_cluster: irisData.predicted_cluster});
    })
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit = e => {
    e.preventDefault();
  }

  render() {
    let {sepal_len, sepal_width, petal_len, petal_width, predicted_cluster} = this.state;

    return (
      <Fragment>
        <div className="card card-body mt-4 mb-4">
          <h2>Predict One Iris Cluster</h2>
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className="form-group">
              <label>sepal_len</label>
              <input
                className="form-control"
                type="text"
                name="sepal_len"
                onChange={this.handleChange.bind(this)}
                value={sepal_len}
              />
            </div>
            <div className="form-group">
              <label>sepal_width</label>
              <input
                className="form-control"
                type="text"
                name="sepal_width"
                onChange={this.handleChange.bind(this)}
                value={sepal_width}
              />
            </div>
            <div className="form-group">
              <label>petal_len</label>
              <input
                className="form-control"
                type="text"
                name="petal_len"
                onChange={this.handleChange.bind(this)}
                value={petal_len}
              />
            </div>
            <div className="form-group">
              <label>petal_width</label>
              <input
                className="form-control"
                type="text"
                name="petal_width"
                onChange={this.handleChange.bind(this)}
                value={petal_width}
              />
            </div>
            <div className="form-group">
              <label>predicted cluster</label>
              <input
                disabled="disabled"
                className="form-control"
                type="text"
                name="predicted_cluster"
                value={predicted_cluster}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary" onClick={this.startPredict.bind(this)}>
                Predict
              </button>
            </div>
          </form>
        </div>
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
)(IrisPredict);
