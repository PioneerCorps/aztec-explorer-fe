export const AddressSummary = () => {
  const summary = [
    "Balance",
    "Contract Class ID",
    "Version",
    "Deployer Address",
  ];
  const moreInfo = ["Initializer Function", "HOPK", "Salt", "Notes"];
  const keys = ["Viewing Key", "Nullifier Key"];
  return (
    <div className="secondary-box !flex-row w-full justify-between">
      <div className="flex flex-col w-1/3 ">
        <h1 className="pb-3 headerExa">Summary</h1>
        {summary.map((field) => {
          return (
            <div className="flex gap-4 ">
              <div className="w-1/2 text-bgLight2">{field}</div>

              <div className="w-1/2 text-nowrap">"value"</div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col w-1/3">
        <h1 className="pb-3 headerExa">More Info</h1>
        {moreInfo.map((field) => {
          return (
            <div className="flex gap-4  ">
              <div className="w-1/2 text-bgLight2">{field}</div>

              <div className="w-1/2 text-nowrap">"value"</div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col w-1/3 ">
        <h1 className="pb-3 headerExa">Keys</h1>
        {keys.map((field) => {
          return (
            <div className="flex gap-4 ">
              <div className="w-1/2 text-bgLight2">{field}</div>

              <div className="w-1/2 text-nowrap">"value"</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
