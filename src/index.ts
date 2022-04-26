import { dataProcessing } from "./dataProcessing";


const fs = require("fs");

 const main = () => {
  console.log("Welcome to the challenge.");

  const data = fs.readFileSync(0, {
    encoding: "utf8",
    flag: "r",
  });

  dataProcessing(data);
}

 
main();
