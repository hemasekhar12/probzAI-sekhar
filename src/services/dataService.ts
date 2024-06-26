export const fetchData = async () => {
    const response = await fetch('/data.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  
  