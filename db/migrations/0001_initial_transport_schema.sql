-- Migration: 0001_initial_transport_schema
-- Apply with: psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f db/migrations/0001_initial_transport_schema.sql
--
-- This initial migration intentionally owns all backend persistence required by
-- the Faculty, Transport Admin, and Driver workflows. It does not alter UI code.

BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE user_role AS ENUM ('faculty', 'driver', 'transport_admin');
CREATE TYPE visit_status AS ENUM ('draft', 'submitted', 'planning', 'confirmed', 'changed', 'completed', 'cancelled');
CREATE TYPE transport_request_status AS ENUM ('draft', 'submitted', 'planning', 'recommended', 'approved', 'rejected', 'assigned', 'cancelled', 'completed');
CREATE TYPE transport_preference AS ENUM ('university_vehicle', 'shared_vehicle', 'cab_if_required');
CREATE TYPE vehicle_status AS ENUM ('available', 'assigned', 'running', 'maintenance', 'offline');
CREATE TYPE driver_status AS ENUM ('available', 'assigned', 'on_trip', 'off_duty');
CREATE TYPE route_status AS ENUM ('draft', 'recommended', 'approved', 'superseded');
CREATE TYPE trip_status AS ENUM ('scheduled', 'assigned', 'driver_en_route', 'at_pickup', 'in_progress', 'delayed', 'completed', 'cancelled', 'incident_reported');
CREATE TYPE trip_stop_status AS ENUM ('pending', 'arrived', 'boarded', 'no_show', 'completed', 'skipped');
CREATE TYPE gps_source AS ENUM ('device', 'simulation');
CREATE TYPE notification_type AS ENUM ('info', 'success', 'attention', 'intervention', 'critical');
CREATE TYPE notification_status AS ENUM ('unread', 'read');
CREATE TYPE reimbursement_status AS ENUM ('draft', 'submitted', 'auto_approved', 'admin_review', 'approved', 'rejected', 'payment_pending', 'paid');
CREATE TYPE intervention_status AS ENUM ('recommended', 'pending_approval', 'approved', 'rejected', 'applied', 'dismissed');
CREATE TYPE agent_name AS ENUM ('visit_orchestrator', 'transport_planning', 'monitoring', 'amenity', 'reimbursement');
CREATE TYPE agent_run_status AS ENUM ('started', 'completed', 'failed', 'skipped');

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  display_name text NOT NULL,
  role user_role NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE faculty (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES users(id) ON DELETE RESTRICT,
  faculty_type text NOT NULL CHECK (faculty_type IN ('guest', 'visiting')),
  institution_name text,
  department text,
  phone text,
  existing_administration_reference text UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  faculty_id uuid NOT NULL REFERENCES faculty(id) ON DELETE RESTRICT,
  visit_date date NOT NULL,
  lecture_start_at timestamptz,
  lecture_end_at timestamptz,
  campus_location text NOT NULL,
  purpose text,
  passenger_count integer NOT NULL DEFAULT 1 CHECK (passenger_count > 0),
  status visit_status NOT NULL DEFAULT 'draft',
  submitted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE transport_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visit_id uuid NOT NULL REFERENCES visits(id) ON DELETE CASCADE,
  direction text NOT NULL CHECK (direction IN ('arrival', 'return')),
  pickup_location text NOT NULL,
  pickup_latitude numeric(9,6),
  pickup_longitude numeric(9,6),
  drop_location text NOT NULL,
  drop_latitude numeric(9,6),
  drop_longitude numeric(9,6),
  requested_pickup_at timestamptz,
  preference transport_preference NOT NULL DEFAULT 'university_vehicle',
  transport_required boolean NOT NULL DEFAULT true,
  status transport_request_status NOT NULL DEFAULT 'draft',
  change_deadline_at timestamptz,
  leave_request_deadline_at timestamptz,
  change_requested_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (visit_id, direction)
);

CREATE TABLE vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_number text NOT NULL UNIQUE,
  vehicle_type text NOT NULL,
  capacity integer NOT NULL CHECK (capacity > 0),
  status vehicle_status NOT NULL DEFAULT 'available',
  current_location_label text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE drivers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES users(id) ON DELETE RESTRICT,
  license_number text NOT NULL UNIQUE,
  phone text,
  status driver_status NOT NULL DEFAULT 'available',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE routes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  origin_label text NOT NULL,
  destination_label text NOT NULL,
  encoded_geometry text,
  estimated_distance_meters integer CHECK (estimated_distance_meters >= 0),
  estimated_duration_seconds integer CHECK (estimated_duration_seconds >= 0),
  status route_status NOT NULL DEFAULT 'draft',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE route_stops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  route_id uuid NOT NULL REFERENCES routes(id) ON DELETE CASCADE,
  stop_order integer NOT NULL CHECK (stop_order > 0),
  location_label text NOT NULL,
  latitude numeric(9,6),
  longitude numeric(9,6),
  planned_arrival_offset_seconds integer CHECK (planned_arrival_offset_seconds >= 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (route_id, stop_order)
);

CREATE TABLE trips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  route_id uuid REFERENCES routes(id) ON DELETE SET NULL,
  vehicle_id uuid REFERENCES vehicles(id) ON DELETE SET NULL,
  driver_id uuid REFERENCES drivers(id) ON DELETE SET NULL,
  status trip_status NOT NULL DEFAULT 'scheduled',
  scheduled_start_at timestamptz,
  scheduled_end_at timestamptz,
  actual_start_at timestamptz,
  actual_end_at timestamptz,
  delay_minutes integer NOT NULL DEFAULT 0 CHECK (delay_minutes >= 0),
  delay_reason text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE trip_transport_requests (
  trip_id uuid NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  transport_request_id uuid NOT NULL REFERENCES transport_requests(id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (trip_id, transport_request_id)
);

CREATE TABLE trip_stops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  transport_request_id uuid REFERENCES transport_requests(id) ON DELETE SET NULL,
  stop_order integer NOT NULL CHECK (stop_order > 0),
  stop_type text NOT NULL CHECK (stop_type IN ('pickup', 'drop')),
  location_label text NOT NULL,
  planned_arrival_at timestamptz,
  actual_arrival_at timestamptz,
  status trip_stop_status NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (trip_id, stop_order)
);

CREATE TABLE gps_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  driver_id uuid NOT NULL REFERENCES drivers(id) ON DELETE RESTRICT,
  vehicle_id uuid NOT NULL REFERENCES vehicles(id) ON DELETE RESTRICT,
  latitude numeric(9,6) NOT NULL CHECK (latitude BETWEEN -90 AND 90),
  longitude numeric(9,6) NOT NULL CHECK (longitude BETWEEN -180 AND 180),
  recorded_at timestamptz NOT NULL,
  accuracy_meters numeric(10,2) CHECK (accuracy_meters >= 0),
  source gps_source NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  status notification_status NOT NULL DEFAULT 'unread',
  title text NOT NULL,
  body text NOT NULL,
  destination_screen text,
  related_entity_type text,
  related_entity_id uuid,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE reimbursements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  faculty_id uuid NOT NULL REFERENCES faculty(id) ON DELETE RESTRICT,
  visit_id uuid REFERENCES visits(id) ON DELETE SET NULL,
  transport_request_id uuid REFERENCES transport_requests(id) ON DELETE SET NULL,
  provider text NOT NULL CHECK (provider IN ('ola', 'uber', 'other')),
  trip_date date NOT NULL,
  origin_label text,
  destination_label text,
  claimed_amount_paise integer NOT NULL CHECK (claimed_amount_paise >= 0),
  eligible_amount_paise integer NOT NULL CHECK (eligible_amount_paise >= 0),
  policy_limit_paise integer NOT NULL DEFAULT 100000 CHECK (policy_limit_paise = 100000),
  status reimbursement_status NOT NULL DEFAULT 'draft',
  receipt_file_name text,
  receipt_storage_key text,
  receipt_extracted_data jsonb,
  reviewed_by_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  reviewed_at timestamptz,
  review_notes text,
  submitted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE interventions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid REFERENCES trips(id) ON DELETE CASCADE,
  transport_request_id uuid REFERENCES transport_requests(id) ON DELETE SET NULL,
  type text NOT NULL CHECK (type IN ('delay', 'route_change', 'vehicle_change', 'driver_change', 'incident', 'cab_recommendation')),
  status intervention_status NOT NULL DEFAULT 'recommended',
  summary text NOT NULL,
  recommendation jsonb NOT NULL DEFAULT '{}'::jsonb,
  requires_admin_approval boolean NOT NULL DEFAULT true,
  requested_by_agent agent_name,
  decided_by_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  decided_at timestamptz,
  decision_notes text,
  applied_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE agent_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent agent_name NOT NULL,
  status agent_run_status NOT NULL DEFAULT 'started',
  event_type text NOT NULL,
  entity_type text,
  entity_id uuid,
  input_snapshot jsonb NOT NULL DEFAULT '{}'::jsonb,
  recommendation jsonb,
  policy_result jsonb,
  safe_action jsonb,
  error_message text,
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);

CREATE TABLE agent_decisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_run_id uuid NOT NULL REFERENCES agent_runs(id) ON DELETE CASCADE,
  decision_type text NOT NULL,
  decision jsonb NOT NULL,
  requires_admin_approval boolean NOT NULL DEFAULT false,
  approved_by_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  approved_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid,
  before_state jsonb,
  after_state jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX visits_faculty_date_idx ON visits (faculty_id, visit_date);
CREATE INDEX transport_requests_status_idx ON transport_requests (status, requested_pickup_at);
CREATE INDEX trips_status_start_idx ON trips (status, scheduled_start_at);
CREATE INDEX trip_stops_trip_order_idx ON trip_stops (trip_id, stop_order);
CREATE INDEX gps_locations_trip_recorded_idx ON gps_locations (trip_id, recorded_at DESC);
CREATE INDEX notifications_user_status_idx ON notifications (user_id, status, created_at DESC);
CREATE INDEX reimbursements_status_idx ON reimbursements (status, submitted_at);
CREATE INDEX interventions_status_idx ON interventions (status, created_at DESC);
CREATE INDEX agent_runs_agent_started_idx ON agent_runs (agent, started_at DESC);
CREATE INDEX audit_logs_entity_idx ON audit_logs (entity_type, entity_id, created_at DESC);

COMMIT;
