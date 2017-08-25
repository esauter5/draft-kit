import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { css } from 'glamor';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import draftColumns from './columns';

import camelcaseKeys from 'camelcase-keys';

class DraftBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
      hide: {
        season: true,
        projected: true
      }
    }
  }

  componentDidMount() {
    fetch('/stats.json')
      .then(response => response.json() )
      .then(players => {
        const mappedPlayers = players.map(player => camelcaseKeys(player, { deep: true }))
        this.setState({ players: mappedPlayers })
      });
  }

  changeFilter = (filterType, e) => {
    const newHide = Object.assign({}, this.state.hide, { [filterType]: !e.target.checked })
    this.setState({
      hide: newHide
    })
  }

  render() {
    const { players } = this.state;

    return (
      <div { ...styles.container }>
        <h2>The Draft Kit</h2>
        <div>
          <input
            type="checkbox"
            name="Season"
            onChange={ this.changeFilter.bind(this, 'season') }
          />
          <label>2016 Season</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="Projections"
            onChange={ this.changeFilter.bind(this, 'projected') }
          />
          <label>2017 Projections</label>
        </div>
        <ReactTable
          className="-striped -highlight"
          data={ players }
          columns={ draftColumns(this.state.hide) }
          defaultSortDesc={ true }
          filterable
          defaultFilterMethod={
            (filter, row) => String(row[filter.id]) === filter.value
          }
        />
      </div>
    );
  }
}

DraftBoard.propTypes = {
  players: PropTypes.array,
};

DraftBoard.defaultProps = {
  players: [],
};

const styles = {
  container: css({
  }),
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <DraftBoard />,
    document.body.appendChild(document.createElement('div')),
  )
})

