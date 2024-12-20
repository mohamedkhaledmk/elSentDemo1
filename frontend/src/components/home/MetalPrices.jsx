import { useDispatch, useSelector } from "react-redux";
import { getAllMetals } from "../../store/metals/metalsSlice";
import { useEffect } from "react";

const MetalPrices = () => {
    const { metals } = useSelector((state) => state.metal);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllMetals());
    }, [dispatch]);

    const formattedDate = new Date().toLocaleDateString();

    console.log('MetalPrices thing:', { metals });

    return (
        <div>
            <h2>Metal Prices</h2>
            {metals && metals.length ? (
                <table>
                    <thead>
                        <tr>
                            <th>Metal</th>
                            <th>Date</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {metals.map((metal) => (
                            <tr key={metal._id}>
                                <td>{metal.metal}</td>
                                <td>{formattedDate}</td>
                                <td>SAR{metal.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>No metal prices available.</div>
            )}
        </div>
    );
};

export default MetalPrices;