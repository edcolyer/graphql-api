# GraphQL Experimentation

Just playing around and learning GraphQL for APIs.

## Some Notes

#### Querying in development

I was using [GraphQL Playground](https://github.com/prisma/graphql-playground) for querying the GraphQL server initially, **however** `express-graphql` includes a [Graphiql](https://github.com/graphql/graphiql) editor when you set `graphiql: true`. You just need to visit `localhost:4000/graphql` to view this.

#### When passing arguments in code

It is best to pass arguments using `$` syntax with `JSON.stringify` like the example [here](https://graphql.org/graphql-js/passing-arguments/). The GraphQL implementation will escape this so we don't have to worry about escaping on the client side.

#### Return what you mutate

When the API mutates an object, it is certainly best practice to return the result of what has been mutated so that the client can learn about what it has modified. A side effect of this is that it also makes integration testing a ***lot*** easier.

#### Input types

Commonly creating and updating take the same parameters. In this situation we can use the `input` keyword as per [here](https://graphql.org/graphql-js/mutations-and-input-types/) to create "input types".

#### The ID type

The GraphQL `ID` type represents a **unique** ID for an object. It is parsed as a **string**. E.g. in the case of an ID 127, it would be parsed as "127". This is discussed in [this Stack Overflow post](https://stackoverflow.com/questions/39471075/when-to-use-graphqlid-instead-of-graphqlint).

#### Layers of functionality

Separate entry points (e.g. GraphQL) from auth, business logic, and persistence (obviously). [See here](https://graphql.org/learn/thinking-in-graphs/#business-logic-layer) for a great illustration.

#### Pagination

Whilst GraphQL doesn't explicitly specify how pagination should be done, there are some common practices. For a great design pattern, go [here](https://graphql.org/learn/pagination/).

## Less Related Notes

#### Destructuring function parameters

I really like this syntax for destructuring parameters from objects in functions that take an object as the sole argument:
```js
  function fooBar({ foo, bar }) {
    console.log('Foo:', foo);
    console.log('Bar:', bar);
  }
```
