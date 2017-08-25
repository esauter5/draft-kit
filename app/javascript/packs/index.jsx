import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { css } from 'glamor';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import draftColumns from './columns';

import camelcaseKeys from 'camelcase-keys';

class DraftBoard extends Component {
  componentDidMount() {
    fetch('/stats.json')
      .then(response => response.json() )
      .then(players => {
        const mappedPlayers = players.map(player => camelcaseKeys(player, { deep: true }))
        this.setState({ players: mappedPlayers })
      });
  }

  render() {
    const { players } = this.state;

    return (
      <div { ...styles.container }>
        <h2>Draft Board</h2>

        <ReactTable
          className="-striped -highlight"
          data={ players }
          columns={ draftColumns }
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

