import React, { useEffect, useState } from "react";
import { Button, Card, Modal, Typography, Dropdown, Menu, Form } from "antd";
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
  const [startTimeToSeconds, setStartTimeToSeconds] = useState("");
  const [startWorkState, setStartWorkState] = useState(
    JSON.stringify(localStorage.getItem("startTimeWork")) ?? ""
  );
  const [stopWorkState, setStopWorkState] = useState("");

  const [timeAllCards, setTimeAllCards] = useState(
    JSON.parse(localStorage.getItem("timeAllCards")) ?? [
      {
        cardId: item.id,
        cardTitle: item.title,
        start: "",
        stop: "",
      },
    ]
  );

  useEffect(() => {
    if (status === "In Progress") {
      setStartWorkState(n);
      setTimeAllCards([
        { cardId: item.id, cardTitle: item.title, start: `${n}`, stop: "" },
      ]);
      localStorage.setItem("startTimeWork", startWorkState);
      localStorage.setItem("timeAllCards", JSON.stringify(timeAllCards));
    }
    if (status === "Done") {
      setStopWorkState(n);
      setStartWorkState(localStorage.getItem("startTimeWork"));
      setTimeAllCards([
        {
          cardId: item.id,
          cardTitle: item.title,
          start: startWorkState,
          stop: `${n}`,
        },
      ]);
      localStorage.setItem("stopTimeWork", stopWorkState);
      localStorage.setItem("timeAllCards", JSON.stringify(timeAllCards));
    }
    if (JSON.parse(localStorage.getItem("timeAllCards")) !== null) {
      setTimeAllCards((prevState) => prevState, timeAllCards);
    }
    return () => {
      // localStorage.removeItem("startTimeWork");
      localStorage.removeItem("stopTimeWork");
    };
    // console.log("itemsByStatus", itemsByStatus);
    // console.log("item", item);
  }, [status, item, startWorkState, stopWorkState]);

  useEffect(() => {
    var val = timeAllCards.map((res, id) => res.start);
    setStartTimeToSeconds(String(val));
    // var response = val.substring(val.indexOf(":"));

    console.log("response", val);
    // const stopTime = timeAllCards.map((res) =>
    //   res.stop?.substring(res.stop.indexOf(",", 1)).split(",")
    // );

    // const startTime = timeAllCards.map((res) =>
    //   res.start?.substring(res.start.indexOf(",", 1)).split(",")
    // );

    // var sta = startTime; // split it at the colons

    // // minutes are worth 60 seconds. Hours are worth 60 minutes.
    // var secondsStart = +sta[0] * 60 * 60 + +sta[1] * 60 + +sta[2];

    // var sto = stopTime; // split it at the colons

    // // minutes are worth 60 seconds. Hours are worth 60 minutes.
    // var secondsStop = +sto[0] * 60 * 60 + +sto[1] * 60 + +sto[2];
    // function hmsToSecondsOnly(str) {
    //   var p = str.split(":"),
    //     s = 0,
    //     m = 1;

    //   while (p.length > 0) {
    //     s += m * parseInt(p.pop(), 10);
    //     m *= 60;
    //   }

    //   return s;
    // }

    // console.log("secondsStart", startTime);
    // console.log("secondsStop", sto);
  }, []);

  return (
    <StyledCard
      $isDragging={isDragging}
      size="small"
      title={
        <BaseTooltip overlay={item.title}>
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
              <Menu.Item icon={<EditOutlined />} onClick={() => onEdit(item)}>
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
      <BaseTooltip>
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
      <BaseTooltip overlay={item.description}>
        <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }}>
          {item.description}
        </Typography.Paragraph>
      </BaseTooltip>
      {status === "In Progress" ? (
        <BaseTooltip overlay={item.startWork}>
          <Form>
            <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }}>
              <Form.Item
                shouldUpdate={(prevValues, curValues) =>
                  prevValues.additional !== curValues.additional
                }
              >
                {() => {
                  return (
                    <Form.Item label="Start Working">
                      {startWorkState}
                    </Form.Item>
                  );
                }}
              </Form.Item>
            </Typography.Paragraph>
          </Form>
        </BaseTooltip>
      ) : null}
      {status === "Done" ? (
        <BaseTooltip overlay={item.stopWork}>
          <Form.Item label="Start Working:">
            {" "}
            {timeAllCards.map((res) => res.start)}
          </Form.Item>
          <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }}>
            <Form.Item
              shouldUpdate={(prevValuesStop, curValuesStop) =>
                prevValuesStop.additional !== curValuesStop.additional
              }
            >
              {() => {
                return (
                  <Form.Item label="Stop Working">
                    {timeAllCards.map((res) => res.stop)}
                  </Form.Item>
                );
              }}
            </Form.Item>
          </Typography.Paragraph>
        </BaseTooltip>
      ) : null}
    </StyledCard>
  );
}

export default TaskboardItemCard;
