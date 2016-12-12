import React, { Component } from 'react';
import { PropTypes } from 'mobx-react';
import Repo from '../stores/Repo';
import App from '../components/app/App';
import { getRepo, getReposFromConfig } from '../utils/ReposHelper';

class AppContainer extends Component {
  constructor() {
    super();
    this.addRepo = this.addRepo.bind(this);
    this.addRepos = this.addRepos.bind(this);
    this.removeRepo = this.removeRepo.bind(this);
    this.removeAllRepos = this.removeAllRepos.bind(this);
  }

  addRepo(e) {
    e.preventDefault();

    const inputEl = e.target.querySelectorAll('#repo-name')[0];
    const inputValue = inputEl.value.trim();
    const repoToAddData = getRepo(inputValue);
    const existingRepos = this.props.repoStore.repos.filter((repo) => repo.repoNameFull === `${repoToAddData.username}/${repoToAddData.reponame}`);

    inputEl.value = '';

    if (existingRepos.length > 0) {
      existingRepos[0].hightlight();
    } else {
      const repoToAdd = new Repo(repoToAddData);
      this.props.repoStore.addRepo(repoToAdd);
    }
  }

  addRepos(e) {
    e.preventDefault();
    const repos = getReposFromConfig(e.target.dataset.repos);

    repos.forEach((repoData) => {
      const repoToAdd = new Repo(repoData);
      this.props.repoStore.addRepo(repoToAdd);
    });
  }

  removeRepo(e) {
    e.preventDefault();
    const repoId = e.currentTarget.dataset.repoId;

    this.props.repoStore.removeRepo(repoId);
  }

  removeAllRepos() {
    this.props.repoStore.removeAllRepos();
  }

  render() {
    return (
      <App
        repos={this.props.repoStore.repos}
        addRepo={this.addRepo}
        addRepos={this.addRepos}
        removeRepo={this.removeRepo}
        removeAllRepos={this.removeAllRepos}
      />
    );
  }
}

AppContainer.propTypes = {
  repoStore: PropTypes.observableObject
};

export default AppContainer;
