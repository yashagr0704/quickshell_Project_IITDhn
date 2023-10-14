import useQueryParam from "lib/Routing/hooks/useQueryParam";
import Header from "../components/Header";
import "../styles/display_board.root.css";
import { useCallback } from "react";
import useFetchKanbanService from "../services/FetchKanban.service";
import KanbanCard from "../components/KanbanCard";
import { priorities } from "../constants/data.constants";
import { Groping } from "../constants/sorting.constants";
import AddIcon from "assets/icons/add_icon.svg";
import MoreOptionsIcon from "assets/icons/more_options.svg";

const DisplayBoardPage = () => {
  const [groupingParam, setGroupingParam] = useQueryParam({
    paramName: "grouping",
    paramPlaceholder: "status",
  });

  const [orderingParam, setOrderingParam] = useQueryParam({
    paramName: "ordering",
    paramPlaceholder: "status",
  });

  const { boardState, users } = useFetchKanbanService({
    groping: groupingParam,
    ordering: orderingParam,
  });

  const onSortStateChange = useCallback(
    (newSortState) => {
      setGroupingParam(newSortState.grouping);
      setOrderingParam(newSortState.ordering);
    },
    [setGroupingParam, setOrderingParam]
  );

  return (
    <div className="displayBoard__root">
      <Header
        onSortStateChange={onSortStateChange}
        sortStateValue={{ grouping: groupingParam, ordering: orderingParam }}
      />
      <div className="displayBoard__body">
        <main className="displayBoard__main">
          {boardState?.map((sectionItem) => {
            return (
              <section key={sectionItem.id} className="displayBoard__section">
                <div className="displayBoard__sectionHeader">
                  {groupingParam === Groping.USER ? (
                    <div
                      className="displayBoard__sectionHeaderUserAvatar"
                      style={{
                        background: sectionItem?.avatar?.backgroundColor,
                        color: sectionItem?.avatar?.textColor,
                      }}
                    >
                      {sectionItem.label[0]}
                    </div>
                  ) : (
                    <img
                      src={sectionItem?.icon}
                      alt=""
                      className="displayBoard__sectionHeaderIcon"
                    />
                  )}
                  <h3 className="displayBoard__sectionTitle">
                    {sectionItem.label}
                  </h3>
                  <small className="displayBoard__sectionHeaderLength">
                    {sectionItem?.tickets?.length}
                  </small>

                  <button
                    type="button"
                    className="displayBoard__sectionHeaderButton"
                  >
                    <img src={AddIcon} alt="AddIcon" />
                  </button>

                  <button
                    type="button"
                    className="displayBoard__sectionHeaderButton"
                  >
                    <img src={MoreOptionsIcon} alt="MoreOptionsIcon" />
                  </button>
                </div>
                <div className="displayBoard__sectionContent">
                  {sectionItem?.tickets?.length === 0 ? (
                    <h6 className="displayBoard__sectionContentEmpty">
                      No tickets
                    </h6>
                  ) : (
                    sectionItem?.tickets?.map((ticketItem) => {
                      return (
                        <KanbanCard
                          key={ticketItem.id}
                          item={ticketItem}
                          priorities={priorities}
                          users={users}
                        />
                      );
                    })
                  )}
                </div>
              </section>
            );
          })}
        </main>
      </div>
    </div>
  );
};

export default DisplayBoardPage;
