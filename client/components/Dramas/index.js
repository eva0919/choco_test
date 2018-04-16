import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SearchBar from "material-ui-search-bar";
import _ from "lodash";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";

import { getDramas } from "../../actions/dramas_actions";
import "./dramas.css";

const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    flexDirection: "row"
  },
  gridList: {
    width: 174,
    margin: "10px",
    backgroundColor: "white",
    boxShadow:
      "rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px",
    borderRadius: "2px"
  },
  grid: {
    padding: "5px"
  },
  timeButton: {
    margin: 10
  },
  titleSpan: {
    fontSize: "14px",
    fontWeight: "bold"
  },
  img: {
    width: 174,
    height: 250,
    cursor: "pointer"
  },
  eye: {
    color: "#ccc"
  },
  eps: {
    fontSize: "10px",
    fontWeight: 200,
    fontStyle: "italic"
  },
  filterBar: {
    margin: "10px auto 20px auto",
    maxWidth: 800
  }
};

class Dramas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      drama_list: [],
      shown_list: [],
      show_drama: null,
      filterName: "",
      filterYear: 0
    };
  }
  componentDidMount() {
    this.props.actions.getDramas();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.drama_list && nextProps.drama_list.length > 0) {
      this.setState({
        drama_list: nextProps.drama_list,
        shown_list: nextProps.drama_list
      });
    }
  }
  timeButtonClick(value) {
    this.setState({
      filterYear: value
    });
  }
  searchBarOnChange = value => {
    // if (value === "") {
    //   this.setState({
    //     shown_list: this.state.drama_list
    //   });
    // } else {
    //   this.setState({
    //     shown_list: _.filter(this.state.drama_list, function(o) {
    //       return _.includes(o.name, value);
    //     })
    //   });
    // }
    this.setState({
      filterName: value
    });
  };

  render() {
    console.log(this.props);
    let nodes = null;
    if (this.state.drama_list) {
      console.log(this.state.drama_list);
      const drama_list = this.state.drama_list;
      const filterName = this.state.filterName;
      const filterYear = this.state.filterYear;
      const show_list = _.filter(drama_list, function(o) {
        return (
          (filterName === "" || _.includes(o.name, filterName)) &&
          (filterYear === 0 || o.year === filterYear)
        );
      });
      nodes = show_list.map((map, index) => {
        return (
          <div style={styles.gridList}>
            <img src={map.vertical_poster} alt="174X250" style={styles.img} />
            <div style={styles.grid}>
              <span style={styles.titleSpan}>{map.name}</span>
              <div>
                <span style={styles.eps}>
                  {map.year}, 全{map.total_eps}集
                </span>
              </div>
              <div style={{ lineHeight: "24px" }}>
                <i class="fas fa-eye" style={styles.eye} />
                <span style={styles.eye}>{map.total_views}</span>
              </div>
            </div>
          </div>
        );
      });
    }
    return (
      <div>
        <SearchBar
          onChange={this.searchBarOnChange}
          onRequestSearch={() => console.log("onRequestSearch")}
          style={styles.filterBar}
        />
        <div style={styles.filterBar}>
          <span>時間:</span>
          <RaisedButton
            label="全部"
            style={styles.timeButton}
            secondary={this.state.filterYear === 0}
            onClick={this.timeButtonClick.bind(this, 0)}
          />
          <RaisedButton
            label="2018"
            style={styles.timeButton}
            secondary={this.state.filterYear === 2018}
            onClick={this.timeButtonClick.bind(this, 2018)}
          />
          <RaisedButton
            label="2017"
            style={styles.timeButton}
            secondary={this.state.filterYear === 2017}
            onClick={this.timeButtonClick.bind(this, 2017)}
          />
        </div>
        <div style={styles.root}>{nodes}</div>
      </div>
    );
  }
}

Dramas.propTypes = {};

Dramas.defaultProps = {
  drama_list: []
};

function mapStateToProps(state) {
  return { drama_list: state.dramas.drama_list };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ getDramas }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dramas);
