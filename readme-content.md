## Overview

Neurofoam is an approach for making dead-simple JSON/HTTP APIs which port easily
and have automatic concurrency control.  It is best suited to systems which have
many disconnected "islands" of state, which are referred to as "bubbles", where
the system as a whole becomes a "foam" of these "bubbles".

It was built for a single private project and is not designed for solving
real-world problems.

## Request pipeline

Where a `uuid` is of the form
`^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$`:

The request must be of the form `POST {Neurofoam host}/{bubble uuid}`.

If the path is not as above, HTTP status code 404 is returned with no further
action taken.

If the HTTP method is not `POST`, HTTP status code 405 is returned with no
further action taken.

The request body must be valid JSON; if it is not, HTTP status code 400 is
returned with no further action taken.

If the Authorization header is present, it must be of the form `BEARER {uuid}`.
If it is not, HTTP status code 401 is returned with no further action taken.

Next, the request body JSON is validated against the application's request JSON
schema.  If it is not valid, HTTP status code 422 is returned with no further
action taken.

The request callback is then executed.  This is given the "bubble"'s state JSON,
the session `uuid` (or a new, randomly generated session `uuid` if the
Authorization header is absent), and the request body JSON.  It then returns an
object containing the response status code, optional JSON body, and optional
event JSON.

If event JSON is emitted, the event applicator callback is executed, given the
"bubble"'s current state JSON and the event JSON.  It returns the new state to
use.  This is persisted, subject to optimistic concurrency control; if the
persisted "bubble" state has changed, the request pipeline is rewound to the
request callback using the new "bubble" state JSON and the same sesison `uuid`
and request body JSON as before.

Afterward, the response body is returned to the client.  If a new session `uuid`
was generated, it is returned in the Authorization header.
