import { useFetch } from "hooks/useFetch";
import { useMemo } from "react";
import { Groping, Ordering } from "../constants/sorting.constants";
import { priorities, statuses } from "../constants/data.constants";
import {
  generateColorContrast,
  generateRandomColor,
} from "helpers/colors.helpers";

const defaultData = {
  users: [],
  tickets: [],
};

const useFetchKanbanService = ({ groping, ordering }) => {
  const { data, isError, isLoading, isSuccess } = useFetch({
    url: "https://api.quicksell.co/v1/internal/frontend-assignment",
    defaultData,
  });

  const users = useMemo(() => {
    if (isError || !data || isLoading) {
      return [];
    }

    return data.users.map((user) => {
      const backgroundColor = generateRandomColor();
      const textColor = generateColorContrast(backgroundColor);

      return {
        ...user,
        avatar: {
          textColor,
          backgroundColor,
        },
      };
    });
  }, [data, isError, isLoading]);

  const boardState = useMemo(() => {
    if (isError || !data || isLoading) {
      return [];
    }

    const handleSorting = (a, b) => {
      if (Ordering.PRIORITY === ordering) {
        return a.priority - b.priority;
      }

      if (Ordering.TITLE === ordering) {
        if (a.title < b.title) {
          return -1;
        }

        if (a.title > b.title) {
          return 1;
        }

        return 0;
      }
    };

    if (Groping.STATUS === groping) {
      return statuses.map((status) => ({
        ...status,
        tickets: data.tickets
          .filter(
            (ticket) =>
              ticket.status &&
              ticket.status.toLowerCase() === status.label.toLowerCase()
          )
          .sort(handleSorting),
      }));
    }

    if (Groping.PRIORITY === groping) {
      return priorities.map((priority) => ({
        ...priority,
        tickets: data.tickets
          .filter((ticket) => ticket.priority === priority.id)
          .sort(handleSorting),
      }));
    }

    if (Groping.USER === groping) {
      return users.map((user) => ({
        ...user,
        label: user.name,
        tickets: data.tickets
          .filter((ticket) => ticket.userId === user.id)
          .sort(handleSorting),
      }));
    }

    return [];
  }, [isError, data, isLoading, groping, ordering, users]);

  return { users: users || [], boardState, isLoading, isSuccess, isError };
};

export default useFetchKanbanService;
