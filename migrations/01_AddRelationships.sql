/* adding time to SessionCycle*/
ALTER TABLE SessionCycles ADD COLUMN duration TIME;

/* adding cycle ref to sessioncycles*/
ALTER TABLE SessionCycles ADD COLUMN cycle_ref SERIAL;
/* adding session ref to sessioncycles*/
ALTER TABLE SessionCycles ADD COLUMN session_ref SERIAL;

/* adding cycle ref to cycletasks*/
ALTER TABLE cycletasks ADD COLUMN cycle_ref SERIAL;
/* adding task ref to cycletasks*/
ALTER TABLE cycletasks ADD COLUMN task_ref SERIAL;

/* adding relationship between session and users */
ALTER TABLE session ADD COLUMN user_ref TEXT;

ALTER TABLE session 
    ADD CONSTRAINT Fk_users_session FOREIGN KEY (user_ref)
    REFERENCES "users" (username);

/* adding session ref to session SessionCycles*/
ALTER TABLE sessioncycles 
    ADD CONSTRAINT FK_sessioncycles_session FOREIGN KEY (session_ref)
    REFERENCES "session" (id);

/* adding cycle ref to cycle session SessionCycles*/
ALTER TABLE sessioncycles 
    ADD CONSTRAINT FK_sessioncycles_session FOREIGN KEY (cycle_ref)
    REFERENCES "cycle" (id);

/* adding cycle ref to session CycleTasks*/
ALTER TABLE cycletasks 
    ADD CONSTRAINT FK_cycletasks_cycle FOREIGN KEY (cycle_ref)
    REFERENCES "cycle" (id);

/* adding task ref to session CycleTasks*/
ALTER TABLE sessioncycles 
    ADD CONSTRAINT FK_sessioncycles_tasks FOREIGN KEY (task_ref)
    REFERENCES "tasks" (id);