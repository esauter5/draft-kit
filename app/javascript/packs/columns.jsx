import React from 'react';
import titleize from 'titleize';

const columns = [
  {
    Header: 'Player',
    columns: [
      {
        Header: 'Owned',
        id: 'owned',
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
      },

      {
        Header: 'Drafted',
        id: 'drafted',
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
    ],
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
        accessor: 'seasonStats[0].passingCompletions',
      },

      {
        Header: 'PassAtts',
        accessor: 'seasonStats[0].passingAttempts',
      },
      {
        Header: 'PassYards',
        accessor: 'seasonStats[0].passingYards',
      },
      {
        Header: 'PassTds',
        accessor: 'seasonStats[0].passingTds',
      },
      {
        Header: 'Ints',
        accessor: 'seasonStats[0].passingInts',
        filterAll: true,
      },
      {
        Header: 'RushAtts',
        accessor: 'seasonStats[0].rushingAttempts',
      },
      {
        Header: 'RushYards',
        accessor: 'seasonStats[0].rushingYards',
      },
      {
        Header: 'RushTds',
        accessor: 'seasonStats[0].rushingTds',
      },
      {
        Header: 'Targets',
        accessor: 'seasonStats[0].targets',
      },
      {
        Header: 'Recs',
        accessor: 'seasonStats[0].receptions',
      },
      {
        Header: 'RecYards',
        accessor: 'seasonStats[0].receivingYards',
      },
      {
        Header: 'RecTds',
        accessor: 'seasonStats[0].receivingTds',
      },
    ],
  },

  {
    Header: '2017 Projections',
    columns: [
      {
        Header: 'PassComp',
        accessor: 'seasonProjections[0].passingCompletions',
      },

      {
        Header: 'PassAtt',
        accessor: 'seasonProjections[0].passingAttempts',
      },
      {
        Header: 'PassYards',
        accessor: 'seasonProjections[0].passingYards',
      },
      {
        Header: 'PassTds',
        accessor: 'seasonProjections[0].passingTds',
      },
      {
        Header: 'Ints',
        accessor: 'seasonProjections[0].passingInts',
        filterAll: true,
      },
      {
        Header: 'RushAtts',
        accessor: 'seasonProjections[0].rushingAttempts',
      },
      {
        Header: 'RushYards',
        accessor: 'seasonProjections[0].rushingYards',
      },
      {
        Header: 'RushTds',
        accessor: 'seasonProjections[0].rushingTds',
      },
      {
        Header: 'Recs',
        accessor: 'seasonProjections[0].receptions',
      },
      {
        Header: 'RecYards',
        accessor: 'seasonProjections[0].receivingYards',
      },
      {
        Header: 'RecTds',
        accessor: 'seasonProjections[0].receivingTds',
      },
    ],
  },
];

export default columns;
