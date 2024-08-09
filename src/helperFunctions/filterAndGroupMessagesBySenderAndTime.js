import { eras } from "./eras.js";

const filterAndGroupMessagesBySenderAndTime = async (messages) => {
  // console.log("helper function input: ", messages);
  const timeDifferenceRange = 20;
  if (!messages.length) return [];

  const groupedMessages = [];
  let currentGroup = [
    {
      ...messages[0],
      class: "",
      timestamp_log: new Date(messages[0].timestamp_ms).toLocaleString(
        "en-US",
        { hour: "2-digit", minute: "2-digit" }
      ),
    },
  ];

  for (let i = 1; i < messages.length; i++) {
    // filter reaction messages
    const regex = /^Reacted.*to your message $/;
    const result = regex.test(messages[i].content);
    if (result) continue;

    // sort into eras
    const timestampCurr = messages[i].timestamp_ms;
    for (const era of eras) {
      for (const chapter of era) {
        if (timestampCurr >= chapter.start && timestampCurr <= chapter.end) {
          messages[i]["chapter"] = era[chapter];
          messages[i]["era"] = era;
        }
      }
    }

    // go through grouping logic
    const prevMessageTime = new Date(messages[i - 1].timestamp_ms);
    const currentMessageTime = new Date(messages[i].timestamp_ms);
    const timeDifference = (currentMessageTime - prevMessageTime) / (1000 * 60); // Difference in minutes
    const isSameDay =
      prevMessageTime.toDateString() === currentMessageTime.toDateString();
    const currentTimestampLog = isSameDay
      ? currentMessageTime.toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : currentMessageTime.toLocaleString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

    if (
      messages[i].sender_name === messages[i - 1].sender_name &&
      timeDifference <= timeDifferenceRange &&
      isSameDay
    ) {
      if (currentGroup.length === 1) {
        currentGroup[0].class = "first";
      }
      currentGroup.push({
        ...messages[i],
        class: "middle",
        timestamp_log: null,
      });
    } else {
      if (currentGroup.length > 1) {
        currentGroup[currentGroup.length - 1].class = "last";
      }
      groupedMessages.push(currentGroup);
      currentGroup = [
        { ...messages[i], class: "", timestamp_log: currentTimestampLog },
      ];
    }
  }

  if (currentGroup.length > 1) {
    currentGroup[currentGroup.length - 1].class = "last";
  }
  groupedMessages.push(currentGroup);

  console.log("grouped: ", groupedMessages);
  return groupedMessages;
};

const editTimestampLogs = async (groupedMessages) => {
  // Add the timestamp_log only when there is a difference of 20 minutes or a new day
  for (let i = 1; i < groupedMessages.length; i++) {
    const currentTime = new Date(groupedMessages[i][0].timestamp_ms);
    const prevTime = new Date(
      groupedMessages[i - 1][groupedMessages[i - 1].length - 1].timestamp_ms
    );
    const timeDifference = (currentTime - prevTime) / (1000 * 60); // Difference in minutes
    const isSameDay = prevTime.toDateString() === currentTime.toDateString();

    if (timeDifference >= 20 && isSameDay) {
      groupedMessages[i][0].timestamp_log = currentTime.toLocaleString(
        "en-US",
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      );
    } else if (!isSameDay) {
      groupedMessages[i][0].timestamp_log = currentTime.toLocaleString(
        "en-US",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      );
    } else {
      groupedMessages[i][0].timestamp_log = null;
    }
  }

  console.log(groupedMessages);
  return groupedMessages;
};

// const sortIntoEras = (groupedMessages) => {
//   for (let i; i < groupedMessages.length; i++) {
//     groupedMessages;
//   }
// };

export { filterAndGroupMessagesBySenderAndTime, editTimestampLogs };
