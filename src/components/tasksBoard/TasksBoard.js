import { DragDropContext } from "react-beautiful-dnd";
import { Fragment, useEffect, useMemo, useState } from "react";
import produce from "immer";
import styled from "styled-components";
// eslint-disable-next-line no-unused-vars
import { TaskboardItemStatus } from "./TaskboardTypes";
import TaskboardItemModal from "./TasksBoardItemModal";
import TaskboardCol from "./TaskboardCol";
import { useSyncedState } from "../shared/SharedHooks";
import InfoMessage from "../infoMessage/InfoMessage";
import { useRecoilState } from "recoil";
import closedStateAtom from "../../statesManager/atoms/closedStateAtom";
import TimeTracker from "../timeTracker/TimeTracker";
import automaticTrackTimerAtom from "../../statesManager/atoms/automaticTrackTimerAtom";
import CustomConfirm from "../customConfirm/CustomConfirm";

const generateId = () => Date.now().toString();

const TaskboardRoot = styled.div`
  min-height: 0;
  height: 100%;
  min-width: 800px;
  max-width: 1400px;
  margin: auto;
`;

const TaskboardContent = styled.div`
  height: 100%;
  padding: 0.5rem;
  display: flex;
  justify-content: space-around;
`;

const defaultItems = {
  [TaskboardItemStatus.TO_DO]: [],
  [TaskboardItemStatus.IN_PROGRESS]: [],
  [TaskboardItemStatus.DONE]: [],
};

function Taskboard() {
  // eslint-disable-next-line no-unused-vars
  const [autoTrackTime, setAutoTrackTime] = useRecoilState(
    automaticTrackTimerAtom
  );
  const [itemsByStatus, setItemsByStatus] = useSyncedState(
    "itemsByStatus",
    defaultItems
  );
  const [closed] = useRecoilState(closedStateAtom);
  const { JSalert } = CustomConfirm();

  useEffect(() => {
    console.log("in progress", itemsByStatus["In Progress"].length);
  }, [itemsByStatus]);

  const handleDragEnd = ({ source, destination }) => {
    console.log("destination", destination);
    if (
      itemsByStatus["In Progress"].length === 1 &&
      destination.droppableId === "In Progress"
    ) {
      JSalert();
    } else {
      setItemsByStatus((current) =>
        produce(current, (draft) => {
          // dropped outside the list
          if (!destination) {
            return;
          }
          const [removed] = draft[source.droppableId].splice(source.index, 1);
          draft[destination.droppableId].splice(destination.index, 0, removed);
        })
      );
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [itemToEdit, setItemToEdit] = useState(null);

  const openTaskItemModal = (itemToEdit) => {
    setItemToEdit(itemToEdit);
    setIsModalVisible(true);
  };

  const closeTaskItemModal = () => {
    setItemToEdit(null);
    setIsModalVisible(false);
  };

  const handleDelete = ({ status, itemToDelete }) =>
    setItemsByStatus((current) =>
      produce(current, (draft) => {
        draft[status] = draft[status].filter(
          (item) => item.id !== itemToDelete.id
        );
      })
    );

  // set date for each message
  let d = new Date();
  let n = d.toLocaleString();

  const initialValues = useMemo(
    () => ({
      timestamp: itemToEdit?.timestamp ?? "",
      title: itemToEdit?.title ?? "",
      description: itemToEdit?.description ?? "",
      startWork: 0,
      stopWork: 0,
      totalTime: 0,
    }),
    [itemToEdit]
  );

  const statusOf = Object.values(TaskboardItemStatus).map((status) => status);

  useEffect(() => {
    const syncTrackTime = (values) => {
      setItemsByStatus((current) =>
        produce(current, (draft) => {
          // console.log("current", current);

          // Editing existing item
          const draftItem = Object.values(draft);
          // .flatMap((items) => items)
          // .find((item) => item.id === itemToEdit.id);

          draftItem.startWork = n;
        })
      );
    };
    syncTrackTime();
    // console.log("initialValues", initialValues);
    // console.log("statusOf", statusOf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues, statusOf]);

  return (
    <>
      {localStorage.getItem("completCardsTimeArray") &&
      itemsByStatus["In Progress"].length === 0 &&
      itemsByStatus["Done"].length === 0 ? (
        <Fragment>
          <div className={closed ? "none" : "overlay"}></div>
          <InfoMessage
            type="warning"
            content="You want to delete individual cards working time history?"
          />
        </Fragment>
      ) : null}
      <DragDropContext onDragEnd={handleDragEnd}>
        <TaskboardRoot>
          <TaskboardContent
            style={autoTrackTime ? { paddingBottom: "7em" } : {}}
          >
            {Object.values(TaskboardItemStatus).map((status) => (
              <TaskboardCol
                key={status}
                status={status}
                items={itemsByStatus[status]}
                itemsByStatus={itemsByStatus}
                setItemsByStatus={setItemsByStatus}
                onClickAdd={
                  status === TaskboardItemStatus.TO_DO
                    ? () => openTaskItemModal(null)
                    : undefined
                }
                onEdit={openTaskItemModal}
                onDelete={handleDelete}
              />
            ))}
          </TaskboardContent>
        </TaskboardRoot>
      </DragDropContext>

      {autoTrackTime ? (
        <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <TimeTracker itemsByStatus={itemsByStatus} />
        </div>
      ) : null}

      <TaskboardItemModal
        visible={isModalVisible}
        onCancel={closeTaskItemModal}
        onOk={(values) => {
          setItemsByStatus((current) =>
            produce(current, (draft) => {
              // console.log("current", current);
              if (itemToEdit) {
                // Editing existing item
                const draftItem = Object.values(draft)
                  .flatMap((items) => items)
                  .find((item) => item.id === itemToEdit.id);
                if (draftItem) {
                  draftItem.timestamp = n;
                  draftItem.title = values.title;
                  draftItem.description = values.description;
                  draftItem.startWork = values.startWork;
                }
              } else {
                // Adding new item as "to do"
                draft[TaskboardItemStatus.TO_DO].push({
                  ...values,
                  id: generateId(),
                });
              }
            })
          );
        }}
        initialValues={initialValues}
      />
    </>
  );
}

export default Taskboard;
