export default function Tab({ tabData, field, setField }) {
  return (
    <div
      style={{
        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
      }}
      className="flex flex-wrap bg-richblack-800 p-1 gap-2 my-6 rounded-full max-w-max"
    >
      {tabData.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setField(tab.type)}
          className={`${
            field === tab.type
              ? "bg-richblack-900 text-richblack-5"
              : "bg-transparent text-richblack-200"
          } py-2 px-4 md:py-2 md:px-5 text-sm md:text-base rounded-full transition-all duration-200 hover:bg-richblack-700`}
        >
          {tab?.tabName}
        </button>
      ))}
    </div>
  );
}
