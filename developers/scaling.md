# Scaling

This document are provided as a guide to scale the project. Mostly focused on
the project itself, but however, it should considered the infrastructure and
environment scaling, structure should this be use on a production environment.

Multiple API server instances may also needed once the app is in high demands. As
eventually, API server will not be able to handle too many requests up to certain
point. Keep in mind that running multiple API servers while connecting to only
one datasource could cause the racing issues and might not guarantee the data
consistency and integrity in the system. Hence a datasource scaling also needed.

To be able to handle such a request, a sharding or replication is needed depends on
the datasource used (in this case MongoDB). The application might or might not need
to be changed, depends on the implementation as the connection could be differs once
using a sharding or replication. An "ACID" operation might needed to be implemented
in the system as well should any lag could be occured by the datasource synchronization.
