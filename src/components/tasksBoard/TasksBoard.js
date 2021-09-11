import { DragDropContext } from "react-beautiful-dnd";
import { useMemo, useState } from "react";
import produce from "immer";
import styled from "styled-components";
// eslint-disable-next-line no-unused-vars
import { TaskboardItemStatus } from "./TaskboardTypes";
import TaskboardItemModal from "./TasksBoardItemModal";
import TaskboardCol from "./TaskboardCol";
import { useSyncedState } from "../shared/SharedHooks";

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
  const [itemsByStatus, setItemsByStatus] = useSyncedState(
    "itemsByStatus",
    defaultItems
  );

  const handleDragEnd = ({ source, destination }) => {
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
    }),
    [itemToEdit]
  );

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <TaskboardRoot>
          <TaskboardContent>
            {Object.values(TaskboardItemStatus).map((status) => (
              <TaskboardCol
                key={status}
                status={status}
                items={itemsByStatus[status]}
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
      <TaskboardItemModal
        visible={isModalVisible}
        onCancel={closeTaskItemModal}
        onOk={(values) => {
          setItemsByStatus((current) =>
            produce(current, (draft) => {
              console.log("current", current);
              if (itemToEdit) {
                // Editing existing item
                const draftItem = Object.values(draft)
                  .flatMap((items) => items)
                  .find((item) => item.id === itemToEdit.id);
                if (draftItem) {
                  draftItem.timestamp = n;
                  draftItem.title = values.title;
                  draftItem.description = values.description;
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
