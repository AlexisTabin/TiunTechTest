import {gql} from '@apollo/client'

// write a GraphQL query that asks for names and codes for all countries
export const LIST_COUNTRIES = gql`
    query {
        countries {
            name
            code
        }
    }
`;

export const COUNTRY = gql`
    query($countryCode: ID!) {
        country(code: $countryCode) {
          code
          capital
          currency
          name
          languages {
            code
            name
            native
          }
        }
    }
`