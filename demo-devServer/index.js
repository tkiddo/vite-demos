const fetchData = async () => {
  await fetch("http://localhost:8080/api/facts");
};

fetchData();
