export type Role = "faculty" | "admin" | "driver";

export type Screen =
  | "LOGIN"
  | "F01" | "F02" | "F03" | "F04" | "F05" | "F06" | "F07" | "F08" | "F09"
  | "A01" | "A02" | "A03" | "A04" | "A05" | "A06" | "A07" | "A08" | "A09"
  | "D01" | "D02" | "D03" | "D04" | "D05" | "D06";

export type StatusType =
  | "planning"
  | "monitoring"
  | "recommended"
  | "action-required"
  | "executing"
  | "completed"
  | "exception"
  | "confirmed"
  | "delayed"
  | "on-time"
  | "new"
  | "submitted"
  | "approved"
  | "rejected";

export interface NavProps {
  navigate: (screen: Screen) => void;
  currentScreen: Screen;
  role: Role;
}

export interface ScenarioState {
  tripDisrupted: boolean;
  alternativeApproved: boolean;
  tripStarted: boolean;
  visitSubmitted: boolean;
  reimbursementAmount: number;
}
