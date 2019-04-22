import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addOneIris } from "../../actions/iris";

export class Form extends Component {
  state = {
    sepal_len: "",
    sepal_width: "",
    petal_len: "",
    petal_width: "",
    category: ""
  };

  static propTypes = {
    addOneIris: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { sepal_len, sepal_width, petal_len, petal_width, category } = this.state;
    const iris = { sepal_len, sepal_width, petal_len, petal_width, category };
    this.props.addOneIris(iris);
    this.setState({
      sepal_len: "",
      sepal_width: "",
      petal_len: "",
      petal_width: "",
      category: ""
    });
  };

  render() {
    const { sepal_len, sepal_width, petal_len, petal_width, category } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add One Iris</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>sepal_len</label>
            <input
              className="form-control"
              type="text"
              name="sepal_len"
              onChange={this.onChange}
              value={sepal_len}
            />
          </div>
          <div className="form-group">
            <label>sepal_width</label>
            <input
              className="form-control"
              type="text"
              name="sepal_width"
              onChange={this.onChange}
              value={sepal_width}
            />
          </div>
          <div className="form-group">
            <label>petal_len</label>
            <input
              className="form-control"
              type="text"
              name="petal_len"
              onChange={this.onChange}
              value={petal_len}
            />
          </div>
          <div className="form-group">
            <label>petal_width</label>
            <input
              className="form-control"
              type="text"
              name="petal_width"
              onChange={this.onChange}
              value={petal_width}
            />
          </div>
          <div className="form-group">
            <label>category</label>
            <textarea
              className="form-control"
              type="text"
              name="category"
              onChange={this.onChange}
              value={category}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { addOneIris }
)(Form);
