import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

function Results({ data: { repository: { pullRequests, commitComments, stargazers, forks } }}) {
	  return (
	    <ul>
	      <li>{pullRequests.totalCount}</li>
	      <li>{commitComments.totalCount}</li>
	      <li>{stargazers.totalCount}</li>
	      <li>{forks.totalCount}</li>
	    </ul>
	  );
	}

export default graphql(gql`{
  repository(owner: "sitararamesh", name: "PIC40A") {
    pullRequests {
      totalCount
    }
    commitComments {
      totalCount
    }
    stargazers {
      totalCount
    }
    forks {
      totalCount
    }
  }
})(Results)