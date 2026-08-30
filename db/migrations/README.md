# Database migrations

The PostgreSQL database is the source of truth for the MIT ADT Transport & Faculty Services Portal. The existing Figma Make React frontend is intentionally untouched by this directory.

## Prerequisite

`DATABASE_URL` must be provided by the runtime environment. Do not commit a database URL or any credentials.

## Apply migrations

Migrations are ordered and are applied once per database by the later Node API deployment process. For this initial SQL-only stage, run:

```bash
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f db/migrations/0001_initial_transport_schema.sql
```

Use `-v ON_ERROR_STOP=1` so PostgreSQL stops and rolls back the transaction on the first error. Migration `0001` wraps the schema in a transaction and is safe to retry only if it did not commit. Production migration tracking/runner wiring belongs to the future Node API layer, not this frontend-preserving schema stage.

## Schema source

`db/schema.sql` is the canonical full-schema reference. `db/migrations/0001_initial_transport_schema.sql` is the executable first migration and currently mirrors it.

## Policy stored by the schema

- Faculty pickup/drop change and leave-request deadlines are persisted on each `transport_requests` row for deterministic policy enforcement by the future backend.
- Vehicle capacity is a database-level positive integer constraint; final assignment capacity checks are deterministic backend rules.
- The cab reimbursement policy is represented in paise (`100000` = ₹1,000) and constrained per reimbursement record. Claims may be marked `auto_approved` or `admin_review`; payment transfers are not modelled.
- Device GPS and clearly-labelled simulation GPS are persisted distinctly through `gps_locations.source`.
- Agent recommendations, policies, approval requirements, interventions, notifications, and audit events are stored for the future backend; this stage does not execute agents.
