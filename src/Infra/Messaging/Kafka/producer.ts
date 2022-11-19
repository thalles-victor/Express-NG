import { kafka } from "./";

export const producer = kafka.producer({
  allowAutoTopicCreation: true,
})

producer.connect()
  .then(() => {
    console.log("API connect as producer")
  })
  .catch((error) => {
    console.log("Error while producer is connect ", error)
  })