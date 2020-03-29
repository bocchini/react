import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../services/api';

import Container from '../../components/container';
import { Loading, Owner, IssueList, Buttons } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    repoName: '',
    issues: [],
    loading: true,
    buttonAll: true,
    buttonOpen: false,
    buttonClosed: false,
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'all',
          per_page: 5,
          page: 1,
        },
      }),
    ]);

    this.setState({
      repoName,
      repository: repository.data,
      issues: issues.data,
      loading: false,
      buttonAll: true,
      buttonOpen: false,
      buttonClosed: false,
    });
  }

  async getDataRepository() {
    const { repoName, buttonAll, buttonClosed, page } = this.state;

    let typeRepo = '';
    if (buttonAll) typeRepo = 'all';
    else if (buttonClosed) typeRepo = 'closed';
    else typeRepo = 'open';

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: `${typeRepo}`,
        per_page: 5,
        page,
      },
    });
    console.log(issues);
    this.setState({
      issues: issues.data,
    });
  }

  handleClickAll = async e => {
    e.preventDefault();

    this.setState({
      buttonAll: true,
      buttonOpen: false,
      buttonClosed: false,
      page: 1,
    });

    this.getDataRepository();
  };

  handleClickOpen = async e => {
    e.preventDefault();

    this.setState({
      buttonAll: false,
      buttonOpen: true,
      buttonClosed: false,
      page: 1,
    });

    this.getDataRepository();
  };

  handleClickClose = async e => {
    e.preventDefault();

    this.setState({
      buttonAll: false,
      buttonOpen: false,
      buttonClosed: true,
      page: 1,
    });

    this.getDataRepository();
  };

  nextPage = () => {
    const { page } = this.state;
    const pageNumber = page + 1;
    this.setState({ page: pageNumber });
    this.getDataRepository();
  };

  prevPage = () => {
    const { page } = this.state;
    if (page === 1) return;
    const pageNumber = page - 1;
    this.setState({ page: pageNumber });
    this.getDataRepository();
  };

  render() {
    const {
      repository,
      issues,
      loading,
      buttonAll,
      buttonOpen,
      buttonClosed,
      page,
    } = this.state;

    if (loading) {
      return <Loading>Loading...</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Return to repositories</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <Buttons>
          <button onClick={this.handleClickAll} disabled={buttonAll}>
            All
          </button>
          <button onClick={this.handleClickOpen} disabled={buttonOpen}>
            Open
          </button>
          <button onClick={this.handleClickClose} disabled={buttonClosed}>
            Closed
          </button>
        </Buttons>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        <Buttons>
          <button disabled={page < 2} onClick={this.prevPage}>
            Prev
          </button>
          <button onClick={this.nextPage}>Next</button>
        </Buttons>
      </Container>
    );
  }
}
