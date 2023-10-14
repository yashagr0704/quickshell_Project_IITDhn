import { useMemo, useState } from "react";
import "modules/display_board/styles/kanban_card.css";
import UntickIcon from "assets/icons/untick_icon.svg";
import TickIcon from "assets/icons/tick_icon.svg";
import PropTypes from "prop-types";

const KanbanCard = ({ item, users, priorities }) => {
  const [isTick, setIsTick] = useState(false);
  const { name, available, avatar } = useMemo(() => {
    return users.find((user) => user.id === item.userId);
  }, [item.userId, users]);

  const priorityIcon = useMemo(() => {
    return priorities.find((priority) => priority.id === item.priority)?.icon;
  }, [item.priority, priorities]);

  return (
    <div className="kanbanCard__root">
      <div className="kanbanCard__row">
        <div className="kanbanCard__id">{item.id}</div>
        <div
          className="kanbanCard__userAvatar"
          style={{
            background: avatar.backgroundColor,
            color: avatar.textColor,
          }}
        >
          {name[0]}
          <span
            className={`kanbanCard__userAvatarStatus ${
              available ? "available" : ""
            }`}
          />
        </div>
      </div>
      <h6 className="kanbanCard__title">
        <button
          type="button"
          onClick={() => setIsTick((preValue) => !preValue)}
          className="kanbanCard__tickButton"
        >
          <img src={isTick ? TickIcon : UntickIcon} alt="" />
        </button>
        {item.title}
      </h6>
      <div className="kanbanCard__row">
        <img
          src={priorityIcon}
          className="kanbanCard__priority"
          alt="Priority Icon"
        />
        {item.tag.map((tag) => (
          <div className="kanbanCard__tag" key={tag.replace(" ")}>
            <div className="kanbanCard__tagIcon" />
            <div className="kanbanCard__tagText">{tag}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

KanbanCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tag: PropTypes.arrayOf(PropTypes.string.isRequired),
    userId: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired,
  }).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      available: PropTypes.bool.isRequired,
    })
  ).isRequired,
  priorities: PropTypes.array.isRequired,
};

export default KanbanCard;
