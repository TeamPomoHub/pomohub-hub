# pomohub-hub

Repo for the API and Stats website of PomoHub

This application depends on a PostGreSQL database hosted with Railway.

To run the dev files locally, run `netlify dev`.
# pomohub-hub
Repo for the API and Stats website of PomoHub

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
    -ID (computer)              Primary
    -Username                   Unique
1. Session
    -ID (Session)               Primary
    -Start Date                 Not NULL
    -Reference to username   
2. session cycles
    -duration of the cycle
    -reference to cycles
    -reference to sessions
3. Cycle
    -ID (cycle)
    -Start time
    -reference to 
4. Cycle Tasks
    -reference to cycles
    -reference to tasks
5. Tasks
    -text
    -status