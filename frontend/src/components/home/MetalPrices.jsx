import React from "react"; // Ensure React is imported
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
                  Purity
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
              {metals.map((metal) => {
                if (metal.metal.toLowerCase() === "gold") {
                  return (
                    <React.Fragment key={metal._id}>
                      <tr className="border">
                        <td className="pl-2 pr-5 border-b border-border-info-color pb-2">{metal.metal}</td>
                        <td className="pl-2 pr-5 border-b border-border-info-color pb-2">24k</td>
                        <td className="pl-2 pr-5 border-b border-border-info-color pb-2">{formattedDate}</td>
                        <td className="pl-2 pr-5 border-b border-border-info-color pb-2">SAR {metal.price}</td>
                      </tr>
                      <tr className="border">
                        <td className="pl-2 pr-5 border-b border-border-info-color pb-2">{metal.metal}</td>
                        <td className="pl-2 pr-5 border-b border-border-info-color pb-2">21k</td>
                        <td className="pl-2 pr-5 border-b border-border-info-color pb-2">{formattedDate}</td>
                        <td className="pl-2 pr-5 border-b border-border-info-color pb-2">
                          SAR {(metal.price * 0.857).toFixed(2)}
                        </td>
                      </tr>
                      <tr className="border">
                        <td className="pl-2 pr-5 border-b border-border-info-color pb-2">{metal.metal}</td>
                        <td className="pl-2 pr-5 border-b border-border-info-color pb-2">18k</td>
                        <td className="pl-2 pr-5 border-b border-border-info-color pb-2">{formattedDate}</td>
                        <td className="pl-2 pr-5 border-b border-border-info-color pb-2">
                          SAR {(metal.price * 0.75).toFixed(2)}
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                }
                if (metal.metal.toLowerCase() === "silver") {
                  return (
                    <tr key={metal._id} className="border">
                      <td className="pl-2 pr-5 border-b border-border-info-color pb-2">{metal.metal}</td>
                      <td className="pl-2 pr-5 border-b border-border-info-color pb-2">912</td>
                      <td className="pl-2 pr-5 border-b border-border-info-color pb-2">{formattedDate}</td>
                      <td className="pl-2 pr-5 border-b border-border-info-color pb-2">SAR {metal.price}</td>
                    </tr>
                  );
                }
                return (
                  <tr key={metal._id} className="border">
                    <td className="pl-2 pr-5 border-b border-border-info-color pb-2">{metal.metal}</td>
                    <td className="pl-2 pr-5 border-b border-border-info-color pb-2">---</td>
                    <td className="pl-2 pr-5 border-b border-border-info-color pb-2">{formattedDate}</td>
                    <td className="pl-2 pr-5 border-b border-border-info-color pb-2">SAR {metal.price}</td>
                  </tr>
                );
              })}
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
