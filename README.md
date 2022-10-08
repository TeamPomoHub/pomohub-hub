# pomohub-hub

Repo for the API and Stats website of PomoHub

This application depends on a PostGreSQL database hosted with Railway.

Install netlify package via: npm install netlify-cli -g

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
    -ID                         Primary
    -username
1. Session
    -ID
    -Start Date                 Primary
    -Session ID  
2. session cycles
    -duration of the cycle
    -reference to Session ID
    -reference to Cycle ID
3. Cycle
    -ID                         Primary
    -Start time
    -Cycle ID
4. Cycle Tasks
    -reference to Cycle ID
    -reference to Task ID
5. Tasks
    -ID                         Primary
    -text
    -status
    -Tasks ID                   