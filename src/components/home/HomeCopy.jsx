import React, { useEffect, useState } from 'react';

function HomeCopy() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.reddit.com/r/cs2/api/widget', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // body: JSON.stringify({
          //   // Your parameters here
          // }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch data only once on component mount

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  // Render the fetched data here
  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          {/* Render your data items here */}
        </div>
      ))}
    </div>
  );
}

export default HomeCopy;