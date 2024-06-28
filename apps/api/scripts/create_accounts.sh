#!/bin/bash

# Set GraphQL endpoint
ENDPOINT="http://localhost:3001/graphql"

# Number of accounts to create
COUNT=2

for i in $(seq 1 $COUNT); do
    # Generate random email
    EMAIL="user$i@example.com"

    # Construct GraphQL query
    QUERY="mutation CreateAccount(\$email: String!) {
    createAccount(email: \$email) {
      id
    }
  }"

    # Curl request
    curl -X POST \
        -H "Content-Type: application/json" \
        --data "{\"query\": \"$QUERY\", \"variables\": {\"email\": \"$EMAIL\"}}" \
        $ENDPOINT

    # Add some sleep time to prevent rapid successive calls (optional)
    sleep 1
done

echo "Finished creating accounts."
