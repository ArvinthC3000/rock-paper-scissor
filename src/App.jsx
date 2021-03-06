import { useEffect, useState } from 'react';
import { FaHandRock, FaHandScissors, FaHandPaper } from 'react-icons/fa';
import './App.css';

const App = () => {
  const [userSelection, setuserSelection] = useState([]);
  const [computerSelection, setComputerSelection] = useState([]);
  const [status, setStatus] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [showGameReset, setShowGameReset] = useState(false);
  const options = [
    {
      component: <FaHandRock style={iconStyle} />,
      key: 'A',
      keyCode: 65,
      name: 'Rock',
    },
    {
      component: <FaHandPaper style={iconStyle} />,
      key: 'S',
      keyCode: 83,
      name: 'Paper',
    },
    {
      component: <FaHandScissors style={iconStyle} />,
      key: 'D',
      keyCode: 68,
      name: 'Scissors',
    },
  ];

  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const maxScore = 10;

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    // Clean up  - on unmounting component
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Game logic */
  useEffect(() => {
    if (gameOver) return;
    switch (userSelection.name + computerSelection.name) {
      case 'PaperRock': // use either upper or lower case
      case 'RockScissors':
      case 'ScissorsPaper':
        setStatus('Point for you');
        setUserScore(userScore + 1);
        break;
      case 'RockPaper':
      case 'ScissorsRock':
      case 'PaperScissors':
        setStatus('Point for the computer');
        setComputerScore(computerScore + 1);
        break;
      case 'RockRock':
      case 'ScissorsScissors':
      case 'PaperPaper':
        setStatus('Try again');
        break;
      default:
        setStatus('');
        break;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSelection, computerSelection]);

  useEffect(() => {
    if (computerScore === maxScore || userScore === maxScore) {
      setGameOver(true);
      setShowGameReset(true);
    }
    if (computerScore >= maxScore) setStatus('You lost! ????');
    if (userScore >= maxScore) setStatus('You Won! ???????');
  }, [computerScore, userScore]);

  const handleClick = option => {
    if (gameOver) return;
    generateComputerSelection();
    setuserSelection(option);
  };

  /* Handle key selecetion (calls handle button click) */
  const handleKeyDown = e => {
    if (gameOver) return;
    const option = options.filter(option => option.keyCode === e.keyCode);
    if (!option.length) return;
    handleClick(option[0]);
  };

  /* Random computer selection */
  const generateComputerSelection = () => {
    const computerSelection =
      options[Math.floor(Math.random() * options.length)];
    setComputerSelection(computerSelection);
  };

  /* Reset game */
  const gameReset = () => {
    setGameOver(false); //
    setComputerSelection([]);
    setuserSelection([]);
    setStatus(null);
    setComputerScore(0);
    setUserScore(0);
    setShowGameReset(false);
  };

  return (
    <div className='wrapper'>
      <div className='appContainer'>
        <div className='selectionWrapper'>
          <div className='selection'>
            <div className='selectionHeader'>Player selection</div>
            <div className='componentContainer'>{userSelection.component}</div>
            <div className='progressContainer'>
              <div
                className='userProgress'
                style={{ width: `${(userScore / maxScore) * 100}%` }}></div>
            </div>
          </div>
          <div className='selection'>
            <div className='selectionHeader'>Computer selection</div>
            <div className='componentContainer'>
              {computerSelection.component}
            </div>
            <div className='progressContainer'>
              <div
                className='computerProgress'
                style={{ width: `${(computerScore / maxScore) * 100}%` }}></div>
            </div>
          </div>
        </div>
        <div className='statusContainer'>
          {status || (
            <>
              <div>Start game by clicking one of the following selection.</div>
              <div>(or) Use assigned hard keys </div>
            </>
          )}
        </div>
        <div className='buttonWrapper'>
          <div className='buttonContainer'>
            {options.map(option => (
              <button
                key={option.key}
                title={`Press '${option.key}'`}
                value={option}
                onClick={() => handleClick(option)}>
                <span>{option.name}</span>
                <span className='sub'>Press '{option.key}'</span>
              </button>
            ))}
          </div>
        </div>
        {showGameReset && (
          <div className='resetContainer'>
            <button onClick={gameReset}>Reset</button>
          </div>
        )}
      </div>
    </div>
  );
};

const iconStyle = {
  height: '5rem',
  width: '5rem',
};

export default App;

/*
  Don't manipulate Really DOM.
  keep JSX simple by avoiding iterating function like map
  knowing Caviots of hooks before using it 
  always use Semantics code
  avoid string interpolation for inline css
  avoid inline css
*/
