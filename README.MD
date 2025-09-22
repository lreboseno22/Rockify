# Rockify 
### A Rock Music Database Application

Allows managing **users, playlists, artists, albums and songs**.
All routes return JSON.

## Users
| Method | Endpoint         | Description               |
|--------|------------------|---------------------------|
| GET    | `/api/users`     | Get all users             |
| GET    | `/api/users/:id` | Get a user by ID          |
| POST   | `/api/users`     | Create a new user         |
| PUT    | `/api/users/:id` | Update a user by ID       |
| DELETE | `/api/users/:id` | Delete user by ID         |

## Artists
| Method | Endpoint             | Description          |
|--------|----------------------|----------------------|
| GET    | `/api/artists`       | Get all artists      |
| GET    | `/api/artists/:id`   | Get artist by ID     |
| POST   | `/api/artists`       | Create new artist    |
| PUT    | `/api/artists/:id`   | Update artist by ID  |
| DELETE | `/api/artists/:id`   | Delete artist by ID  |

## Songs
| Method | Endpoint           | Description          |
|--------|--------------------|----------------------|
| GET    | `/api/songs`       | Get all songs        |
| GET    | `/api/songs/:id`   | Get song by ID       |
| POST   | `/api/songs`       | Create new song      |
| PUT    | `/api/songs/:id`   | Update song by ID    |
| DELETE | `/api/songs/:id`   | Delete song by ID    |

## Albums
| Method | Endpoint            | Description          |
|--------|---------------------|----------------------|
| GET    | `/api/albums`       | Get all albums       |
| GET    | `/api/albums/:id`   | Get album by ID      |
| POST   | `/api/albums`       | Create new album     |
| PUT    | `/api/albums/:id`   | Update album by ID   |
| DELETE | `/api/albums/:id`   | Delete album by ID   |

## Playlists
| Method | Endpoint              | Description                                |
|--------|-----------------------|--------------------------------------------|
| GET    | `/api/playlists`      | Get all playlists                          |
| GET    | `/api/playlists/:id`  | Get a playlist by ID                       |
| POST   | `/api/playlists`      | Create a new playlist                      |
| PATCH  | `/api/playlists/:id`  | Update playlist (rename / add/remove songs)|
| DELETE | `/api/playlists/:id`  | Delete a playlist                          |


# TEST DATA for API

## Songs:

## Playlists:

## User:

## Artists:

## Albums: