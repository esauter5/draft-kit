import React from 'react';
import titleize from 'titleize';

import {
  draft,
  undraft,
  own,
  disown,
} from './api';

const defaultSortMethod= (a,b) => {
  // force null and undefined to the bottom
  a = (a === null || a === undefined || a === "") ? Infinity : a;
  b = (b === null || b === undefined || b === "") ? Infinity : b;
  // force any string values to lowercase
  a = a === 'string' ? a.toLowerCase() : a;
  b = b === 'string' ? b.toLowerCase() : b;
  // Return either 1 or -1 to indicate a sort priority
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  // returning 0, undefined or any falsey value will use subsequent sorts or the index as a tiebreaker
  return 0;
}

const columns = ({ shouldHide = false, onUpdate }) => [
  {
    Header: 'Player',
    columns: [
      {
        Header: 'Owned',
        id: 'owned',
        minWidth: 50,
        accessor: 'owned',
        filterMethod: (filter, row) => {
          const value = filter.value === 'true';

          return filter.value === 'all' || value === row[filter.id];
        },
        Filter: ({ filter, onChange }) => (
          <select
            onChange={ e => onChange(e.target.value) }
            style={ { width: '100%' } }
            value={ filter ? filter.value : 'all' }
          >
            <option value="all">All</option>
            <option value={ true }>Owned</option>
            <option value={ false }>Not Owned</option>
          </select>
        ),
        Cell: ({ value, original: { id = '' } = {} }) => (
          <p
            onClick={ () => {
              value ? disown(id) : own(id);
              onUpdate();
            } }
            style={
              {
                color: value ? 'red' : 'green',
                cursor: 'pointer',
                margin: 0,
                textAlign: 'center',
                width: '100%',
              }
            }
          >
            { value ? 'Disown' : 'Own' }
          </p>
        ),
      },

      {
        Header: 'Drafted',
        id: 'drafted',
        minWidth: 50,
        accessor: 'drafted',
        filterMethod: (filter, row) => {
          const value = filter.value === 'true';

          return filter.value === 'all' || value === row[filter.id];
        },
        Filter: ({ filter, onChange }) => (
          <select
            onChange={ e => onChange(e.target.value) }
            style={ { width: '100%' } }
            value={ filter ? filter.value : 'all' }
          >
            <option value="all">All</option>
            <option value={ true }>Drafted</option>
            <option value={ false }>Undrafted</option>
          </select>
        ),
        Cell: ({ value, original: { id = '' } = {} }) => (
          <p
            onClick={ () => {
              value ? undraft(id) : draft(id);
              onUpdate();
            } }
            style={
              {
                color: value ? 'red' : '#3db0df',
                cursor: 'pointer',
                margin: 0,
                textAlign: 'center',
                width: '100%',
              }
            }
          >
            { value ? 'Undraft' : 'Draft' }
          </p>
        ),
      },

      {
        Header: 'Name',
        id: 'name',
        minWidth: 150,
        accessor: ({ name }) => titleize(name),
        filterMethod: (filter, row) => (
          row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
        ),
      },

      {
        Header: 'Pos',
        id: 'position',
        minWidth: 50,
        accessor: ({ position }) => position.toUpperCase(),
        filterMethod: (filter, row) => {
          console.log(filter, row);
          if (filter.value === 'all') {
            return true;
          } else if (filter.value === 'Flex') {
            return filter.value === row[filter.id] || ['WR', 'RB', 'TE'].includes(row[filter.id]);
          } else {
            return filter.value === row[filter.id];
          }
        },
        Filter: ({ filter, onChange }) => (
          <select
            onChange={ e => onChange(e.target.value) }
            style={ { width: '100%' } }
            value={ filter ? filter.value : 'all' }
          >
            <option value="all"> Show All</option>
            <option value="QB">QB</option>
            <option value="RB">RB</option>
            <option value="WR">WR</option>
            <option value="TE">TE</option>
            <option value="K">K</option>
            <option value="Flex">Flex</option>
          </select>
        ),
      },

      {
        Header: 'Team',
        id: 'team',
        minWidth: 50,
        accessor: ({ team }) => team.toUpperCase(),
        filterMethod: (filter, row) => (
          row[filter.id]
            .split(' ')
            .some((word) => (
              word.toLowerCase().startsWith(filter.value.toLowerCase())
            ))
        ),
      },

      {
        Header: 'Bye',
        accessor: 'seasonProjections[0].byeWeek',
        minWidth: 50,
      }
    ],
  },

  {
    Header: 'Rankings',
    columns: [
      {
        Header: 'Rank',
        accessor: 'rankings[0].ranking',
        sortMethod: defaultSortMethod,
        defaultSortDesc: false,
        minWidth: 50
      },
      {
        Header: 'Rank',
        accessor: 'rankings[0].positionRanking',
        sortMethod: defaultSortMethod,
        defaultSortDesc: false,
        minWidth: 50
      },
      {
        Header: 'ADP',
        accessor: 'rankings[0].averageDraftPosition',
        sortMethod: defaultSortMethod,
        defaultSortDesc: false,
        minWidth: 50
      },
      {
        Header: 'Diff',
        id: 'diff',
        accessor:  d => d.rankings[0] ? d.rankings[0].averageDraftPosition - d.rankings[0].ranking : 0,
        sortMethod: defaultSortMethod,
        defaultSortDesc: false,
        minWidth: 50
      },
    ]
  },

  {
    Header: 'Points',
    columns: [
      {
        Header: '2016',
        accessor: 'lastSeasonPoints'
      },
      {
        Header: 'Projected',
        accessor: 'projectedPoints'
      }
    ]
  },

  {
    Header: '2016 Stats',
    columns: [
      {
        Header: 'PassComps',
        show: !shouldHide.season,
        accessor: 'seasonStats[0].passingCompletions',
      },

      {
        Header: 'PassAtts',
        show: !shouldHide.season,
        accessor: 'seasonStats[0].passingAttempts',
      },
      {
        Header: 'PassYards',
        show: !shouldHide.season,
        accessor: 'seasonStats[0].passingYards',
      },
      {
        Header: 'PassTds',
        show: !shouldHide.season,
        accessor: 'seasonStats[0].passingTds',
      },
      {
        Header: 'Ints',
        show: !shouldHide.season,
        accessor: 'seasonStats[0].passingInts',
        filterAll: true,
      },
      {
        Header: 'RushAtts',
        show: !shouldHide.season,
        accessor: 'seasonStats[0].rushingAttempts',
      },
      {
        Header: 'RushYards',
        show: !shouldHide.season,
        accessor: 'seasonStats[0].rushingYards',
      },
      {
        Header: 'RushTds',
        show: !shouldHide.season,
        accessor: 'seasonStats[0].rushingTds',
      },
      {
        Header: 'Targets',
        show: !shouldHide.season,
        accessor: 'seasonStats[0].targets',
      },
      {
        Header: 'Recs',
        show: !shouldHide.season,
        accessor: 'seasonStats[0].receptions',
      },
      {
        Header: 'RecYards',
        show: !shouldHide.season,
        accessor: 'seasonStats[0].receivingYards',
      },
      {
        Header: 'RecTds',
        show: !shouldHide.season,
        accessor: 'seasonStats[0].receivingTds',
      },
    ],
  },

  {
    Header: '2017 Projections',
    columns: [
      {
        Header: 'PassComp',
        show: !shouldHide.projected,
        accessor: 'seasonProjections[0].passingCompletions',
      },

      {
        Header: 'PassAtt',
        show: !shouldHide.projected,
        accessor: 'seasonProjections[0].passingAttempts',
      },
      {
        Header: 'PassYards',
        show: !shouldHide.projected,
        accessor: 'seasonProjections[0].passingYards',
      },
      {
        Header: 'PassTds',
        show: !shouldHide.projected,
        accessor: 'seasonProjections[0].passingTds',
      },
      {
        Header: 'Ints',
        accessor: 'seasonProjections[0].passingInts',
        show: !shouldHide.projected,
        filterAll: true,
      },
      {
        Header: 'RushAtts',
        show: !shouldHide.projected,
        accessor: 'seasonProjections[0].rushingAttempts',
      },
      {
        Header: 'RushYards',
        show: !shouldHide.projected,
        accessor: 'seasonProjections[0].rushingYards',
      },
      {
        Header: 'RushTds',
        show: !shouldHide.projected,
        accessor: 'seasonProjections[0].rushingTds',
      },
      {
        Header: 'Recs',
        show: !shouldHide.projected,
        accessor: 'seasonProjections[0].receptions',
      },
      {
        Header: 'RecYards',
        show: !shouldHide.projected,
        accessor: 'seasonProjections[0].receivingYards',
      },
      {
        Header: 'RecTds',
        show: !shouldHide.projected,
        accessor: 'seasonProjections[0].receivingTds',
      },
    ],
  },
  {
    Header: 'Notes',
    columns: [
      {
        Header: 'Outlook',
        accessor: 'seasonProjections[0].outlook',
        className: 'outlook',
        minWidth: 250,
        maxWidth: 400,
      },
    ]
  },
];

export default columns;
