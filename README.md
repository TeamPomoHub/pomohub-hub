# pomohub-hub

Repo for the API and Stats website of PomoHub

This application depends on a PostGreSQL database hosted with Railway, and runs an API using Netlify.

To install netlify, run `npm install netlify-cli -g`

To run the dev files locally, run `netlify dev`.

## Database Structure Notes

Tables
way to store
    users
    time
    sessions
        cycles
            tasks

Needed:
    ID
    Username

Sessions:
    start date
    nested cycles
        nested tasks
            tasks have properties
                text
                status

Username is needed to distinguish sessions

Another table to link one to many relationships
    cycles -> tasks
        tasks->properties

1. Users
    -ID (computer)              Primary
    -Username                   Unique
2. Session
    -ID (Session)               Primary
    -Start Date                 Not NULL
    -Reference to username
3. session cycles
    -duration of the cycle
    -reference to cycles
    -reference to sessions
4. Cycle
    -ID (cycle)
    -Start time
    -reference to
5. Cycle Tasks
    -reference to cycles
    -reference to tasks
6. Tasks
    -text
    -status