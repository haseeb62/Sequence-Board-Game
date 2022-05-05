const ws = new WebSocket(`ws://localhost:8080`);

const Sequence = () => {
  const [board, setBoard] = React.useState([[]]);
  const [positionBoard, setPositionBoard] = React.useState([[]]);
  const [cards, setCards] = React.useState([]);

  let diamondSign = "♦";
  let heartSign = "♥";
  let spadesSign = "♠";
  let clubsSign = "♣";

  return (
    <div>
      <div class="container">{/* code for sequence board comes here */}</div>
      <div class="container">
        <div>
          <h1>Your Cards:</h1>
        </div>
        {/* code for client cards comes here */}
        {/* code for text box comes here */}
        {/* code for circle representing the players team color comes here */}
      </div>
    </div>
  );
};

ReactDOM.render(<Sequence />, document.querySelector(`#root`));
