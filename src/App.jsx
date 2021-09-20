import { useEffect, useState } from 'react';
import { FaHandRock, FaHandScissors, FaHandPaper } from 'react-icons/fa';
import './App.css';

const App = () => {
  const [userSelection, setuserSelection] = useState([]);
  const [computerSelection, setComputerSelection] = useState([]);
  const [status, setStatus] = useState(null);
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

  useEffect(() => {
    switch (userSelection.name + computerSelection.name) {
      case 'PaperRock':
      case 'RockScissors':
      case 'ScissorsPaper':
        setStatus('Point for you');
        break;
      case 'RockPaper':
      case 'ScissorsRock':
      case 'PaperScissors':
        setStatus('Point for the computer');
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
    // ...
  }, [userSelection, computerSelection]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = option => {
    generateComputerSelection();
    setuserSelection(option);
  };

  const handleKeyDown = e => {
    const option = options.filter(option => option.keyCode === e.keyCode);
    if (!option.length) return;
    handleClick(option[0]);
  };

  const generateComputerSelection = () => {
    const computerSelection =
      options[Math.floor(Math.random() * options.length)];
    setComputerSelection(computerSelection);
  };
  return (
    <div className='wrapper'>
      <div className='appContainer'>
        <div className='selectionWrapper'>
          <div className='selection'>
            <div className='selectionHeader'>Player selection</div>
            <div className='componentContainer'>{userSelection.component}</div>
          </div>
          <div className='selection'>
            <div className='selectionHeader'>Computer selection</div>
            <div className='componentContainer'>
              {computerSelection.component}
            </div>
          </div>
        </div>
        <div className='statusContainer'>
          {status || (
            <>
              <div>Start game by clicking on any of the following buttons.</div>
              <div>(or)</div>
              <div>Use hard keys</div>
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
      </div>
    </div>
  );
};

const iconStyle = {
  height: '5rem',
  width: '5rem',
};

export default App;
