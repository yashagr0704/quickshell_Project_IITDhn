import NoPriorityIcon from "assets/icons/priorities/no_priority.svg";
import LowIcon from "assets/icons/priorities/low.svg";
import MediumIcon from "assets/icons/priorities/medium.svg";
import HighIcon from "assets/icons/priorities/high.svg";
import UrgentIcon from "assets/icons/priorities/urgent.svg";

import Backlog from "assets/icons/statuses/backlog.svg";
import Todo from "assets/icons/statuses/todo.svg";
import InProgress from "assets/icons/statuses/in_progress.svg";
import Done from "assets/icons/statuses/done.svg";
import Canceled from "assets/icons/statuses/canceled.svg";

export const priorities = [
  { id: 0, label: "No Priority", icon: NoPriorityIcon },
  { id: 1, label: "Low", icon: LowIcon },
  { id: 2, label: "Medium", icon: MediumIcon },
  { id: 3, label: "High", icon: HighIcon },
  { id: 4, label: "Urgent", icon: UrgentIcon },
];

export const statuses = [
  { id: 0, label: "Backlog", icon: Backlog },
  { id: 1, label: "Todo", icon: Todo },
  { id: 2, label: "In Progress", icon: InProgress },
  { id: 3, label: "Done", icon: Done },
  { id: 4, label: "Canceled", icon: Canceled },
];
