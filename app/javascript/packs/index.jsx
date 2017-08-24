import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { css } from 'glamor';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import draftColumns from './columns';

import camelcaseKeys from 'camelcase-keys';

const displayAttr = (attr) => {
  let result = attr[0].toUpperCase();

  return attr.slice(1).split('').reduce((res, c) => {
    if (c === c.toUpperCase()) {
      res = res + ' ' + c;
    } else {
      res = res + c;
    }

    return res;
  }, result);
};

const flattenArr = (arr) => (
  arr.reduce((res, element) => (
    res.concat(Array.isArray(element) ? flattenArr(element) : element)
  ), [])
);

const mapObject = (obj, filterCb) => {
  return Object
      .keys(obj)
      .filter(filterCb)
      .map(key => ({
        id: key,
        Header: displayAttr(key),
        accessor: key,
      }));
};

const getColumnsFromObject = (obj, sections = []) => {
  let columns = [];

  const playerInfoColumns = mapObject(obj, (key) => (
    key !== 'id' && key !== 'playerId' && !sections.includes(key)
  ));

  const sectionColumns = sections.map((key) => {
    let childColumns = mapObject(obj[key][0], (key) => (
      key !== 'id' && key !== 'playerId'
    ));

    return ({
      Header: displayAttr(key),
      columns: childColumns.map((col) => {
        col.accessor = `${key}[0].${col.id}`;
        return col;
      })
    });
  });

  return [
    {
      Header: 'Player Info',
      columns: playerInfoColumns,
    },
    ...sectionColumns,
  ];

  //return flattenArr(columns.concat(newChildren,
  //})));
};

class DraftBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: []
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

