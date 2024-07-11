# About

**Properties**

- supplementary database
- simple queries
- store key
- retrieve value

**Cache**

Good when used as caching data that is frequently requested but expensive to run.
Consider improving primary database architecture prior to implementing a secondary cache database.

**Uses**

- non critical data
- telemetry data

# Databases

- postgreSQL hstore - good for key values , not fast for caching
- memchached - very light , only stores in memory , only strings
- redis - multiple servers , multiple data types
