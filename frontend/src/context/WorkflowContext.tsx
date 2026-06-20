import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode
} from "react";

import API from "../services/api";

export type Severity = "Critical" | "High" | "Medium";
export type AutonomyLevel =
  | "collaborative"
  | "copilot"
  | "autonomous";


export type RecommendationStatus =
  | "Pending"
  | "Approved"
  | "Rejected"
  | "Escalated"
  | "Details Requested";

export interface Recommendation {
  id: string;
  type: string;
  action: string;
  severity: Severity;
  confidence: number;
  sources: string[];
  status: RecommendationStatus;
  why: string[];

  nutritionLabel: {
    evidenceStrength: number;
    sources: string[];
    similarCases: number;
    limitations: string;
    model: string;
  };
  shapImportance: {
    feature: string;
    val: number;
    type: "positive" | "negative";
  }[];

  subagents: {
    name: string;
    score: number;
    details: string;
  }[];

  similarCasesList: {
    id: string;
    action: string;
    outcome: string;
    confidence: number;
  }[];
  trustDNA: {
    score: number;
    dataQuality: number;
    policyMatch: number;
    fleetSimilarity: number;
    threatIntelMatch: number;
    unknownRisk: number;
  };

  devilsAdvocate: {
    points: string[];
    alternativeAction: string;
  };

  timeMachine: {
    accuracy: number;
    cases: number;
    breakdown: {
      correct: number;
      falsePositives: number;
      escalated: number;
    };
  };
}

export interface ActivityLogEntry {
  time: string;
  event: string;
  user?: string;
  type: "system" | "ai" | "user";
}

interface WorkflowContextType {
  currentScreen: number;
  setCurrentScreen: (screen: number) => void;

  recommendations: Recommendation[];

  activeRecId: string;
  setActiveRecId: (id: string) => void;

  activeRec: Recommendation;

  activityLog: ActivityLogEntry[];

  submitDecision: (
    decision:
      | "Approved"
      | "Rejected"
      | "Escalated"
      | "Details Requested",
    notes?: string
  ) => void;

  resetDemo: () => void;

  selectedAltAction: boolean;
  setSelectedAltAction: (val: boolean) => void;

  decisionNotes: string;
  setDecisionNotes: (val: string) => void;

  showSuccessToast: boolean;
  setShowSuccessToast: (val: boolean) => void;

  dashboardStats: {
    total_alerts: number;
    critical: number;
    high: number;
    medium: number;
  };
  autonomyLevel: AutonomyLevel;

  setAutonomyLevel: (
    level: AutonomyLevel
  ) => void;
}

const WorkflowContext = createContext<
  WorkflowContextType | undefined
>(undefined);

export const WorkflowProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [currentScreen, setCurrentScreen] =
    useState<number>(1);

  const [recommendations, setRecommendations] =
    useState<Recommendation[]>([]);

  const [activityLog, setActivityLog] =
    useState<ActivityLogEntry[]>([]);

  const [activeRecId, setActiveRecId] =
    useState<string>("");

  const [selectedAltAction, setSelectedAltAction] =
    useState<boolean>(false);

  const [decisionNotes, setDecisionNotes] =
    useState<string>("");

  const [showSuccessToast, setShowSuccessToast] =
    useState<boolean>(false);

  const [dashboardStats, setDashboardStats] =
    useState({
      total_alerts: 0,
      critical: 0,
      high: 0,
      medium: 0
    });

  const [
    autonomyLevel,
    setAutonomyLevel
  ] =
    useState<AutonomyLevel>(
      "copilot"
    );

  useEffect(() => {
    API.get("/recommendations")
      .then((res) => {
        setRecommendations(res.data);

        if (res.data.length > 0) {
          setActiveRecId(res.data[0].id);
        }
      })
      .catch(console.error);
  }, []);

  /*
   ----------------------------
   LOAD ACTIVITY LOG
   ----------------------------
  */

  useEffect(() => {
    API.get("/activity-log")
      .then((res) => {
        setActivityLog(res.data);
      })
      .catch(console.error);
  }, []);

  /*
   ----------------------------
   LOAD DASHBOARD STATS
   ----------------------------
  */

  useEffect(() => {
    API.get("/dashboard-stats")
      .then((res) => {
        setDashboardStats(res.data);
      })
      .catch(console.error);
  }, []);

  const activeRec =
    recommendations.find(
      (r) => r.id === activeRecId
    ) || recommendations[0];

  /*
   ----------------------------
   DECISION HANDLER
   ----------------------------
  */

  const submitDecision = async (
    decision:
      | "Approved"
      | "Rejected"
      | "Escalated"
      | "Details Requested",
    notes?: string
  ) => {
    try {
      if (!activeRec) return;

      if (decision === "Approved") {
        await API.post(
          `/actions/approve/${activeRec.id}`
        );
      }

      if (decision === "Rejected") {
        await API.post(
          `/actions/reject/${activeRec.id}`
        );
      }

      if (decision === "Escalated") {
        await API.post(
          `/actions/escalate/${activeRec.id}`
        );
      }

      if (decision === "Details Requested") {
        await API.post(
          `/actions/details/${activeRec.id}`
        );
      }

      setRecommendations((prev) =>
        prev.map((rec) => {
          if (rec.id === activeRec.id) {
            return {
              ...rec,
              status: decision
            };
          }

          return rec;
        })
      );

      const now = new Date();

      const newLog: ActivityLogEntry = {
        time: now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        }),

        event: selectedAltAction
          ? `Alternative action selected: ${activeRec.devilsAdvocate.alternativeAction}`
          : `Recommendation ${decision} by Admin.`,

        type: "user"
      };

      setActivityLog((prev) => [
        ...prev,
        newLog
      ]);

      setShowSuccessToast(true);

      setCurrentScreen(1);

      setSelectedAltAction(false);

      setDecisionNotes("");

      setTimeout(() => {
        setShowSuccessToast(false);
      }, 4000);
    } catch (error) {
      console.error(error);
    }
  };



  const resetDemo = () => {
    window.location.reload();
  };

  if (!activeRec) {
    return null;
  }

  return (
    <WorkflowContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,

        recommendations,

        activeRecId,
        setActiveRecId,

        activeRec,

        activityLog,

        submitDecision,

        resetDemo,
        autonomyLevel,
        setAutonomyLevel,

        selectedAltAction,
        setSelectedAltAction,

        decisionNotes,
        setDecisionNotes,

        showSuccessToast,
        setShowSuccessToast,

        dashboardStats
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflow = () => {
  const context = useContext(
    WorkflowContext
  );

  if (!context) {
    throw new Error(
      "useWorkflow must be used within a WorkflowProvider"
    );
  }

  return context;
};