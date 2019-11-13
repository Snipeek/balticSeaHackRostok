#!/usr/bin/env bash
get-graphql-schema http://nrboo-nrboo-14p3ah927dpbz-1071006850.eu-central-1.elb.amazonaws.com/graphql > server-graphql.schema.graphql
apollo-codegen introspect-schema server-graphql.schema.graphql --output server-schema.json
apollo-codegen introspect-schema client-graphql.schema.graphql --output client-schema.json
node ./mergeSchemas.js
