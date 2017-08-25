import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { css } from 'glamor';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import draftColumns from './columns';

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
        const mappedPlayers = players.map(player => camelcaseKeys(player, { deep: true }))
        debugger;
        this.setState({ players: mappedPlayers })
      });
  }

  changeFilter = (filterType, e) => {
    const newHide = Object.assign({}, this.state.hide, { [filterType]: !e.target.checked })
    this.setState({
      hide: newHide
    })
  }

  updatePlayers = (id, key, value) => {
    const { players } = this.state;
    const playerIndex = players.findIndex(p => p.id === id)
    let player = players[playerIndex];
    player[key] = value;

    this.setState({ players: [ ...players.slice(0,playerIndex), player, ...players.slice(playerIndex + 1)]})


  }

  render() {
    const { players } = this.state;

    const myTeam = players.filter(player => player.owned);
    debugger

    return (
      <div { ...styles.container }>
        <h2>The Draft Kit</h2>
        <div style={{display: 'inline-block', verticalAlign: 'top', width: '20%' }} >
          <div>
            <h4>My Team</h4>
            <p>
              My Team: &nbsp;
              { myTeam.reduce((a,b) => a + Math.round(b.projectedPoints / 16 * 100) / 100, 0)}
            </p>
            { !myTeam.length ? <p>No one drafted</p> : null }
            { myTeam.filter(player => player.position == "qb" ).map(player => <p>{player.position.toUpperCase() + ": " + titleize(player.name) + ` (${Math.round(player.projectedPoints /  16 * 100) / 100})`}</p> ) }
            { myTeam.filter(player => player.position == "rb" ).map(player => <p>{player.position.toUpperCase() + ": " + titleize(player.name) + ` (${Math.round(player.projectedPoints / 16 *100) /100 })`}</p> ) }
            { myTeam.filter(player => player.position == "wr" ).map(player => <p>{player.position.toUpperCase() + ": " + titleize(player.name) + ` (${Math.round(player.projectedPoints / 16 *100)/100})`}</p> ) }
            { myTeam.filter(player => player.position == "te" ).map(player => <p>{player.position.toUpperCase() + ": " + titleize(player.name) + ` (${Math.round(player.projectedPoints / 16 *100)/100})`}</p> ) }
            { myTeam.filter(player => player.position == "d/st" ).map(player => <p>{player.position.toUpperCase() + ": " + titleize(player.name) + ` (${Math.round(player.projectedPoints / 16 * 100 )/ 100})`}</p> ) }
            { myTeam.filter(player => player.position == "k" ).map(player => <p>{player.position.toUpperCase() + ": " + titleize(player.name) + ` (${Math.round(player.projectedPoints / 16 *100)/100})`}</p> ) }
          </div>
        </div>
        <div style={{display: 'inline-block', marginLeft: 20, verticalAlign: 'top', width: '28%' }} >
          <div>
            <div style={{display:'inline-block', marginRight: 20}}>
              <h4>Targets Team</h4>
              <p>Total: 119.5 </p>
              <p>QB: 18.2</p>
              <p>RB: 30.2 </p>
              <p>WR: 30.4 </p>
            </div>
            <div style={{display:'inline-block', marginRight: 20}}>
              <p>FLEX: 12.1</p>
              <p>TE: 11.3</p>
              <p>DEF: 9.2</p>
            </div>
            <div style={{display:'inline-block'}}>
            <p>K: 8.1</p>
            </div>
          </div>
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

