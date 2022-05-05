const fs = require(`fs`);
const http = require(`http`);
const WebSocket = require(`ws`); // npm i ws

const board = [
  [
    "card back",
    "card rank-2 spades",
    "card rank-3 spades",
    "card rank-4 spades",
    "card rank-5 spades",
    "card rank-10 diams",
    "card rank-q diams",
    "card rank-k diams",
    "card rank-a diams",
    "card back",
  ],

  [
    "card rank-6 clubs",
    "card rank-5 clubs",
    "card rank-4 clubs",
    "card rank-3 clubs",
    "card rank-2 clubs",
    "card rank-4 spades",
    "card rank-5 spades",
    "card rank-6 spades",
    "card rank-7 spades",
    "card rank-a clubs",
  ],

  [
    "card rank-7 clubs",
    "card rank-a spades",
    "card rank-2 diams",
    "card rank-3 diams",
    "card rank-4 diams",
    "card rank-k clubs",
    "card rank-q clubs",
    "card rank-10 clubs",
    "card rank-8 spades",
    "card rank-k clubs",
  ],

  [
    "card rank-8 clubs",
    "card rank-k spades",
    "card rank-6 clubs",
    "card rank-5 clubs",
    "card rank-4 clubs",
    "card rank-9 hearts",
    "card rank-8 hearts",
    "card rank-9 clubs",
    "card rank-9 spades",
    "card rank-6 spades",
  ],

  [
    "card rank-9 clubs",
    "card rank-q spades",
    "card rank-7 clubs",
    "card rank-6 hearts",
    "card rank-5 hearts",
    "card rank-2 hearts",
    "card rank-7 hearts",
    "card rank-8 clubs",
    "card rank-10 spades",
    "card rank-10 clubs",
  ],

  [
    "card rank-a spades",
    "card rank-7 hearts",
    "card rank-9 diams",
    "card rank-a hearts",
    "card rank-4 hearts",
    "card rank-3 hearts",
    "card rank-k hearts",
    "card rank-10 diams",
    "card rank-6 hearts",
    "card rank-2 diams",
  ],

  [
    "card rank-k spades",
    "card rank-8 hearts",
    "card rank-8 diams",
    "card rank-2 clubs",
    "card rank-3 clubs",
    "card rank-10 hearts",
    "card rank-q hearts",
    "card rank-q diams",
    "card rank-5 hearts",
    "card rank-3 diams",
  ],

  [
    "card rank-q spades",
    "card rank-9 hearts",
    "card rank-7 diams",
    "card rank-6 diams",
    "card rank-5 diams",
    "card rank-a clubs",
    "card rank-a diams",
    "card rank-k diams",
    "card rank-4 hearts",
    "card rank-4 diams",
  ],

  [
    "card rank-10 spades",
    "card rank-10 hearts",
    "card rank-q hearts",
    "card rank-k hearts",
    "card rank-a hearts",
    "card rank-3 spades",
    "card rank-2 spades",
    "card rank-2 hearts",
    "card rank-3 hearts",
    "card rank-5 diams",
  ],

  [
    "card back",
    "card rank-9 spades",
    "card rank-8 spades",
    "card rank-7 spades",
    "card rank-6 spades",
    "card rank-9 diams",
    "card rank-8 diams",
    "card rank-7 diams",
    "card rank-6 diams",
    "card back",
  ],
];

const positionBoard = [
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
];

const deck = [
  "card rank-a spades",
  "card rank-2 spades",
  "card rank-3 spades",
  "card rank-4 spades",
  "card rank-5 spades",
  "card rank-6 spades",
  "card rank-7 spades",
  "card rank-8 spades",
  "card rank-9 spades",
  "card rank-10 spades",
  "card rank-j spades",
  "card rank-q spades",
  "card rank-k spades",
  "card rank-a clubs",
  "card rank-2 clubs",
  "card rank-3 clubs",
  "card rank-4 clubs",
  "card rank-5 clubs",
  "card rank-6 clubs",
  "card rank-7 clubs",
  "card rank-8 clubs",
  "card rank-9 clubs",
  "card rank-10 clubs",
  "card rank-j clubs",
  "card rank-q clubs",
  "card rank-k clubs",
  "card rank-a diams",
  "card rank-2 diams",
  "card rank-3 diams",
  "card rank-4 diams",
  "card rank-5 diams",
  "card rank-6 diams",
  "card rank-7 diams",
  "card rank-8 diams",
  "card rank-9 diams",
  "card rank-10 diams",
  "card rank-j diams",
  "card rank-q diams",
  "card rank-k diams",
  "card rank-a hearts",
  "card rank-2 hearts",
  "card rank-3 hearts",
  "card rank-4 hearts",
  "card rank-5 hearts",
  "card rank-6 hearts",
  "card rank-7 hearts",
  "card rank-8 hearts",
  "card rank-9 hearts",
  "card rank-10 hearts",
  "card rank-j hearts",
  "card rank-q hearts",
  "card rank-k hearts",
];

const divideDeckIntoPieces = (deck) => {
  let shuffled = deck
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  const result = new Array(Math.ceil(shuffled.length / 6))
    .fill()
    .map((_) => shuffled.splice(0, 6));
  console.log(result);
  return result;
};

// code to read file
const readFile = (fileName) =>
  new Promise((resolve, reject) => {
    fs.readFile(fileName, `utf-8`, (readErr, fileContents) => {
      if (readErr) {
        reject(readErr);
      } else {
        resolve(fileContents);
      }
    });
  });

// code to create a server
const server = http.createServer(async (req, resp) => {
  console.log(`browser asked for ${req.url}`);
  if (req.url == `/mydoc`) {
    const clientHtml = await readFile(`client.html`);
    resp.end(clientHtml);
  } else if (req.url == `/myjs`) {
    const clientJs = await readFile(`client.js`);
    resp.end(clientJs);
  } else if (req.url == `/sequence.css`) {
    const sequenceCss = await readFile(`sequence.css`);
    resp.end(sequenceCss);
  } else {
    resp.end(`not found`);
  }
});

// to listen for clients
server.listen(8000);

const wss = new WebSocket.Server({ port: 8080 });
const clients = new Map();
let sentagain = false;
let clientID = 0;
let divideddeck = divideDeckIntoPieces(deck);
let turn = 1;
wss.on("connection", (ws) => {
  clientID += 1;
  const id = clientID;
  const clientInfo = id;
  clients.set(ws, clientInfo);
  // console.log("aaaaaaaaaaaaaaaaaaaaa");
  if (clientID == 4) {
    let counter = 0;
    for (let client of clients.keys()) {
      let obj = {
        client: clients.get(client),
        board: board,
        type: "newboard",
        positionBoard: positionBoard,
        deck: divideddeck[counter],
        msgtype: "starting",
        colour: counter % 2 == 0 ? "green" : "blue",
      };

      // console.log("LOOOK HERERER");
      // console.log(clients.get(client));
      counter++;
      client.send(JSON.stringify(obj));
    }
    setmessage("Your turn", 1);
  }

  ws.on("message", (msgString) => {
    let message = JSON.parse(msgString.toString());
    // console.log(message);
    // console.log(message.msgtype);
    if (message.msgtype == "myturn") {
      if (turn == message.clientID) {
        let deck_index = turn - 1;
        if (sentagain) {
          deck_index += 4;
        }
        let card = message.card;
        let present = divideddeck[deck_index].includes(card);
        let currplayerdeck = divideddeck[deck_index];
        // console.log(divideddeck[deck_index]);
        // console.log(divideddeck[deck_index].includes(card));

        if (present) {
          let column = message.column;
          let row = message.row;
          // console.log(row, column);
          positionBoard[row][column] = deck_index % 2 == 0 ? "g" : "b";
          ////////////////////////////////
          newdeck = [];
          for (let i = 0; i < divideddeck[deck_index].length; i++) {
            if (divideddeck[deck_index][i] == card) {
            } else {
              newdeck.push(divideddeck[deck_index][i]);
            }
          }
          // console.log(newdeck);
          divideddeck[deck_index] = newdeck;
          updateboardanddeck(turn, newdeck);
        } else if (jackchecker(currplayerdeck)) {
          // console.log("verynice");
          let column = message.column;
          let row = message.row;
          positionBoard[row][column] = deck_index % 2 == 0 ? "g" : "b";
          // console.log("Very nice");
          let indexremove = jackindexreturner(currplayerdeck);
          // console.log(indexremove);
          let newdeck = [];
          for (let i = 0; i < divideddeck[deck_index].length; i++) {
            if (i == indexremove) {
            } else {
              newdeck.push(divideddeck[deck_index][i]);
            }
          }
          divideddeck[deck_index] = newdeck;
          updateboardanddeck(turn, newdeck);
        } else {
          // console.log("invalid move");
          setmessage("Invalid move", message.clientID);
        }
      } else {
        // console.log("not your turn");
        setmessage("not your turn", message.clientID);
      }
    }
  });
});

// creating a web socket

function getByValue(map, searchValue) {
  for (let [key, value] of map.entries()) {
    if (value === searchValue) return key;
  }
}

function setmessage(message, turn) {
  // console.log(turn);
  let obj = { msgtype: "setMessage", msg: message };
  let client = getByValue(clients, turn);
  client.send(JSON.stringify(obj));
}

function jackchecker(deck) {
  for (let i = 0; i < deck.length; i++) {
    let splitted_deck = deck[i].split(" ");

    if (splitted_deck[1] == "rank-j") {
      return true;
    }
  }

  return false;
}

function jackindexreturner(deck) {
  for (let i = 0; i < deck.length; i++) {
    let splitted_deck = deck[i].split(" ");

    if (splitted_deck[1] == "rank-j") {
      // console.log("idher dekho");
      // console.log(i);
      return i;
    }
  }

  // return false;
}

function updateboardanddeck(turn1, newdeck) {
  /////////////////////////////////////

  if (newdeck.length == 0 && turn1 == 4) {
    let counter = 4;
    // divideddeck
    for (let client of clients.keys()) {
      let obj = { deck: divideddeck[counter], msgtype: "updatecards" };
      client.send(JSON.stringify(obj));
      let obj1 = { positionBoard: positionBoard, msgtype: "updatepboard" };
      client.send(JSON.stringify(obj1));
      counter++;
    }
    if (sentagain == false) {
      sentagain = true;
    } else {
      // console.log("DRAWWWWWWWWWW");
      setmessage("Draw", 1);
      setmessage("Draw", 2);
      setmessage("Draw", 3);
      setmessage("Draw", 4);
      turn = -1;
      return;
    }
  } else {
    // console.log(positionBoard);
    for (let client of clients.keys()) {
      let obj = { positionBoard: positionBoard, msgtype: "updatepboard" };
      client.send(JSON.stringify(obj));
      if (clients.get(client) == turn1) {
        let obj = { deck: newdeck, msgtype: "updatedeck" };
        client.send(JSON.stringify(obj));
      }
    }
  }

  let win = winnerchecker();
  if (win != " ") {
    if (win == "g") {
      setmessage("WINNER", 1);
      setmessage("WINNER", 3);
    } else {
      setmessage("WINNER", 2);
      setmessage("WINNER", 4);
    }
    turn = -1;
    return;
  }
  turn = turn1 + 1;
  turn = turn % 5;
  if (turn == 0) {
    turn += 1;
  }
  setmessage("Your turn", turn);
}

function winnerchecker() {
  // console.log("asdasd");
  // positionBoard

  for (let i = 2; i < positionBoard.length - 2; i++) {
    for (let j = 2; j < positionBoard[i].length - 2; j++) {
      let hor = checkhorizontal(i, j);
      if (hor != " ") {
        // console.log("horizontal " + hor + "Winnnnnerrrrrrrrr");
        return hor;
      }
      let ver = checkvertical(i, j);
      if (ver != " ") {
        // console.log("vertical " + ver + "Winnnnnerrrrrrrrr");
        return ver;
      }

      let diag1 = checkdiagonal1(i, j);
      if (diag1 != " ") {
        // console.log("diagonal " + diag1 + "Winnnnnerrrrrrrrr");
        return diag1;
      }

      let diag2 = checkdiagonal2(i, j);
      if (diag2 != " ") {
        // console.log("diagonal " + diag2 + "Winnnnnerrrrrrrrr");
        return diag2;
      }
    }
  }
  return " ";
}

function checkhorizontal(i, j) {
  if (
    positionBoard[i][j] == "g" &&
    positionBoard[i][j + 1] == "g" &&
    positionBoard[i][j + 2] == "g" &&
    positionBoard[i][j - 1] == "g" &&
    positionBoard[i][j - 2] == "g"
  ) {
    return "g";
  } else if (
    positionBoard[i][j] == "b" &&
    positionBoard[i][j + 1] == "b" &&
    positionBoard[i][j + 2] == "b" &&
    positionBoard[i][j - 1] == "b" &&
    positionBoard[i][j - 2] == "b"
  ) {
    return "b";
  } else {
    return " ";
  }
}

function checkvertical(i, j) {
  if (
    positionBoard[i][j] == "g" &&
    positionBoard[i + 1][j] == "g" &&
    positionBoard[i + 2][j] == "g" &&
    positionBoard[i - 1][j] == "g" &&
    positionBoard[i - 2][j] == "g"
  ) {
    return "g";
  } else if (
    positionBoard[i][j] == "b" &&
    positionBoard[i + 1][j] == "b" &&
    positionBoard[i + 2][j] == "b" &&
    positionBoard[i - 2][j] == "b" &&
    positionBoard[i - 1][j] == "b"
  ) {
    return "b";
  } else {
    return " ";
  }
}

function checkdiagonal1(i, j) {
  if (
    positionBoard[i][j] == "g" &&
    positionBoard[i + 1][j + 1] == "g" &&
    positionBoard[i + 2][j + 1] == "g" &&
    positionBoard[i - 1][j - 1] == "g" &&
    positionBoard[i - 2][j - 2] == "g"
  ) {
    return "g";
  } else if (
    positionBoard[i][j] == "b" &&
    positionBoard[i + 1][j + 1] == "b" &&
    positionBoard[i + 2][j + 2] == "b" &&
    positionBoard[i - 2][j - 2] == "b" &&
    positionBoard[i - 1][j - 1] == "b"
  ) {
    return "b";
  } else {
    return " ";
  }
}

function checkdiagonal2(i, j) {
  if (
    positionBoard[i][j] == "g" &&
    positionBoard[i + 1][j - 1] == "g" &&
    positionBoard[i + 2][j - 2] == "g" &&
    positionBoard[i - 1][j + 1] == "g" &&
    positionBoard[i - 2][j + 2] == "g"
  ) {
    return "g";
  } else if (
    positionBoard[i][j] == "b" &&
    positionBoard[i + 1][j - 1] == "b" &&
    positionBoard[i + 2][j - 2] == "b" &&
    positionBoard[i - 2][j + 2] == "b" &&
    positionBoard[i - 1][j + 1] == "b"
  ) {
    return "b";
  } else {
    return " ";
  }
}
// card rank-j hearts
