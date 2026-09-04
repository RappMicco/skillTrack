import {
  LayoutDashboard,
  Grid3X3,
  ChartColumn,
  ClipboardList,
  WrenchOff,
} from "lucide-react";

export const getNavItems = (isAdmin) => [
  {
    id: 1,
    title: "Dashboard",
    shortLabel: "Home",
    description: "Employee Growth and Development",
    icon: LayoutDashboard,
    path: "/skill-track/dashboard",
  },
  {
    id: 2,
    title: "Skill Matrix",
    shortLabel: "Matrix",
    description: "Building Competencies for Future Success",
    icon: Grid3X3,
    path: "/skill-track/skillMatrix",
  },
  {
    id: 3,
    title: "Insight",
    shortLabel: "Insight",
    description: "Analyze Skill Trends and Performance Metrics",
    icon: ChartColumn,
    path: "/skill-track/insight",
  },
  ...(isAdmin
    ? [
        {
          id: 4,
          title: "Assign Training",
          shortLabel: "Assign",
          description: "Empowering Employee Growth",
          icon: ClipboardList,
          path: "/skill-track/assign-training",
        },
      ]
    : []),
  ...(isAdmin
    ? [
        {
          id: 5,
          title: "Maintenance",
          shortLabel: "Setup",
          description: "Keeping System Data Accurate and Up-to-Date",
          icon: WrenchOff,
          path: "/skill-track/maintenance",
        },
      ]
    : []),
];
