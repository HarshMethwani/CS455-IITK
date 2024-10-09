import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import './Hangman.css';

// const createBodyPart = (type, coordinates, testId) => {
//   return { type, ...coordinates, testId };
// };

// const bodyParts = [
//   createBodyPart('circle', { cx: 150, cy: 70, r: 20 }, 'body-part-0'),
//   createBodyPart('line', { x1: 150, y1: 90, x2: 150, y2: 140 }, 'body-part-1'), 
//   createBodyPart('line', { x1: 150, y1: 110, x2: 120, y2: 100 }, 'body-part-2'),
//   createBodyPart('line', { x1: 150, y1: 110, x2: 180, y2: 100 }, 'body-part-3'), 
//   createBodyPart('line', { x1: 150, y1: 140, x2: 130, y2: 170 }, 'body-part-4'),
//   createBodyPart('line', { x1: 150, y1: 140, x2: 170, y2: 170 }, 'body-part-5'), 
// ];

// const renderScaffold = () => (
//   <>
//     <line x1="60" y1="20" x2="140" y2="20" className="scaffold" />
//     <line x1="140" y1="20" x2="140" y2="50" className="scaffold" />
//     <line x1="60" y1="20" x2="60" y2="230" className="scaffold" />
//     <line x1="20" y1="230" x2="100" y2="230" className="scaffold" />
//   </>
// );

// const renderBodyParts = (wrongGuesses) => (
//   bodyParts.map(({ type, cx, cy, r, x1, y1, x2, y2, testId }, index) => (
//     type === 'circle' ? (
//       <circle
//         key={index}
//         cx={cx}
//         cy={cy}
//         r={r}
//         className={wrongGuesses > index ? 'visible' : 'hidden'}
//         data-testid={testId}
//       />
//     ) : (
//       <line
//         key={index}
//         x1={x1}
//         y1={y1}
//         x2={x2}
//         y2={y2}
//         className={wrongGuesses > index ? 'visible' : 'hidden'}
//         data-testid={testId}
//       />
//     )
//   ))
// );

// const Hangman = ({ wrongGuesses }) => (
//   <div className="hangman">
//     <svg height="250" width="200" className="hangman-drawing">
//       {renderScaffold()}
//       {renderBodyParts(wrongGuesses)}
//     </svg>
//   </div>
// );

const Hangman = ({ wrongGuesses }) => {
  const bodyParts = [
    { type: 'circle', cx: 150, cy: 70, r: 20, testId: 'body-part-0' }, 
    { type: 'line', x1: 150, y1: 90, x2: 150, y2: 140, testId: 'body-part-1' },
    { type: 'line', x1: 150, y1: 110, x2: 120, y2: 100, testId: 'body-part-2' },
    { type: 'line', x1: 150, y1: 110, x2: 180, y2: 100, testId: 'body-part-3' }, 
    { type: 'line', x1: 150, y1: 140, x2: 130, y2: 170, testId: 'body-part-4' },
    { type: 'line', x1: 150, y1: 140, x2: 170, y2: 170, testId: 'body-part-5' }, 
  ];

  return (
    <div className="hangman">
      <svg height="250" width="200" className="hangman-drawing">
        {/* Scaffold */}
        <line x1="60" y1="20" x2="140" y2="20" className="scaffold" />
        <line x1="140" y1="20" x2="140" y2="50" className="scaffold" />
        <line x1="60" y1="20" x2="60" y2="230" className="scaffold" />
        <line x1="20" y1="230" x2="100" y2="230" className="scaffold" />
        
        {/* Body Parts */}
        {bodyParts.map((part, index) => (
          part.type === 'circle' ? 
          <circle key={index} cx={part.cx} cy={part.cy} r={part.r} className={wrongGuesses > index ? 'visible' : 'hidden'} data-testid={part.testId} /> : 
          <line key={index} x1={part.x1} y1={part.y1} x2={part.x2} y2={part.y2} className={wrongGuesses > index ? 'visible' : 'hidden'} data-testid={part.testId} />
        ))}
      </svg>
    </div>
  );
};

Hangman.propTypes = {
  wrongGuesses: PropTypes.number.isRequired,
};

export default Hangman;


