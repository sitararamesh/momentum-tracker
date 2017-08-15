// React
import React from 'react';

// GraphQL
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const GetRepositoryInfoQuery = gql`
  query GetRepositoryIssues($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
      	pullRequests {
      		totalCount
      	},
      	commitComments {
      		totalCount
      	},
      	forks {
      		totalCount
      	},
        stargazers {
          totalCount
        }
      }
    }
`;

const withInfo = graphql(GetRepositoryInfoQuery, {
  options: ({ owner, name }) => {
    return {
      variables: {
        owner: 'manifoldco',
        name: 'torus-cli'
      }
    }
  },
  props: ({ data }) => {
    // loading state
    if (data.loading) {
      return { loading: true };
    }

    // error state
    if (data.error) {
      console.error(data.error);
    }

    // OK state
    return { data };
  },
});

// Repository
class Repository extends React.Component {
  constructor(props) {
    super(props);

    // states
    this.state = {
      owner: props.owner,
      name: props.name,
      pullRequests: 0,
      forks: 0,
      commitComments: 0,
      stargazers: 0
    };
  }

  componentWillReceiveProps(newProps) {
    // DRY
    const repo = newProps.data.repository;

    // states
    this.setState({
      owner: this.props.owner,
      name: this.props.name,
      stargazers: repo.stargazers.totalCount,
      pullRequests: repo.pullRequests.totalCount, 
      forks: repo.forks.totalCount,
      commitComments: repo.commitComments.totalCount
    });
  }

  render() {
    return (<div>
      <h2>{this.state.owner}/{this.state.name}</h2>
      <ul>
        <li>stargazers: {this.state.stargazers.toLocaleString()}</li>
        <li>forks: {this.state.forks.toLocaleString()}</li>
        <li>commitComments: {this.state.commitComments.toLocaleString()}</li>
        <li>pullRequests: {this.state.pullRequests.toLocaleString()}</li>
      </ul>
    </div>)
  }
}

const RepositoryWithInfo = withInfo(Repository);
export default RepositoryWithInfo;