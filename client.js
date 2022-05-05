const ws = new WebSocket(`ws://localhost:8080`);

const Sequence = () => {
  const [board, setBoard] = React.useState([[]]);
  const [positionBoard, setPositionBoard] = React.useState([[]]);
  const [cards, setCards] = React.useState([]);
  const [deck, setDeck] = React.useState([]);
  const [message, setMessage] = React.useState("Add message here.");
  const [clientID, setClientID] = React.useState(1);
  const [colour, Setcolour] = React.useState();

  let diamondSign = "♦";
  let heartSign = "♥";
  let spadesSign = "♠";
  let clubsSign = "♣";
  ws.onopen = () => {};
  let counter = 0;
  let client_id;
  ws.onmessage = function (event) {
    let message_from_server = JSON.parse(event.data);
    let msgtype = message_from_server.msgtype;
    if (msgtype == "starting") {
      let message_from_server = JSON.parse(event.data);
      let board = message_from_server.board;
      let positionBoard = message_from_server.positionBoard;
      let deck = message_from_server.deck;
      let colour = message_from_server.colour;
      setClientID(message_from_server.client);
      setPositionBoard(positionBoard);
      setDeck(deck);
      Setcolour(colour);
      setBoard(board);
    } else if (msgtype == "updatepboard") {
      let message_from_server = JSON.parse(event.data);
      let positionBoard = message_from_server.positionBoard;
      setPositionBoard(positionBoard);
    } else if (msgtype == "updatedeck") {
      let message_from_server = JSON.parse(event.data);
      let newdeck = message_from_server.deck;
      setDeck(newdeck);
    } else if (msgtype == "setMessage") {
      let message_from_server = JSON.parse(event.data);

      setMessage(message_from_server.msg);
    } else if (msgtype == "updatecards") {
      let message_from_server = JSON.parse(event.data);
      setDeck(message_from_server.deck);
    }
  };
  ws.onclose = function () {};

  function iscardback(str) {
    let string = str.split(" ");
    if (string[string.length - 1] == "back") {
      return true;
    }
    return false;
  }

  function cardnum(str) {
    let string = str.split(" ");
    let str2 = string[1].split("-");
    return str2[1];
  }

  function signreturner(str) {
    let string = str.split(" ");
    if (string[string.length - 1] == "spades") {
      return spadesSign;
    } else if (string[string.length - 1] == "diams") {
      return diamondSign;
    } else if (string[string.length - 1] == "clubs") {
      return clubsSign;
    } else {
      return heartSign;
    }
  }

  function checkifpresent(str, row, column) {
    let obj = {
      clientID: clientID,
      row: row,
      column: column,
      msgtype: "myturn",
      card: str,
    };
    ws.send(JSON.stringify(obj));
  }

  return (
    <div>
      <div class="container">
        {board.map((row, rowId) => (
          <div class="playingCards fourColours rotateHand">
            <ul class="table">
              {row.map((element, columnID) => (
                <div>
                  <li>
                    {iscardback(element) ? (
                      <div class="card back">
                        <span class="rank"></span>
                      </div>
                    ) : positionBoard[columnID][rowId] == "g" ? (
                      <div className="card">
                        <div className="green"></div>
                      </div>
                    ) : positionBoard[columnID][rowId] == "b" ? (
                      <div className="card">
                        <div className="blue"></div>
                      </div>
                    ) : (
                      <div
                        class={element}
                        onClick={() => checkifpresent(element, columnID, rowId)}
                      >
                        <span class="rank">{cardnum(element)}</span>
                        <span class="suit">{signreturner(element)}</span>
                      </div>
                    )}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div class="container">
        <div>
          <h1>Your Cards:</h1>
        </div>
        {
          <div class="playingCards fourColours rotateHand">
            <ul class="table">
              {deck.map((each) => (
                <li>
                  <a class={each}>
                    <span class="rank">{cardnum(each)}</span>
                    <span class="suit">{signreturner(each)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        }
        {<div className="text_box"> {message} </div>}

        {<div className={`color ${colour}`}></div>}
      </div>
    </div>
  );
};

ReactDOM.render(<Sequence />, document.querySelector(`#root`));
