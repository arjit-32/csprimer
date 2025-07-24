---
title: GraphQL - Flexible APIs for Modern Apps
meta_title: GraphQL APIs- Modern CS Guide | CS Primer
description: Explore GraphQL for flexible APIs. Learn query-based data fetching for modern web apps in CS.
author: Arjit Sharma
series: ["api"]
categories: ["System-Design"]
draft: false
year: 2025
---

Imagine building a food app *(Zomato)* where you need to display restaurants, their top-rated dishes, and customer ratings - all at once. In a REST API, you’d make multiple requests - 

- `GET /restaurants` - Get all restaurants
- `GET /restaurants/:id/` - Get restaurant info
- `GET /restaurants/:id/dishes` - Get all dishes in that restaurant
- `GET /restaurants/:id/ratings` - Get all reviews of that restaurant

As you can already see, it gets job done in a sloppy way(*multiple endpoints*, *overfetching* - gives more data than needed, *underfetching* - multiple round trips to get all data). This problem is solved by GraphQL.

---

## What is GraphQL ?

GraphQL is an **API query language**  and a **runtime for executing those queries** developed by Facebook. It allows client to ask for *exactly* the data needed *(nothing more, nothing less)*

Like REST it is also protocol independent ( though used with HTTP).

---

## GraphQL in Action

Lets say, as given in above example we just need restaurant names with cuisine type, top 3 dishes and average customer rating. With REST this would be 3 seperate requests, but in GraphQL you can ask all at once - 

```graphql
query {
  restaurant(id: 42) {
    name
    cuisine
    topDishes(limit: 3) {
      name
      price
    }
    rating {
      average
      totalReviews
    }
  }
}
```

The server may respond with something like - 

```json
{
  "data": {
    "restaurant": {
      "name": "Socials",
      "cuisine": "Multi-Cuisine",
      "topDishes": [
        { "name": "Chilli Garlic Momos", "price": 315 },
        { "name": "Oreo Shake", "price": 200 },
        { "name": "Loaded Nachos", "price": 280 }
      ],
      "rating": {
        "average": 4.6,
        "totalReviews": 1280
      }
    }
  }
}
```

---

## How GraphQL Works ?

- GraphQL client exposes a *Single Endpoint (typically `/graphql`)*
- GraphQL server exposes a **schema** (Defines type of data and their relationships)
- GraphQL server provides with **resolvers** (function that map each field in schema to actual data - from database, cache, another api etc).

### Two types of Operations

GraphQL supports two core operations →

- **Query** - for reading data, like our restaurant info above.
- **Mutation** - for modifying data.

Here’s how you might submit a new review using a mutation:

```graphql
mutation {
  addReview(restaurantId: 42, rating: 5, comment: "Amazing food!") {
    success
    reviewId
  }
}
```

---

## Conclusion

Using GraphQL in today’s world, specially for Zomato like apps, where we need limited data on a screen, makes sense. Instead of relying on server, client asks what it needs all from one endpoint.