import { useEffect, useState } from 'react';
import { FaHandRock, FaHandScissors, FaHandPaper } from 'react-icons/fa';
import './App.css';

const App = () => {
  const [userSelection, setuserSelection] = useState([]);
  const [computerSelection, setComputerSelection] = useState([]);
  const [status, setStatus] = useState(null);
  const options = [
    { component: <FaHandRock />, key: 'A', keyCode: 65, name: 'Rock' },
    { component: <FaHandPaper />, key: 'S', keyCode: 83, name: 'Paper' },
    { component: <FaHandScissors />, key: 'D', keyCode: 68, name: 'Scissors' },
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
    <>
      <div className='selection'>Your selection: {userSelection.component}</div>
      <div className='selection'>
        Computer selection: {computerSelection.component}
      </div>
      <div className='selection'>{status}</div>
      {options.map(option => (
        <button
          key={option.key}
          title={`Press '${option.key}'`}
          value={option}
          onClick={() => handleClick(option)}>
          {option.name} ({option.component})
        </button>
      ))}
    </>
  );
};

export default App;
