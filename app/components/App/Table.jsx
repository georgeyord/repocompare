import React from 'react'
import { observer, PropTypes } from 'mobx-react'
import RemoveAllBtn from './RemoveAllBtn'
import RepoWrapper from './RepoWrapper'
import { table, first } from './Table.css'

const Table = observer(({ repos, removeRepo, removeAllRepos }) =>
(
  <div className="table-responsive">
    <table className={`table table-hover ${table}`}>
      <thead>
        <tr>
          <th className={first}>Repo</th>
          <th>Stars</th>
          <th>Forks</th>
          <th>Watchers</th>
          <th>Open issues</th>
          <th>File size</th>
          <th><RemoveAllBtn repos={repos} removeAllRepos={removeAllRepos} /></th>
        </tr>
      </thead>
      <tbody>
        {
          repos.length > 0 ?
            repos.map((repo) =>
              <RepoWrapper key={repo.id} repo={repo} removeRepo={removeRepo} />)
          :
            <tr>
              <th scope="row" colSpan="6">Add repos using the form above or select a category.</th>
            </tr>
        }
      </tbody>
    </table>
  </div>
))

Table.propTypes = {
  repos: PropTypes.observableArray,
  removeRepo: React.PropTypes.func.isRequired,
  removeAllRepos: React.PropTypes.func.isRequired
}

export default Table
