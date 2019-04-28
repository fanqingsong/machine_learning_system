import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getIris, setIrisCluster } from "../../actions/iris";
import axios from 'axios'

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

  startTrain(){
    console.log("======")

    // axios.get("/api/train").then((resp)=>{
    //   console.log("data=", resp.data);
    // })

    axios.post("/api/train").then((resp)=>{
      console.log("data=", resp.data);

      this.props.setIrisCluster(resp.data);
    })
  }

  render() {

    return (
      <Fragment>
        <button onClick={this.startTrain.bind(this)}>start train</button>

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
