import { useDispatch, useSelector } from "react-redux";
import { getAllMetals } from "../../store/metals/metalsSlice";
import { useEffect } from "react";

const MetalPrices = () => {
  const { metals } = useSelector((state) => state.metal);
  console.log("s", metals);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMetals());
  }, [dispatch]);

  const formattedDate = new Date().toLocaleDateString();

  return (
    <div className="px-7 py-4 w-full bg-theme-bg text-slate-300 rounded-2xl">
      <h2 className="text-white font-bold text-xl border-b border-border-info-color pb-3 mb-5">
        High-End Metal Prices Today
      </h2>
      {metals && metals.length ? (
        <div className="overflow-auto px-4 rounded-2xl border border-border-info-color mt-4 max-h-[500px]">
          <table className="text-left whitespace-nowrap w-full border-separate border-spacing-x-0 border-spacing-y-4">
            <thead className="sticky top-0 bg-theme-bg table-header-group">
              <tr>
                <th className="p-2 pr-5 select-none first:rounded-l-lg last:rounded-r-lg border-b border-border-info-color hover:bg-theme-bg2 transition-all">
                  Metal
                </th>
                <th className="p-2 pr-5 select-none first:rounded-l-lg last:rounded-r-lg border-b border-border-info-color hover:bg-theme-bg2 transition-all">
                  Date
                </th>
                <th className="p-2 pr-5 select-none first:rounded-l-lg last:rounded-r-lg border-b border-border-info-color hover:bg-theme-bg2 transition-all">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="table-row-group">
              {metals.map((metal) => (
                <tr key={metal._id} className="border">
                  <td className="pl-2 pr-5 border-b border-border-info-color pb-2">
                    {metal.metal}
                  </td>
                  <td className="pl-2 pr-5 border-b border-border-info-color pb-2">
                    {formattedDate}
                  </td>
                  <td className="pl-2 pr-5 border-b border-border-info-color pb-2">
                    SAR {metal.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No metal prices available.</div>
      )}
    </div>
  );
};

export default MetalPrices;
