import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SearchBar from "material-ui-search-bar";
import _ from "lodash";

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
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px",
    borderRadius: "2px"
  },
  grid: {
    padding: "5px"
  },
  titleSpan: {
    fontSize: "14px",
    fontWeight: "bold"
  },
  img: {
    width: 174,
    height: 250
  },
  eye: {
    color: "#ccc"
  },
  eps: {
    fontSize: "10px",
    fontWeight: 200,
    fontStyle: "italic"
  }
};

class Dramas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.searchBarOnChange = this.searchBarOnChange.bind(this);
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
  searchBarOnChange(value) {
    if (value === "") {
      this.setState({
        shown_list: this.state.drama_list
      });
    } else {
      this.setState({
        shown_list: _.filter(this.state.drama_list, function(o) {
          return _.includes(o.name, value);
        })
      });
    }
  }
  render() {
    console.log(this.props);
    let nodes = null;
    if (this.state.shown_list) {
      nodes = this.state.shown_list.map(map => {
        return (
          <div style={styles.gridList}>
            <img src={map.vertical_poster} alt="174X250" style={styles.img} />
            <div style={styles.grid}>
              <span style={styles.titleSpan}>{map.name}</span>
              <div>
                <span style={styles.eps}>全{map.total_eps}集</span>
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
          style={{
            margin: "20px auto 30px auto",
            maxWidth: 800
          }}
        />
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
