import React, { useEffect } from "react";
import { Button, Card, Modal, Typography, Dropdown, Menu } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { red } from "@ant-design/colors";
import styled from "styled-components";
import BaseTooltip from "../shared/BaseTooltip";
import Checklist from "../assets/arrows.svg";
import List from "../assets/lists.svg";
import Clipboard from "../assets/clipboard.svg";

const StyledCard = styled(Card)`
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: ${({ $isDragging }) => ($isDragging ? "#fafafa" : "#fff")};
`;

const TaskboardItemCardTitle = styled(Typography.Title)`
  white-space: pre-wrap;
  margin-right: 0.25rem;
`;

const DeleteMenuItem = styled(Menu.Item)`
  color: ${red.primary};
`;

function TaskboardItemCard({
  item,
  status,
  isDragging,
  onEdit,
  onDelete,
  items,
  itemsByStatus,
  setItemsByStatus,
}) {
  let d = new Date();
  let n = d.toLocaleString();

  useEffect(() => {
    if (status === "In Progress") {
      // setItemsByStatus((current) => (current["In Progress"].startWork = n));
      // console.log("current", itemsByStatus["In Progress"]);
    }
    // console.log("itemsByStatus", itemsByStatus);
    // console.log("item", item);
  }, [itemsByStatus, item, status, setItemsByStatus, n]);

  return (
    <StyledCard
      $isDragging={isDragging}
      size="small"
      title={
        <BaseTooltip key={item.title} overlay={item.title}>
          {/* styled(Typography.Title) throws an error in console about
          forwarding ref in function components.
          Because Typography.Title doesn't accept a ref.
          So, we just placed a span tag here. */}
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TaskboardItemCardTitle level={5} ellipsis={{ rows: 2 }}>
              {item.title}
            </TaskboardItemCardTitle>
          </span>
        </BaseTooltip>
      }
      extra={
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key={item.id}
                icon={<EditOutlined />}
                onClick={() => onEdit(item)}
              >
                Edit
              </Menu.Item>
              <DeleteMenuItem
                icon={<DeleteOutlined />}
                onClick={() =>
                  Modal.confirm({
                    title: "Delete?",
                    content: `Are you sure to delete "${item.title}"?`,
                    onOk: () =>
                      onDelete({
                        status,
                        itemToDelete: item,
                      }),
                  })
                }
              >
                Delete
              </DeleteMenuItem>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button size="small" icon={<MoreOutlined />} />
        </Dropdown>
      }
    >
      <BaseTooltip key={item.id}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }}>
            {item.timestamp ?? n}
          </Typography.Paragraph>
          <div className="">
            {status === "In Progress" ? (
              <img style={{ width: 30 }} src={Checklist} alt="progress" />
            ) : null}
            {status === "To Do" ? (
              <img style={{ width: 24 }} src={List} alt="progress" />
            ) : null}
            {status === "Done" ? (
              <img style={{ width: 28 }} src={Clipboard} alt="progress" />
            ) : null}
          </div>
        </div>
      </BaseTooltip>
      <BaseTooltip key={item.title} overlay={item.description}>
        <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }}>
          {item.description}
        </Typography.Paragraph>
      </BaseTooltip>
    </StyledCard>
  );
}

export default TaskboardItemCard;
