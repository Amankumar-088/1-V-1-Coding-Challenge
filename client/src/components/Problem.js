import React, { useState, useEffect } from 'react';
import "../css/Problem.css";

function Problem({ problemId }) {
  const [problemStatement, setProblemStatement] = useState('');
  const apiUrl = `https://judgeapi.u-aizu.ac.jp/resources/descriptions/en/${problemId}`;

  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const htmlContent = data.html;
        setProblemStatement(htmlContent);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [apiUrl]);

  const decodeEntities = (html) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = html;
    return textarea.value;
  };

  return (
    <div className="problem-container">
      <div className="problem-title">Problem</div>
      <div className="problem-content" dangerouslySetInnerHTML={{ __html: decodeEntities(problemStatement) }} />
    </div>
  );
}

export default Problem;
