import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { css } from 'glamor';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import draftColumns from './columns';
import TeamTable from './team-table/';

import camelcaseKeys from 'camelcase-keys';
import titleize from 'titleize';

class DraftBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
      hide: {
        season: true,
        projected: true,
        consistency: true
      },
    }
  }

  componentDidMount() {
    this.fetchPlayers();
  }

  fetchPlayers = () => {
    fetch('/stats.json')
      .then(response => response.json() )
      .then(players => {
        const mappedPlayers = players.map((player) =>
          camelcaseKeys(player, { deep: true })
        );
        this.setState(() => ({ players: mappedPlayers }));
      });
  }

  changeFilter = (filterType, e) => {
    const newHide = Object.assign({}, this.state.hide, { [filterType]: !e.target.checked })
    this.setState(() => ({ hide: newHide }));
  }

  updatePlayers = (id, key, value) => {
    const { players } = this.state;
    const playerIndex = players.findIndex(p => p.id === id)
    let player = players[playerIndex];
    player[key] = value;

    this.setState(() => ({
      players: [
        ...players.slice(0,playerIndex),
        player,
        ...players.slice(playerIndex + 1)
      ]
    }));
  }

  render() {
    const { players } = this.state;

    const myTeam = players.filter(player => player.owned);

    return (
      <div { ...styles.container }>
        <div style={{display: 'inline-block', verticalAlign: 'top', width: '20%' }} >
          <h2>The Draft Kit</h2>
        </div>

        <div style={{display: 'inline-block', verticalAlign: 'top', width: '30%' }} >
          <div>
            <h4>Links</h4>
            <div><a href="http://g.espncdn.com/s/ffldraftkit/17/NFLDK2017_CS_PPR_DepthChart.pdf" target="_blank">Depth Charts</a></div>

            <div><a href="http://www.espn.com/fantasy/football/story/_/id/19706762/carson-wentz-joe-mixon-popular-sleepers-ben-roethlisberger-tyler-eifert-busts-2017-season-fantasy-football" target="_blank">Breakouts, Sleepers, Busts</a></div>
          </div>
        </div>

        <div style={ { display: 'inline-block', verticalAlign: 'bottom' } } >
          <div>
            <input
              type="checkbox"
              name="Season"
              checked={!this.state.hide.season}
              onChange={ this.changeFilter.bind(this, 'season') }
            />
            <label>Show 2016 Season</label>
          </div>

          <div>
            <input
              type="checkbox"
              name="Projections"
              checked={!this.state.hide.projected}
              onChange={ this.changeFilter.bind(this, 'projected') }
            />
            <label>Show 2017 Projections</label>
          </div>

          <div>
            <input
              type="checkbox"
              name="Consistency"
              checked={!this.state.hide.consistency}
              onChange={ this.changeFilter.bind(this, 'consistency') }
            />
            <label>Show Consistency Ratings</label>
          </div>
        </div>

        <div>
          <h4>My Team</h4>

          <TeamTable myTeam={ myTeam }/>
        </div>

        <ReactTable
          className="-striped -highlight"
          data={ players }
          columns={ draftColumns({ onUpdate: this.updatePlayers, shouldHide: this.state.hide }) }
          getTrProps={ (state,rowInfo,column) => {
            if (rowInfo) {
              if (rowInfo.original.owned) {
                return { style: { backgroundColor: '#00E676'}}
              }

              if (rowInfo.original.drafted) {
                return { style: { backgroundColor: '#EF5350'}}
              }

              if (rowInfo.original.keeper) {
                return { style: { backgroundColor: '#2196F3'}}
              }

              if (rowInfo.original.watch) {
                return { style: { backgroundColor: '#EA80FC'}}
              }
            }

            return {}
          }}
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

