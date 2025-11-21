import { createReadStream } from "fs";
import { parse } from "csv-parse";

const taskListFilePath = new URL("./task-list.csv", import.meta.url);
const taskListStream = createReadStream(taskListFilePath);

const fileParse = parse({
  delimiter: ",",
  skipEmptyLines: true,
  fromLine: 2
})

const importTaskListFile = async () => {
  const tasksLines = taskListStream.pipe(fileParse);

  for await (const task of tasksLines) {
    const [title, description] = task;

    await fetch("http://localhost:8080/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description })
    })
  }

  console.log("✅ All tasks was imported");
}

importTaskListFile()