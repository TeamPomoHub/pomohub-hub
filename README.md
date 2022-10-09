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

0. Users
    -id                         Primary
    -username
1. Session
    -id
    -Start Date                 Primary
    -Session ID  
2. session cycles
    -id                         Primary
    -duration of the cycle
    -session_ref
    -cycle_ref
3. Cycle
    -id                         Primary
    -Start time
4. Cycle Tasks
    -id                         Primary
    -cycle_ref
    -task_ref
5. Tasks
    -id                         Primary
    -text
    -status
    -Tasks ID                   