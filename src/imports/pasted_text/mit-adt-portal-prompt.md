# MASTER FIGMA MAKE PROMPT — MIT ADT AGENTIC TRANSPORT & FACULTY SERVICES PORTAL

Design and prototype a complete, high-fidelity **MIT ADT University Transportation & Guest Faculty Services Portal**.

This is not a standalone transport app. It is a transportation and faculty-services module that is seamlessly integrated into an existing **MIT ADT college portal**.

The system has exactly **three user roles**:

1. FACULTY — includes guest/visiting faculty as one unified user segment
2. TRANSPORT HEAD / ADMIN
3. DRIVER

Behind the interface is a multi-agent AI system consisting of:

* Visit Orchestrator Agent
* Transport Agent
* Monitoring Agent
* Amenity Agent
* Reimbursement Agent

The AI should work primarily in the background.

## CRITICAL DESIGN PRINCIPLE

DO NOT create:

* chatbot
* AI chat window
* “Ask AI” button
* free-text prompt field
* conversational assistant
* AI avatar
* generic “Chat with AI” interface
* unnecessary AI-generated paragraphs

The system must communicate intelligence through:

* recommendations
* status changes
* automated planning
* route cards
* live maps
* timelines
* alerts
* notifications
* comparisons
* structured decisions
* approvals
* automatic updates
* exception handling

The user's mental model should be:

FACULTY:
“I submit my requirements and the system takes care of the logistics.”

ADMIN:
“I supervise the system, approve important decisions and handle exceptions.”

DRIVER:
“I receive the route, execute it and report what happens on the road.”

The AI should feel like an invisible operational intelligence layer rather than another interface that users have to learn.

---

# 01 — PRODUCT EXPERIENCE

Create one unified MIT ADT portal.

The visual system, navigation, typography, components, cards, buttons, maps, alerts and states must remain consistent across all three roles.

Use role-based navigation and permissions.

The portal should feel like a mature university enterprise product rather than a consumer travel app.

The system should visually communicate:

* reliability
* efficiency
* institutional trust
* automation
* clarity
* real-time awareness
* human oversight

Avoid overly futuristic “AI” visuals, glowing gradients, robots, circuit patterns or sci-fi interfaces.

AI should feel practical and operational.

---

# 02 — VISUAL DESIGN SYSTEM

## Overall style

Use:

* flat clean UI
* white/light neutral background
* large whitespace
* strong grid
* clear hierarchy
* rounded cards
* subtle borders
* minimal shadows
* structured data presentation
* map-based visual communication
* accessible contrast
* professional university administration aesthetic

The interface should look modern but not overly decorative.

Use visual communication wherever possible instead of long explanatory text.

---

# 03 — COLOUR SYSTEM

Primary colour:

PURPLE

Use purple for:

* primary navigation
* selected states
* active tabs
* AI planning states
* primary buttons
* important system information
* route/planning indicators

Secondary:

YELLOW / ORANGE

Use yellow/orange for:

* recommendations
* attention
* pending action
* warnings
* important CTAs
* AI recommendations

Use green for:

* successful
* confirmed
* on time
* completed
* automatically approved

Use red only for:

* critical disruption
* failed operation
* policy violation
* emergency

Use neutral greys for:

* secondary information
* disabled states
* borders
* backgrounds

Do not make every component colourful.

Colour must communicate system state.

---

# 04 — AI STATE LANGUAGE

Create a reusable status system.

PLANNING
Purple

MONITORING
Blue/neutral informational

RECOMMENDED
Yellow/orange

ACTION REQUIRED
Orange

EXECUTING
Green

COMPLETED
Green

EXCEPTION
Red

Use these states consistently throughout the product.

Examples:

“Planning your transport”

“Transport confirmed”

“Route being monitored”

“Alternative vehicle recommended”

“Admin approval required”

“Route updated”

“Trip completed”

---

# 05 — TYPOGRAPHY

Use a modern accessible sans-serif system.

Preferred:

HEADINGS:
Plus Jakarta Sans

BODY:
Open Sans

Use a clear type scale.

Desktop:

Display: 32–40 px
H1: 28–32 px
H2: 22–24 px
H3: 18–20 px
Body: 14–16 px
Small / metadata: 12–13 px

Mobile:

H1: 24–28 px
H2: 20–22 px
Body: 14–16 px
Metadata: 12–13 px

Use bold weights only for hierarchy and important information.

---

# 06 — LAYOUT SYSTEM

Desktop:

12-column grid.

Use:

* 24–32 px page margins
* 24 px card gaps
* 16–24 px internal padding
* 8 px spacing base
* consistent card heights where appropriate

Admin desktop layouts should use:

SIDEBAR + MAIN CONTENT + OPTIONAL RIGHT CONTEXT PANEL

Faculty desktop:

SIDEBAR + MAIN CONTENT

Driver mobile:

FULL-WIDTH MOBILE EXPERIENCE

Driver screens must use large touch targets.

---

# 07 — GLOBAL PORTAL SHELL

Create a reusable portal shell.

## Header

Include:

* MIT ADT logo
* portal/module name
* notification bell
* profile avatar
* user name
* role indicator

## Sidebar

Faculty:

Overview
My Visit
Transport
Amenities
Reimbursement

Admin:

Command Center
Faculty Requests
Plan & Schedule
Fleet & Drivers
Live Operations
Interventions
Amenities
Reimbursements

Driver:

Dashboard
Today's Route
Navigation
Issues

The sidebar must remain visually consistent while navigation changes according to role.

---

# 08 — FACULTY ROLE

Faculty includes guest faculty and visiting faculty.

Do NOT create separate portals for guest faculty and visiting faculty.

Faculty should be able to:

* create visit
* update visit
* select pickup/drop
* provide lecture details
* request transport
* request accommodation
* request food
* request return transport
* view assigned vehicle
* view driver
* track trip
* receive disruption updates
* request emergency transport
* upload reimbursement receipt
* view reimbursement status

---

# F01 — FACULTY DASHBOARD

Create:

* Welcome header
* Upcoming Visit card
* Transport Status card
* Accommodation card
* Food card
* Return Transport card
* Visit Timeline
* Notification centre
* Quick actions

Use realistic data:

Dr. Anjali Kulkarni
MIT ADT University
Lecture: 10:00 AM
Date: 18 September 2026
Pickup: Hinjewadi

Transport:

8:10 AM
MH12 AB 1234
Driver: Ramesh Pawar

Show:

“Transport Confirmed”

Add a “View Live Trip” CTA.

### Interactions

Click Upcoming Visit → Visit Overview

Click Transport → Transport Details

Click Live Trip → Live Trip

Click Accommodation → Amenities

Click notification → relevant event

Click sidebar items → respective screens

### Notification

“Transport confirmed. Pickup at 8:10 AM from Hinjewadi.”

---

# F02 — CREATE / UPDATE VISIT

Create a structured form.

Do not use free text.

## Visit Details

Date picker

Lecture time picker

Lecture duration dropdown

Campus dropdown

## Pickup

Interactive map

Search location

Use current location

Recent locations

Saved locations

Drop pin

## Requirements

Use selectable cards/toggles:

Transport required
Accommodation required
Food required
Return transport required

Passenger count stepper.

Transport preference:

University vehicle
Shared vehicle
Cab if required

Primary CTA:

SUBMIT VISIT

### Interaction

Submit → show AI planning transition.

Planning sequence:

1. Checking schedule
2. Finding transport
3. Checking fleet
4. Matching existing trips
5. Planning amenities
6. Confirming visit

Then automatically navigate to Visit Overview.

### Success notification

“Visit request submitted. Your transport and amenities are being planned.”

---

# F03 — VISIT OVERVIEW

Create a single complete visit summary.

Sections:

Visit details

Transport

Accommodation

Food

Return transport

Journey timeline

Status

Use a visual timeline:

8:10 Pickup
8:25 Wakad
8:40 Baner
9:20 MIT ADT
10:00 Lecture

Show:

“Visit Confirmed”

Buttons:

Edit Visit
View Transport
View Live Trip

---

# F04 — TRANSPORT DETAILS

Create:

* Route map
* Vehicle card
* Driver card
* Pickup location
* Pickup time
* Passenger count
* ETA
* Route timeline
* Lecture countdown

Example:

Vehicle:
MH12 AB 1234

Driver:
Ramesh Pawar

Passengers:
3

Route:

Hinjewadi
↓
Wakad
↓
Baner
↓
MIT ADT

CTA:

VIEW LIVE TRIP

---

# F05 — LIVE TRIP

Make this a highly visual screen.

Main area:

Large interactive map.

Show:

* current vehicle
* route
* pickup locations
* destination
* vehicle movement
* ETA

Secondary:

Driver card

Passenger information

Lecture countdown

Journey timeline

Dynamic status.

NORMAL STATE:

“On schedule”

“Arriving 8:25 AM”

DELAY STATE:

“Traffic detected”

“ETA being recalculated”

INTERVENTION STATE:

“Transport plan updated”

If the AI finds another vehicle, automatically update:

“Alternative vehicle assigned”

“New ETA: 9:42 AM”

Show the change without requiring faculty action.

---

# F06 — AMENITIES

Create three sections:

Accommodation

Food

Campus Access

Accommodation card:

MIT ADT Guest House
Room G-204
Check-in 9:45 AM

Food:

Lunch
12:15 PM
Guest Faculty Dining

Campus access:

Entry Gate
Reception
Lecture Hall

Show AI recommendations through badges:

“Recommended”

Reason chips:

Available
Near lecture hall
Matches schedule

Buttons:

Confirm
View Details
Navigate

---

# F07 — RETURN TRANSPORT

Show:

Recommended shared vehicle

12:30 PM

MIT ADT → Wakad → Hinjewadi

2 passengers

Vehicle

Driver

ETA

Route map

Show:

“Recommended”

Reason:

“Shared route available”

CTA:

CONFIRM RETURN

Secondary:

CHANGE DESTINATION

VIEW ROUTE

---

# F08 — EMERGENCY TRANSPORT

No text input.

Create large selectable cards:

Vehicle unavailable

Vehicle breakdown

Driver delay

Schedule changed

Show current trip information.

CTA:

REQUEST EMERGENCY CAB

After click:

“Checking emergency transport eligibility…”

Then show:

Cab approved

Maximum reimbursable fare: ₹1,000

Show policy verification as structured checklist.

---

# F09 — REIMBURSEMENT

Create:

Claim status

Upload receipt

Receipt preview

Extracted receipt information

Eligibility checklist

Policy limit

Claim timeline

Example successful claim:

Provider: Uber
Date: 18 September
Fare: ₹720
Trip: Hinjewadi → MIT ADT

Verification:

Trip verified ✓
Fare within limit ✓
Quota available ✓
Eligible ✓

Result:

“Automatically Approved”

“Reimbursement: ₹720”

Also create an exception state:

Claim: ₹1,850
Eligible: ₹1,000
Excess: ₹850

Status:

“Admin Review Required”

---

# 09 — TRANSPORT ADMIN ROLE

The admin is the human supervisor of the AI system.

The admin should NOT chat with AI.

The admin should see:

* recommendations
* evidence
* exceptions
* alternative plans
* system status
* approvals
* fleet state
* route state
* faculty requests

The admin should be able to override AI recommendations.

---

# A01 — COMMAND CENTER

Create a desktop command centre.

Top KPI cards:

Active Trips
Vehicles Running
Delayed Trips
Pending Approvals
Faculty Requests

Main area:

Large live fleet map.

Vehicle states:

On time
At risk
Delayed
Offline

Right side:

AI Operations Feed.

Examples:

08:05
“12 trips successfully planned”

08:18
“Trip #104 predicted 18 min delay”

08:19
“Alternative vehicle identified”

08:20
“Admin approval required”

Filters:

Date
Route
Vehicle
Status

Click delayed trip → AI Intervention.

---

# A02 — FACULTY REQUESTS

Create a structured table.

Columns:

Faculty
Visit Date
Pickup
Lecture
Transport
Accommodation
Food
Return
Status

Statuses:

New
Planning
Confirmed
Changed
Requires Approval
Completed

Controls:

Filter
Search
Select multiple
Plan Selected

Click request → request details.

---

# A03 — PLAN & SCHEDULE

Create:

Pending Requests panel

Fleet Availability panel

AI Planning Summary

Recommended Routes

Vehicle assignments

Driver assignments

Passenger groups

Pickup sequence

ETA

Capacity

Conflicts

Primary CTA:

PLAN & SCHEDULE

After click show:

Requests analyzed: 18
Vehicles available: 6
Potential shared trips: 5
Conflicts detected: 2

Then generate route cards.

Example:

ROUTE 01

Vehicle:
MH12 AB 1234

Driver:
Ramesh Pawar

Passengers:
3

Pickup:

Hinjewadi
Wakad
Baner

Destination:
MIT ADT

ETA:
9:20 AM

Controls:

Review Route
Edit Assignment
Recalculate
Approve Schedule
Lock Schedule

---

# A04 — FLEET & DRIVERS

Create vehicle management.

Vehicle card:

MH12 AB 1234

Capacity:
4

Occupancy:
3/4

Driver:
Ramesh Pawar

Status:
Running

Location:
Wakad

ETA:
8:25

Other statuses:

Available
Running
Maintenance
Delayed
Full

Filters.

Map view.

Click vehicle → detailed information.

---

# A05 — LIVE OPERATIONS

Create a real-time operational map.

Main map:

All active vehicles

Routes

Traffic

Delay states

Right panel:

Active trip list.

Each trip:

Faculty
Vehicle
Driver
ETA
Required arrival
Risk

Example:

Trip #104

Current ETA:
10:18

Lecture:
10:00

Risk:
HIGH

Click trip → Intervention Center.

---

# A06 — AI INTERVENTION CENTER

This is the HERO SCREEN of the entire project.

Create a large disruption alert:

“Transport Intervention”

“Dr. Anjali Kulkarni's trip is delayed”

Then visually compare:

CURRENT PLAN

Vehicle:
MH12 AB 1234

ETA:
10:18 AM

Lecture:
10:00 AM

Impact:
Lecture missed

versus

AI RECOMMENDED PLAN

Vehicle:
MH12 CD 5678

ETA:
9:42 AM

Lecture:
10:00 AM

Impact:
Lecture protected

Cost:
No additional cab cost

Show evidence chips:

High delay probability

Alternative vehicle nearby

Lecture deadline

Vehicle available

No cab required

Actions:

APPROVE PLAN

VIEW ALTERNATIVES

REJECT

Click Approve:

Confirmation modal:

“Approve transfer to MH12 CD 5678?”

Cancel
Approve

After approval:

Alternative vehicle assigned

Driver notified

Faculty notified

Route updated

Show success notification.

---

# A07 — ALTERNATIVE PLANS

Create a comparison interface.

PLAN A

Current Vehicle

ETA:
10:18

Impact:
Lecture missed

Cost:
₹0

PLAN B

Alternative University Vehicle

ETA:
9:42

Impact:
Lecture protected

Cost:
₹0

PLAN C

Cab

ETA:
9:35

Impact:
Lecture protected

Cost:
Higher

Highlight Plan B:

“AI Recommended”

Reason chips.

Controls:

Select Plan
View Route
Approve

---

# A08 — AMENITIES MANAGEMENT

Tabs:

Accommodation
Food
Campus Access

Accommodation:

Room inventory

Available
Reserved
Occupied
Maintenance

AI recommendation:

G-204

Reason:

Available
Near lecture hall
Matches schedule

Buttons:

Accept Recommendation
View Alternatives

Food:

Dining slots

Capacity

Reservations

Available slots

---

# A09 — REIMBURSEMENT REVIEW

Create claims table.

Columns:

Faculty
Trip
Claimed Amount
Eligible Amount
Policy Limit
Status

Click claim → detail panel.

Example:

Claim:
₹1,850

Eligible:
₹1,000

Excess:
₹850

Verification:

Trip verified ✓
Receipt verified ✓
Emergency verified ✓
Fare exceeds policy ✕

Actions:

APPROVE ₹1,000

REJECT

REVIEW TRIP

Confirmation modal:

“Approve reimbursement of ₹1,000?”

---

# 10 — DRIVER ROLE

The Driver interface must be significantly simpler.

The driver does not plan routes.

The driver does not approve AI.

The driver does not inspect complex analytics.

The driver:

SEE → START → NAVIGATE → PICK UP → REPORT → COMPLETE

Use mobile-first design.

Large touch targets.

Minimal text.

High contrast.

---

# D01 — DRIVER DASHBOARD

Create:

Driver profile

Vehicle

Today's trips

Next pickup

Departure time

Passenger count

Route status

CTA:

VIEW TODAY'S ROUTE

Notification:

“New route assigned for 8:10 AM.”

---

# D02 — TODAY'S ROUTE

Create large route timeline.

01
Hinjewadi
Dr. Anjali

↓

02
Wakad
Prof. X

↓

03
Baner
Prof. Y

↓

MIT ADT

Large bottom controls:

START TRIP

NAVIGATE

REPORT ISSUE

ARRIVED

Click Start:

Confirmation modal:

“Start today's trip?”

Cancel
Start

---

# D03 — NAVIGATION

Create full-screen mobile map.

Show:

Current vehicle

Route

Next stop

Distance

ETA

Traffic

Passenger count

Bottom sheet:

NEXT STOP

Wakad

2.4 km

6 min

NAVIGATE

If traffic changes:

“Traffic detected ahead”

“ETA recalculated”

---

# D04 — PICKUP / PASSENGER STATUS

Show:

Current stop

Passenger

Pickup location

Pickup time

Boarding state

Actions:

PASSENGER BOARDED

PASSENGER NO-SHOW

When passenger boards:

Automatically advance to next stop.

When no-show:

Confirmation modal:

“Mark passenger as no-show?”

Cancel
Confirm

---

# D05 — REPORT ISSUE

No free text.

Create issue cards:

Traffic

Vehicle problem

Passenger issue

Road blocked

Wrong pickup

Other operational issue

Severity:

Low
Medium
Critical

CTA:

SUBMIT ISSUE

After submit:

“Evaluating route impact…”

Then:

“Issue submitted. Transport operations notified.”

---

# D06 — UPDATED ROUTE / TRIP COMPLETE

This screen has two system states.

## STATE A — ROUTE UPDATED

Large alert:

“Route Updated”

Show:

New vehicle

New route

New pickup sequence

New ETA

Reason:

“Traffic disruption detected”

CTA:

NAVIGATE

Notification:

“Your route has been updated.”

## STATE B — TRIP COMPLETE

Large completion state:

“Trip completed”

Arrival:
9:43 AM

Passengers:
3

Stops:
3

Planned arrival:
9:45 AM

Actual:
9:43 AM

CTA:

COMPLETE TRIP

After completion:

Faculty status → Arrived

Admin status → Trip Completed

Monitoring Agent → Visit Updated

---

# 11 — GLOBAL NOTIFICATION SYSTEM

Create a reusable notification centre.

Notification types:

INFO
SUCCESS
ATTENTION
INTERVENTION
CRITICAL

Examples:

SUCCESS:

“Transport confirmed.”

ATTENTION:

“Pickup location changed. Route recalculated.”

INTERVENTION:

“Alternative vehicle identified.”

CRITICAL:

“Trip may miss lecture deadline.”

Every notification should be clickable and deep-link to the relevant screen.

Do not create generic notification pages where users have to search for context.

---

# 12 — GLOBAL MODALS

Create reusable modal components.

## Confirmation modal

“Confirm this change?”

Cancel
Confirm

## AI recommendation modal

“Alternative vehicle identified.”

ETA:
10:18 → 9:42

View Plan
Dismiss

## Admin approval

“Approve recommended intervention?”

Reject
Approve

## Processing modal

“Planning transport…”

Checking fleet
Optimizing route
Confirming

## Exception modal

“Policy limit exceeded.”

Claim:
₹1,850

Eligible:
₹1,000

Review Claim

## Success modal

“Transport successfully updated.”

View Trip

---

# 13 — AGENTIC BEHAVIOUR

The prototype must demonstrate actual system behaviour through connected states.

Do NOT merely create static screens with an “AI” badge.

Create prototype transitions showing:

## SCENARIO 1 — NORMAL PLANNING

Faculty:

Create Visit

↓

Submit

↓

AI Planning

↓

Transport confirmed

↓

Admin sees generated schedule

↓

Admin approves

↓

Driver receives route

↓

Faculty receives confirmation

---

# 14 — SCENARIO 2 — DISRUPTION

Driver starts trip.

↓

Monitoring Agent detects traffic.

↓

ETA changes.

↓

System identifies high probability of missing lecture.

↓

Monitoring Agent triggers intervention.

↓

Transport Agent evaluates alternatives.

↓

Alternative university vehicle found.

↓

Admin receives Intervention Center alert.

↓

Admin compares plans.

↓

Admin approves Plan B.

↓

Alternative vehicle assigned.

↓

Driver receives updated route.

↓

Faculty receives automatic notification.

↓

Faculty sees new ETA.

↓

Trip arrives before lecture.

This is the primary agentic demonstration.

---

# 15 — SCENARIO 3 — EMERGENCY CAB

Vehicle breaks down.

↓

Driver selects:

Vehicle problem

↓

Monitoring Agent evaluates.

↓

Transport Agent determines university vehicle unavailable.

↓

Faculty receives emergency transport status.

↓

System checks policy.

↓

Cab approved.

↓

Faculty completes journey.

↓

Faculty uploads receipt.

↓

Reimbursement Agent extracts receipt data.

↓

Policy verified.

↓

If under ₹1,000:

Automatically approved.

If above ₹1,000:

Admin Review Required.

---

# 16 — PROTOTYPE INTERACTION RULES

Make the screens actually connected.

Faculty:

F01 → F02 → F03 → F04 → F05

F03 → F06

F03 → F07

F05 → disruption state

F07 → confirmation

F08 → F09

Admin:

A01 → A02

A02 → A03

A03 → A04

A05 → A06

A06 → A07

A07 → A06

A06 → approval state

A08 → accommodation/food details

A09 → claim detail

Driver:

D01 → D02

D02 → D03

D03 → D04

D04 → next stop

D03 → D05

D05 → D06

D06 → completed state

---

# 17 — RESPONSIVE BEHAVIOUR

DESKTOP:

Faculty:
1440 × 1024

Admin:
1440 × 1024

MOBILE:

Driver:
390 × 844

Create responsive variants.

Admin should prioritize information density.

Faculty should prioritize clarity and reassurance.

Driver should prioritize speed and safety.

---

# 18 — COMPONENT LIBRARY

Create reusable components and variants.

Buttons:

Primary
Secondary
Tertiary
Danger
Disabled

Status:

Confirmed
Planning
Monitoring
Recommended
Action Required
Delayed
Completed
Exception

Cards:

Transport
Vehicle
Driver
Faculty
Route
Amenity
Claim
AI Recommendation
Alert
KPI

Inputs:

Date picker
Time picker
Dropdown
Toggle
Stepper
Map selector
Radio cards
Checkbox
File upload

Navigation:

Sidebar
Header
Tabs
Breadcrumb
Bottom navigation

Feedback:

Toast
Notification
Modal
Banner
Progress
Skeleton

Map:

Vehicle marker
Pickup marker
Destination marker
Route line
Delay marker
Selected vehicle

---

# 19 — IMPORTANT MICROINTERACTIONS

Add subtle transitions.

When AI is planning:

Progress indicator changes sequentially.

When transport is confirmed:

Planning card morphs into confirmed card.

When a vehicle becomes delayed:

Status changes from green → orange/red.

When an alternative is found:

Recommendation card slides into the admin intervention area.

When admin approves:

Approval state → execution state.

Driver receives updated route.

Faculty receives updated ETA.

Map route visually changes.

When trip completes:

Timeline node changes to completed.

Use subtle animation, not excessive motion.

---

# 20 — INFORMATION HIERARCHY

Always prioritize:

1. What is happening?
2. What does it mean to me?
3. What do I need to do?
4. What happens next?

Never make users decode technical AI information.

Instead of:

“Monitoring Agent detected probability distribution indicating a 78% delay risk.”

Show:

“High delay risk”

“Current ETA: 10:18”

“Lecture: 10:00”

“Alternative vehicle available”

“Approve recommended plan”

---

# 21 — HUMAN-IN-THE-LOOP DESIGN

The AI should automatically perform low-risk tasks.

Examples:

Automatically:

* group compatible trips
* assign routes
* calculate ETA
* monitor GPS
* detect delays
* notify users
* update status
* process compliant reimbursements

Require admin approval for:

* major vehicle reassignment
* exceptional cost
* policy exceptions
* high-impact intervention

The interface must clearly distinguish:

AUTOMATIC

RECOMMENDED

REQUIRES APPROVAL

COMPLETED

---

# 22 — SAMPLE DATA

Use realistic sample data throughout the prototype.

Faculty:

Dr. Anjali Kulkarni

Lecture:

10:00 AM – 12:00 PM

Pickup:

Hinjewadi

Destination:

MIT ADT University

Vehicles:

MH12 AB 1234
Capacity: 4
Driver: Ramesh Pawar

MH12 CD 5678
Capacity: 6
Driver: Suresh

MH14 EF 9012
Status: Maintenance

Normal route:

Hinjewadi
→ Wakad
→ Baner
→ MIT ADT

Normal ETA:

9:20 AM

Disrupted ETA:

10:18 AM

Alternative ETA:

9:42 AM

Cab ETA:

9:35 AM

Cab policy:

₹1,000 reimbursable limit

---

# 23 — DESIGN WHAT NOT TO DO

Do NOT:

* make every card purple
* use excessive gradients
* use neon AI graphics
* use robot illustrations
* use chatbot bubbles
* use free-text inputs for operational decisions
* show long AI reasoning
* overload faculty with admin information
* give drivers complex dashboards
* make every notification a popup
* use modal dialogs unnecessarily
* create separate Guest and Visiting Faculty portals
* create a separate AI application
* make users manually trigger every AI action

The system should feel like:

“MIT ADT portal with intelligent transportation operations built into it.”

Not:

“AI transportation app.”

---

# 24 — FINAL PROTOTYPE EXPERIENCE

The final clickable prototype must tell this story:

A faculty member enters their visit details.

The system automatically plans transport.

The admin sees the generated schedule.

The admin approves it.

The driver receives the route.

The driver starts the journey.

The system monitors the vehicle.

Traffic causes a predicted delay.

The AI identifies that the faculty may miss the lecture.

The AI finds an alternative vehicle.

The admin receives a structured intervention.

The admin compares plans.

The admin approves the recommended alternative.

The driver receives an updated route.

The faculty receives an automatic update.

The faculty arrives on time.

The system handles amenities.

The system plans return transport.

If an emergency occurs, the system handles the cab and reimbursement workflow.

Finally:

VISIT COMPLETED.

The entire experience should communicate:

**REQUEST → PLAN → SUPERVISE → EXECUTE → MONITOR → ADAPT → COMPLETE**

The AI is not the interface.

**The AI is the intelligence behind the interface.**
