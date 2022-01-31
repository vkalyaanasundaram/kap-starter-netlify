const Utmparams = (path) => {
  return path.includes(`?`) ? `?` + path.split(`?`)[1] : ``;
};

export default Utmparams;
