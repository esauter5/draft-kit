import React from 'react';
import titleize from 'titleize';

const sum = (arr) => arr.reduce((res, val) => res + val, 0);

const targetValues = {
  rb: 30.2,
  qb: 18.2,
  wr: 30.4,
  flex: 12.1,
  te: 11.3,
  def: 9.2,
  k: 8.1,
  ovr: 119.5,
};

// TODO: Pass in from League Rules
const positionNumbers = {
  qb: 1,
  rb: 2,
  wr: 3,
  flex: 1,
  te: 1,
  def: 1,
  k: 1,
};

const columns = () => [
  {
    Header: 'Pos',
    id: 'playerPosition',
    accessor: ({ position }) => position.toUpperCase(),
    defaultSortDesc: false,
  },

  {
    Header: 'Name',
    id: 'playerName',
    accessor: ({ name }) => titleize(name),
  },

  {
    Header: 'Proj. Value',
    id: 'projectedValue',
    accessor: ({ projectedPoints }) => Math.round(projectedPoints / 16 * 100) / 100,
    aggregate: vals => sum(vals),
    Aggregated: (row) => {
      return (
        <span>
          { row.value }
        </span>
      );
    },
  },

  {
    Header: 'Target Value',
    id: 'targetValue',
    accessor: ({ position }) => targetValues[position] / positionNumbers[position],
    aggregate: vals => vals,
    Aggregated: ({ row: { playerPosition = '' } = {} }) => {
      return (
        <span>
          { targetValues[playerPosition.toLowerCase()] || targetValues.ovr }
        </span>
      );
    },
  },
];

export default columns;
