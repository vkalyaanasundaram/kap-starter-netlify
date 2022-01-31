const FinanceSolution = ({ data }) => {
  return (
    <div className="xs:w-full px-5 md:w-full px-10 justify-content-md-center mt-5 mb-5">
      <div
        className="my-3"
        dangerouslySetInnerHTML={{
          __html: data?.financeSolution,
        }}
      />
    </div>
  );
};
export default FinanceSolution;
