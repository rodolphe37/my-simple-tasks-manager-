/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Modal, Typography, Dropdown, Menu, Form } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { red } from "@ant-design/colors";
import styled from "styled-components";
import BaseTooltip from "../shared/BaseTooltip";
import Checklist from "../assets/arrows.svg";
import List from "../assets/lists.svg";
import Clipboard from "../assets/clipboard.svg";
import { useRecoilState } from "recoil";
import timeAllCardsAtom from "../../statesManager/atoms/timeAllCardsAtom";
import TimerEndIcon from "../assets/timer.svg";
import StartIcon from "../assets/start.svg";
import cumulTimeCardsTaskAtom from "../../statesManager/atoms/cumulTimeCardsTaskAtom";
import { v4 as uuidv4 } from "uuid";
import completCardsTimeArrayAtom from "../../statesManager/atoms/completCardsTimeArrayAtom";
import projectDoneAtom from "../../statesManager/atoms/projectDoneAtom";

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
  const [timeForCard, setTimeForCard] = useState("");
  const [totalTimeToSeconds, setTotalTimeToSeconds] = useState(
    JSON.parse(localStorage.getItem("totalTimeInSeconds")) ?? []
  );
  const [cumuledTimeCards, setCumuledTimeCards] = useRecoilState(
    completCardsTimeArrayAtom
  );
  const [completCardsTimeArray, setCompletCardsTimeArray] =
    useRecoilState(timeAllCardsAtom);
  const [timeAllCards, setTimeAllCards] = useState([]);

  const [startWorkState, setStartWorkState] = useState(
    localStorage.getItem("startTimeWork") ?? ""
  );
  const [stopWorkState, setStopWorkState] = useState(
    localStorage.getItem("stopTimeWork") ?? ""
  );
  const [cardId, setCardId] = useState(0);
  const [UniqueUuid, setUniqueUuid] = useState();

  let cardIdFromTimeAll = timeAllCards.map((res) =>
    JSON.parse(`${res.cardId}`)
  );

  const [projectDone, setProjectDone] = useRecoilState(projectDoneAtom);

  // USE UUIDV4 FOR GENERATE unique id
  useEffect(() => {
    if (
      itemsByStatus["In Progress"].length === 0 &&
      itemsByStatus["To Do"].length === 0 &&
      itemsByStatus["Done"].length !== 0
    ) {
      setProjectDone(true);
    } else {
      setProjectDone(false);
    }
    console.log("projectDone", projectDone);
  }, [setProjectDone, itemsByStatus, projectDone]);

  useEffect(() => {
    // console.log("timestamp", item.timestamp);
    if (item.timestamp === undefined) {
      setTimeForCard(n);
    }
    localStorage.setItem("timeStamp", timeForCard);
    // console.log("itms status", itemsByStatus["Done"].length);
    if (status === "In Progress") {
      setStartWorkState(n);
      setTimeAllCards([
        { cardId: item.id, cardTitle: item.title, start: `${n}`, stop: "" },
      ]);
      localStorage.setItem("startTimeWork", startWorkState);
      localStorage.setItem("timeAllCards", JSON.stringify(timeAllCards));
    }

    if (!projectDone) {
      if (status === "Done") {
        // const re = timeAllCards.map((res) => res.start);
        setCardId(cardIdFromTimeAll);
        setStopWorkState(n);
        setStartWorkState(localStorage.getItem("startTimeWork"));

        setTimeAllCards([
          {
            cardId: item.id,
            cardTitle: item.title,
            start: startWorkState,
            stop: `${n}`,
            uuid: uuidv4(),
          },
        ]);

        // if (completCardsTimeArray.length === 0) {
        //   setCompletCardsTimeArray(timeAllCards);
        //   setCumuledTimeCards(timeAllCards);
        // }

        if (Number(item.id) !== cardId[0]) {
          setCompletCardsTimeArray((completCardsTimeArray) =>
            completCardsTimeArray.concat(timeAllCards)
          );
          setCumuledTimeCards((cumuledTimeCards) =>
            cumuledTimeCards.concat(timeAllCards)
          );
        }
        // console.log(re[0]);
        // if (totalTimeToSeconds !== null && cumuledTimeCards === null) {
        //   setCumuledTimeCards([totalTimeToSeconds]);
        //   localStorage.removeItem("totalTimeInSeconds");
        // }
        // if (cumuledTimeCards.length >= 1) {
        //   setCumuledTimeCards((cumuledTimeCards) =>
        //     cumuledTimeCards.concat(totalTimeToSeconds)
        //   );
        //   localStorage.removeItem("totalTimeInSeconds");
        // }

        // console.log(
        //   "cumuledTimeCards",
        //   cumuledTimeCards.map((res) => res.cardId)
        // );
        // console.log("item id", Number(item.id));
        // console.log("totalCardsTime id", cardId[0]);
        // console.log(
        //   "timeAllCards[0].id",
        //   timeAllCards.map((res) => res.id)
        // );
        localStorage.setItem(
          "completCardsTimeArray",
          JSON.stringify(completCardsTimeArray)
        );
        // localStorage.setItem(
        //   "cumulTimeCardsTask",
        //   JSON.stringify(cumuledTimeCards)
        // );

        if (!stopWorkState) {
          localStorage.setItem("stopTimeWork", stopWorkState);
        }
        localStorage.setItem("timeAllCards", JSON.stringify(timeAllCards));

        return () => {
          // localStorage.removeItem("totalTimeInSeconds");
        };
      }
    }

    if (itemsByStatus["In Progress"].length === 0) {
      localStorage.removeItem("startTimeWork");
      localStorage.removeItem("timeAllCards");
    }

    if (itemsByStatus["Done"].length === 0) {
      // localStorage.removeItem("totalTimeInSeconds");
      localStorage.removeItem("stopTimeWork");
    }

    if (JSON.parse(localStorage.getItem("timeAllCards")) !== null) {
      setTimeAllCards((prevState) => prevState, timeAllCards);
    }

    return () => {
      // localStorage.removeItem("startTimeWork");
      localStorage.removeItem("stopTimeWork");
      localStorage.removeItem("allCarsTime");
    };

    // console.log("itemsByStatus", itemsByStatus);
    // console.log("item", item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    status,
    startWorkState,
    stopWorkState,
    completCardsTimeArray,
    cumuledTimeCards,
  ]);

  useEffect(() => {
    // console.log("compar id", item.id === timeAllCards.id);

    // if (totalTimeToSeconds !== null && status === "Done") {
    //   localStorage.setItem(
    //     "totalTimeInSeconds",
    //     JSON.stringify(totalTimeToSeconds)
    //   );
    // }

    if (startWorkState && stopWorkState) {
      totalTimeAddition();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completCardsTimeArray, timeAllCards]);

  const totalTimeAddition = () => {
    const numberKeeped = 8;

    const startTask = startWorkState;
    const hoursToMinStartTask = startTask.substring(
      startTask.length - numberKeeped
    );
    const stopTask = stopWorkState;
    const hoursToMinStopTask = stopTask.substring(
      stopTask.length - numberKeeped
    );
    // console.log("startTask", hoursToMinStartTask);
    // console.log("stopTask", hoursToMinStopTask);

    function hmsToSecondsOnly(str) {
      let p = str.split(":"),
        s = 0,
        m = 1;
      while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
      }
      return s;
    }
    const startTaskResult = hmsToSecondsOnly(hoursToMinStartTask);
    const stopTaskResult = hmsToSecondsOnly(hoursToMinStopTask);
    // console.log("result :", startTaskResult);
    // console.log("result :", stopTaskResult);

    // setTotalTimeToSeconds((totalTimeToSeconds) =>
    //   totalTimeToSeconds.concat({
    //     cardId: item.id,
    //     totalTime: stopTaskResult - startTaskResult,
    //   })
    // );

    setTotalTimeToSeconds({
      cardId: item.id,
      totalTime: stopTaskResult - startTaskResult,
      uuid: UniqueUuid,
    });
  };

  // useEffect(() => {

  // }, [cumuledTimeCards, totalTimeToSeconds]);

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
            <TaskboardItemCardTitle
              key={uuidv4()}
              level={5}
              ellipsis={{ rows: 2 }}
            >
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
                key={uuidv4()}
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
      <BaseTooltip>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography.Paragraph
            key={uuidv4()}
            type="secondary"
            ellipsis={{ rows: 2 }}
          >
            {item.timestamp ?? "edit to set the Date/time"}
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
        <Typography.Paragraph
          key={uuidv4()}
          type="secondary"
          ellipsis={{ rows: 2 }}
        >
          {item.description}
        </Typography.Paragraph>
      </BaseTooltip>
      {status === "In Progress" ? (
        <BaseTooltip overlay={item.startWork}>
          <Form>
            <hr />
            <div
              style={{
                height: "20px",
              }}
            >
              <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }}>
                <Form.Item
                  style={{ fontSize: 11 }}
                  shouldUpdate={(prevValues, curValues) =>
                    prevValues.additional !== curValues.additional
                  }
                >
                  {() => {
                    return (
                      <Form.Item key={uuidv4()}>
                        <img
                          style={{ width: 21, marginRight: 20 }}
                          src={StartIcon}
                          alt=""
                        />{" "}
                        {startWorkState}
                      </Form.Item>
                    );
                  }}
                </Form.Item>
              </Typography.Paragraph>
            </div>
          </Form>
        </BaseTooltip>
      ) : null}
      <div
        // key={item.id}
        style={
          status === "Done"
            ? { border: "1px dotted gray", padding: 8 }
            : { display: "none" }
        }
      >
        {status === "Done" ? (
          <BaseTooltip overlay={item.stopWork}>
            {completCardsTimeArray.map((res) => (
              <Form key={res.uuid} className="myForm">
                {item.id === res.cardId ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-around",
                      height: "20px",
                    }}
                  >
                    {res.start && res.stop && (
                      <Fragment>
                        <Form.Item key={res.uuid}>
                          <p style={{ fontSize: 10 }}>{res.start}</p>
                        </Form.Item>
                        <Typography.Paragraph
                          type="secondary"
                          ellipsis={{ rows: 2 }}
                        >
                          <Form.Item
                            shouldUpdate={(prevValuesStop, curValuesStop) =>
                              prevValuesStop.additional !==
                              curValuesStop.additional
                            }
                          >
                            {() => {
                              return (
                                <Form.Item key={res.uuid}>
                                  <p style={{ fontSize: 10 }}>{res.stop}</p>
                                </Form.Item>
                              );
                            }}
                          </Form.Item>
                        </Typography.Paragraph>
                      </Fragment>
                    )}
                  </div>
                ) : null}
              </Form>
            ))}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-around",
              }}
            >
              <img style={{ width: 28 }} src={StartIcon} alt="" />
              <img style={{ width: 28 }} src={TimerEndIcon} alt="" />
            </div>
          </BaseTooltip>
        ) : null}
      </div>
    </StyledCard>
  );
}

export default TaskboardItemCard;

//  eslint-disable no-unused-vars
// import React, { Fragment, useEffect, useState } from "react";
// import { Button, Card, Modal, Typography, Dropdown, Menu, Form } from "antd";
// import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
// import { red } from "@ant-design/colors";
// import styled from "styled-components";
// import BaseTooltip from "../shared/BaseTooltip";
// import Checklist from "../assets/arrows.svg";
// import List from "../assets/lists.svg";
// import Clipboard from "../assets/clipboard.svg";
// import { useRecoilState } from "recoil";
// import timeAllCardsAtom from "../../statesManager/atoms/timeAllCardsAtom";
// import TimerEndIcon from "../assets/timer.svg";
// import StartIcon from "../assets/start.svg";
// import cumulTimeCardsTaskAtom from "../../statesManager/atoms/cumulTimeCardsTaskAtom";
// import { v4 as uuidv4 } from "uuid";
// import completCardsTimeArrayAtom from "../../statesManager/atoms/completCardsTimeArrayAtom";

// const StyledCard = styled(Card)`
//   margin: 0.5rem;
//   padding: 0.5rem;
//   background-color: ${({ $isDragging }) => ($isDragging ? "#fafafa" : "#fff")};
// `;

// const TaskboardItemCardTitle = styled(Typography.Title)`
//   white-space: pre-wrap;
//   margin-right: 0.25rem;
// `;

// const DeleteMenuItem = styled(Menu.Item)`
//   color: ${red.primary};
// `;

// function TaskboardItemCard({
//   item,
//   status,
//   isDragging,
//   onEdit,
//   onDelete,
//   items,
//   itemsByStatus,
//   setItemsByStatus,
// }) {
//   let d = new Date();
//   let n = d.toLocaleString();
//   const [timeForCard, setTimeForCard] = useState("");
//   const [totalTimeToSeconds, setTotalTimeToSeconds] = useState(
//     JSON.parse(localStorage.getItem("totalTimeInSeconds")) ?? []
//   );
//   const [cumuledTimeCards, setCumuledTimeCards] = useRecoilState(
//     completCardsTimeArrayAtom
//   );
//   const [completCardsTimeArray, setCompletCardsTimeArray] = useRecoilState(
//     completCardsTimeArrayAtom
//   );
//   const [timeAllCards, setTimeAllCards] = useRecoilState(timeAllCardsAtom);

//   const [startWorkState, setStartWorkState] = useState(
//     localStorage.getItem("startTimeWork") ?? ""
//   );
//   const [stopWorkState, setStopWorkState] = useState(
//     localStorage.getItem("stopTimeWork") ?? ""
//   );
//   const [cardId, setCardId] = useState(0);
//   const [UniqueUuid, setUniqueUuid] = useState();

//   let cardIdFromTimeAll = timeAllCards.map((res) =>
//     JSON.parse(`${res.cardId}`)
//   );

//   // USE UUIDV4 FOR GENERATE unique id
//   useEffect(() => {
//     setUniqueUuid(uuidv4());

//     return () => {
//       setUniqueUuid("");
//     };
//   }, [status]);

//   useEffect(() => {
//     // console.log("timestamp", item.timestamp);
//     if (item.timestamp === undefined) {
//       setTimeForCard(n);
//     }
//     localStorage.setItem("timeStamp", timeForCard);
//     // console.log("itms status", itemsByStatus["Done"].length);
//     if (status === "In Progress") {
//       setStartWorkState(n);
//       setTimeAllCards([
//         { cardId: item.id, cardTitle: item.title, start: `${n}`, stop: "" },
//       ]);
//       localStorage.setItem("startTimeWork", startWorkState);
//       localStorage.setItem("timeAllCards", JSON.stringify(timeAllCards));
//     }
//     if (status === "Done") {
//       const re = timeAllCards.map((res) => res.start);
//       setCardId(cardIdFromTimeAll);
//       setStopWorkState(n);
//       setStartWorkState(localStorage.getItem("startTimeWork"));

//       setTimeAllCards([
//         {
//           cardId: item.id,
//           cardTitle: item.title,
//           start: startWorkState,
//           stop: `${n}`,
//           uuid: UniqueUuid,
//         },
//       ]);

//       if (completCardsTimeArray.length === 0) {
//         setCompletCardsTimeArray(timeAllCards);
//         setCumuledTimeCards(timeAllCards);
//       }

//       if (Number(item.id) !== cardId[0]) {
//         setCompletCardsTimeArray((completCardsTimeArray) =>
//           completCardsTimeArray.concat(timeAllCards)
//         );
//         setCumuledTimeCards((cumuledTimeCards) =>
//           cumuledTimeCards.concat(timeAllCards)
//         );
//       }
//       // console.log(re[0]);
//       // if (totalTimeToSeconds !== null && cumuledTimeCards === null) {
//       //   setCumuledTimeCards([totalTimeToSeconds]);
//       //   localStorage.removeItem("totalTimeInSeconds");
//       // }
//       // if (cumuledTimeCards.length >= 1) {
//       //   setCumuledTimeCards((cumuledTimeCards) =>
//       //     cumuledTimeCards.concat(totalTimeToSeconds)
//       //   );
//       //   localStorage.removeItem("totalTimeInSeconds");
//       // }

//       // console.log(
//       //   "cumuledTimeCards",
//       //   cumuledTimeCards.map((res) => res.cardId)
//       // );
//       // console.log("item id", Number(item.id));
//       // console.log("totalCardsTime id", cardId[0]);
//       // console.log(
//       //   "timeAllCards[0].id",
//       //   timeAllCards.map((res) => res.id)
//       // );
//       localStorage.setItem(
//         "completCardsTimeArray",
//         JSON.stringify(completCardsTimeArray)
//       );
//       // localStorage.setItem(
//       //   "cumulTimeCardsTask",
//       //   JSON.stringify(cumuledTimeCards)
//       // );

//       if (!stopWorkState) {
//         localStorage.setItem("stopTimeWork", stopWorkState);
//       }
//       localStorage.setItem("timeAllCards", JSON.stringify(timeAllCards));

//       return () => {
//         // localStorage.removeItem("totalTimeInSeconds");
//       };
//     }

//     if (itemsByStatus["In Progress"].length === 0) {
//       localStorage.removeItem("startTimeWork");
//       localStorage.removeItem("timeAllCards");
//     }

//     if (itemsByStatus["Done"].length === 0) {
//       // localStorage.removeItem("totalTimeInSeconds");
//       localStorage.removeItem("stopTimeWork");
//     }

//     if (JSON.parse(localStorage.getItem("timeAllCards")) !== null) {
//       setTimeAllCards((prevState) => prevState, timeAllCards);
//     }

//     return () => {
//       // localStorage.removeItem("startTimeWork");
//       localStorage.removeItem("stopTimeWork");
//       localStorage.removeItem("allCarsTime");
//     };

//     // console.log("itemsByStatus", itemsByStatus);
//     // console.log("item", item);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [
//     status,
//     startWorkState,
//     stopWorkState,
//     completCardsTimeArray,
//     cumuledTimeCards,
//   ]);

//   useEffect(() => {
//     // console.log("compar id", item.id === timeAllCards.id);

//     // if (totalTimeToSeconds !== null && status === "Done") {
//     //   localStorage.setItem(
//     //     "totalTimeInSeconds",
//     //     JSON.stringify(totalTimeToSeconds)
//     //   );
//     // }

//     if (startWorkState && stopWorkState) {
//       totalTimeAddition();
//     }

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [completCardsTimeArray, timeAllCards]);

//   const totalTimeAddition = () => {
//     const numberKeeped = 8;

//     const startTask = startWorkState;
//     const hoursToMinStartTask = startTask.substring(
//       startTask.length - numberKeeped
//     );
//     const stopTask = stopWorkState;
//     const hoursToMinStopTask = stopTask.substring(
//       stopTask.length - numberKeeped
//     );
//     // console.log("startTask", hoursToMinStartTask);
//     // console.log("stopTask", hoursToMinStopTask);

//     function hmsToSecondsOnly(str) {
//       let p = str.split(":"),
//         s = 0,
//         m = 1;
//       while (p.length > 0) {
//         s += m * parseInt(p.pop(), 10);
//         m *= 60;
//       }
//       return s;
//     }
//     const startTaskResult = hmsToSecondsOnly(hoursToMinStartTask);
//     const stopTaskResult = hmsToSecondsOnly(hoursToMinStopTask);
//     // console.log("result :", startTaskResult);
//     // console.log("result :", stopTaskResult);

//     // setTotalTimeToSeconds((totalTimeToSeconds) =>
//     //   totalTimeToSeconds.concat({
//     //     cardId: item.id,
//     //     totalTime: stopTaskResult - startTaskResult,
//     //   })
//     // );

//     setTotalTimeToSeconds({
//       cardId: item.id,
//       totalTime: stopTaskResult - startTaskResult,
//       uuid: UniqueUuid,
//     });
//   };

//   // useEffect(() => {

//   // }, [cumuledTimeCards, totalTimeToSeconds]);

//   return (
//     <StyledCard
//       $isDragging={isDragging}
//       size="small"
//       title={
//         <BaseTooltip overlay={item.title}>
//           {/* styled(Typography.Title) throws an error in console about
//           forwarding ref in function components.
//           Because Typography.Title doesn't accept a ref.
//           So, we just placed a span tag here. */}
//           <span
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <TaskboardItemCardTitle
//               key={item.id}
//               level={5}
//               ellipsis={{ rows: 2 }}
//             >
//               {item.title}
//             </TaskboardItemCardTitle>
//           </span>
//         </BaseTooltip>
//       }
//       extra={
//         <Dropdown
//           overlay={
//             <Menu>
//               <Menu.Item
//                 key={item.id}
//                 icon={<EditOutlined />}
//                 onClick={() => onEdit(item)}
//               >
//                 Edit
//               </Menu.Item>
//               <DeleteMenuItem
//                 icon={<DeleteOutlined />}
//                 onClick={() =>
//                   Modal.confirm({
//                     title: "Delete?",
//                     content: `Are you sure to delete "${item.title}"?`,
//                     onOk: () =>
//                       onDelete({
//                         status,
//                         itemToDelete: item,
//                       }),
//                   })
//                 }
//               >
//                 Delete
//               </DeleteMenuItem>
//             </Menu>
//           }
//           trigger={["click"]}
//         >
//           <Button size="small" icon={<MoreOutlined />} />
//         </Dropdown>
//       }
//     >
//       <BaseTooltip>
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }}>
//             {item.timestamp ?? "edit to set the Date/time"}
//           </Typography.Paragraph>
//           <div className="">
//             {status === "In Progress" ? (
//               <img style={{ width: 30 }} src={Checklist} alt="progress" />
//             ) : null}
//             {status === "To Do" ? (
//               <img style={{ width: 24 }} src={List} alt="progress" />
//             ) : null}
//             {status === "Done" ? (
//               <img style={{ width: 28 }} src={Clipboard} alt="progress" />
//             ) : null}
//           </div>
//         </div>
//       </BaseTooltip>
//       <BaseTooltip overlay={item.description}>
//         <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }}>
//           {item.description}
//         </Typography.Paragraph>
//       </BaseTooltip>
//       {status === "In Progress" ? (
//         <BaseTooltip overlay={item.startWork}>
//           <Form>
//             <hr />
//             <div
//               style={{
//                 height: "20px",
//               }}
//             >
//               <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }}>
//                 <Form.Item
//                   style={{ fontSize: 11 }}
//                   shouldUpdate={(prevValues, curValues) =>
//                     prevValues.additional !== curValues.additional
//                   }
//                 >
//                   {() => {
//                     return (
//                       <Form.Item>
//                         <img
//                           style={{ width: 21, marginRight: 20 }}
//                           src={StartIcon}
//                           alt=""
//                         />{" "}
//                         {startWorkState}
//                       </Form.Item>
//                     );
//                   }}
//                 </Form.Item>
//               </Typography.Paragraph>
//             </div>
//           </Form>
//         </BaseTooltip>
//       ) : null}
//       <div
//         // key={item.id}
//         style={
//           status === "Done"
//             ? { border: "1px dotted gray", padding: 8 }
//             : { display: "none" }
//         }
//       >
//         {status === "Done" ? (
//           <BaseTooltip overlay={item.stopWork}>
//             {completCardsTimeArray.map((res) => (
//               <Form key={res.uuid} className="myForm">
//                 {item.id === res.cardId ? (
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "flex-start",
//                       justifyContent: "space-around",
//                       height: "20px",
//                     }}
//                   >
//                     {res.start && res.stop && (
//                       <Fragment>
//                         <Form.Item key={res.cardId}>
//                           <p style={{ fontSize: 10 }}>{res.start}</p>
//                         </Form.Item>
//                         <Typography.Paragraph
//                           type="secondary"
//                           ellipsis={{ rows: 2 }}
//                         >
//                           <Form.Item
//                             shouldUpdate={(prevValuesStop, curValuesStop) =>
//                               prevValuesStop.additional !==
//                               curValuesStop.additional
//                             }
//                           >
//                             {() => {
//                               return (
//                                 <Form.Item>
//                                   <p style={{ fontSize: 10 }}>{res.stop}</p>
//                                 </Form.Item>
//                               );
//                             }}
//                           </Form.Item>
//                         </Typography.Paragraph>
//                       </Fragment>
//                     )}
//                   </div>
//                 ) : null}
//               </Form>
//             ))}
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "flex-start",
//                 justifyContent: "space-around",
//               }}
//             >
//               <img style={{ width: 28 }} src={StartIcon} alt="" />
//               <img style={{ width: 28 }} src={TimerEndIcon} alt="" />
//             </div>
//           </BaseTooltip>
//         ) : null}
//       </div>
//     </StyledCard>
//   );
// }

// export default TaskboardItemCard;
