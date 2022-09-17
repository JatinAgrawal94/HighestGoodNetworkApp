import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../../Teams/Team.css';
import 'react-datepicker/dist/react-datepicker.css';
import { TasksDetail } from '../TasksDetail';
import { getTasksTableData } from './selectors';
import './TasksTable.css';
import DropDownSearchBox from 'components/UserManagement/DropDownSearchBox';
import { Checkbox } from 'components/common/Checkbox';
import TextSearchBox from 'components/UserManagement/TextSearchBox';

export const TasksTable = ({ WbsTasksID }) => {

  const {
    priority,
    status,
    classification,
    users,
    classificationList,
    priorityList,
    statusList,
    userList,
    get_tasks
  } = useSelector(state => getTasksTableData(state, { WbsTasksID }));

  const [isActive, setActive] = useState(true);
  const [isAssigned, setAssigned] = useState(true);
  const [filters, setFilters] = useState({});

  const resetAllFilters = () => {
    setActive();
    setAssigned();
    setFilters({
      priority: '',
      status: '',
      classification: '',
      users: '',
    })
  }

  const setOneFilter = (filterName, value) => {
    if (value === 'Filter Off') {
      setFilters({ ...filters, [filterName]: value, [`${filterName}List`]: [] })
    } else {
      setFilters({ ...filters, [filterName]: value, [`${filterName}List`]: filters[`${filterName}List`].concat(value) })
    }
  }

  const FilterOptions = ({ filterName, width }) => {
    var filtersOptions = [
      ...Array.from(new Set(get_tasks.map((item) => item[filterName]))).sort(),
    ];
    return (
      <DropDownSearchBox
        items={filtersOptions}
        searchCallback={(value) => setOneFilter(filterName, value)}
        placeholder={`Any ${filterName}`}
        className='tasks-table-filter-item tasks-table-filter-input'
        width={width}
      />
    );
  };

  const UserOptions = () => {
    let users = [];
    get_tasks.map((task) =>
      task.resources.map((resource) => users.push(resource.name)),
    );

    users = Array.from(new Set(users)).sort();
    return (
      <DropDownSearchBox
        items={users}
        placeholder={`Any user`}
        searchCallback={(value) => setOneFilter('users', value)}
        className='tasks-table-filter-item tasks-table-filter-input'
      />
    );
  };

  return (
    <div>
      <div className='tasks-table-filters-wrapper'>
        <div className='tasks-table-filters'>
          <UserOptions get_tasks={get_tasks} />
          <FilterOptions filterName={'classification'} width='180px' />
          <FilterOptions filterName={'priority'} />
          <FilterOptions filterName={'status'} />

          <TextSearchBox
            placeholder='Estimated hours'
            className='tasks-table-filter-item tasks-table-filter-input'
            searchCallback={() => { }}
          />

          <Checkbox value={isActive} onChange={() => setActive(!isActive)} id='active' wrapperClassname='tasks-table-filter-item' label='Active' />
          <Checkbox value={isAssigned} onChange={() => setAssigned(!isAssigned)} id='assign' wrapperClassname='tasks-table-filter-item' label='Assign' />

        </div>

        <button
          exact
          className="tasks-table-clear-filter-button"
          onClick={() => resetAllFilters()}
        >
          Clear filters
        </button>
      </div>

      <TasksDetail
        tasks_filter={get_tasks}
        isAssigned={isAssigned}
        isActive={isActive}
        priority={priority}
        status={status}
        classification={classification}
        users={users}
        classificationList={classificationList}
        priorityList={priorityList}
        statusList={statusList}
        userList={userList}
      />
    </div>
  );
}
