import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactTable from 'react-table';

import teamColumns from './columns';

class TeamTable extends Component {
  render() {
    const { myTeam } = this.props;

    const myPlayers = myTeam.map((player) => Object.assign({ teamId: 1 }, player));

    return (
      <ReactTable
        className="-striped -highlight"
        columns={ teamColumns() }
        data={ myPlayers }
        defaultPageSize={ 1 }
        pivotBy={ ['teamId', 'playerPosition'] }
        showPaginationBottom={ false }
        style={ {
          maxWidth: '600px',
          marginBottom: '24px',
        } }
      />
    );
  }
}

TeamTable.propTypes = {
  myTeam: PropTypes.array,
};

TeamTable.defaultProps = {
  myTeam: [],
};

export default TeamTable;
