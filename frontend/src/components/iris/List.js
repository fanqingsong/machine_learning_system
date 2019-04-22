import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getIris, deleteOneIris, setEditedIris } from "../../actions/iris";

export class Iris extends Component {
  static propTypes = {
    iris: PropTypes.array.isRequired,
    getIris: PropTypes.func.isRequired,
    setEditedIris: PropTypes.func.isRequired,
    deleteOneIris: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getIris();
  };

  render() {
    return (
      <Fragment>
        <h2>Iris</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>sepal_len</th>
              <th>sepal_width</th>
              <th>petal_len</th>
              <th>petal_width</th>
              <th>category</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.iris.map(oneIris => (
              <tr key={oneIris.id}>
                <td>{oneIris.id}</td>
                <td>{oneIris.sepal_len}</td>
                <td>{oneIris.sepal_width}</td>
                <td>{oneIris.petal_len}</td>
                <td>{oneIris.petal_width}</td>
                <td>{oneIris.category}</td>
                <td>
                <button
                    onClick={this.props.setEditedIris.bind(this, oneIris)}
                    className="btn btn-warning btn-sm"
                  >
                    {" "}
                    Edit
                  </button>
                  &nbsp;&nbsp;&nbsp;
                  <button
                    onClick={this.props.deleteOneIris.bind(this, oneIris.id)}
                    className="btn btn-danger btn-sm"
                  >
                    {" "}
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  iris: state.iris.iris
});

export default connect(
  mapStateToProps,
  { getIris, deleteOneIris, setEditedIris }
)(Iris);
