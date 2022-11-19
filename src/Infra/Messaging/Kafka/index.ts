import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "newUser-server",
  brokers: ["kafka:9092"],
})