const readline = require("readline");
const createHashTable = require("./hashTable");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const hashTable = createHashTable();

const showMenu = () => {
  console.log("\nSelect an option:");
  console.log("1 - Add new entry");
  console.log("2 - Remove");
  console.log("3 - Count");
  console.log("4 - Contains");
  console.log("5 - Exit");
};

const promptUser = () => {
  showMenu();
  rl.question("Enter your choice: ", (choice) => {
    if (choice === "1") {
      rl.question("Enter key: ", (key) => {
        rl.question("Enter value: ", (value) => {
          try {
            hashTable.put(key, value);
          } catch (error) {
            console.error(`Error: ${error.message}`);
          }
          hashTable.displayTable();
          promptUser();
        });
      });
    } else if (choice === "2") {
      rl.question("Enter key to remove: ", (key) => {
        try {
          hashTable.remove(key);
        } catch (error) {
          console.error(`Error: ${error.message}`);
        }
        hashTable.displayTable();
        promptUser();
      });
    } else if (choice === "3") {
      try {
        hashTable.count();
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
      promptUser();
    } else if (choice === "4") {
      rl.question("Enter key to check: ", (key) => {
        try {
          hashTable.contains(key);
        } catch (error) {
          console.error(`Error: ${error.message}`);
        }
        promptUser();
      });
    } else if (choice === "5") {
      rl.close();
    } else {
      console.log("Invalid choice. Please select a valid option.");
      promptUser();
    }
  });
};

console.log("Welcome to the Hash Table Console App.");
promptUser();

rl.on("close", () => {
  console.log("Thank you!");
  process.exit(0);
});
