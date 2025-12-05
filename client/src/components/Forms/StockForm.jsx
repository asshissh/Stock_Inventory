import React from "react";
import { useParams } from "react-router-dom";
import "../../styles/components/Forms/AddForm.css";
import { useCompaniesContext } from "../../hooks/useCompaniesContext";
import { useState } from "react";
import { API_ENDPOINTS } from "../../config/api";
import { useAuthContext } from "../../hooks/useAuthContext";


const StockForm = ({ onClose }) => {
    const { companyId } = useParams();
    const { dispatch } = useCompaniesContext();
    const { user } = useAuthContext();
    const [name, setName] = useState("");
    const [totalUnits, setTotalUnits] = useState("");
    const [unitSold, setUnitSold] = useState("");
    const [pricePerUnits, setPricePerUnit] = useState("");

    const [error, setError] = useState(null);

    const handleAddStock = async (e) => {
        e.preventDefault();
        if (!companyId) {
            setError("Company ID is missing ")
            return
        }
        const stock = { name, totalUnits, unitSold, pricePerUnits };
        const response = await fetch(API_ENDPOINTS.COMPANIES.STOCKS(companyId), {
            method: "POST",
            body: JSON.stringify(stock),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            }
        });
        const json = await response.json();
        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setName("");
            setTotalUnits("");
            setPricePerUnit("");
            setUnitSold("");
            setError(null);
            dispatch({ type: "CREATE_STOCK", payload: json });
        }
        
        onClose();
    }

    return (
        <div className="modal">
            <div className="modal-content auth-form">
                <button className="close-button" onClick={onClose}>
                    x
                </button>
                <h2 className="sora">Add New Stock</h2>
                <form onSubmit={handleAddStock}>
                    <input
                        type="text"
                        placeholder="Name"
                        className="outfit"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Total Units"
                        className="outfit"
                        onChange={(e) => setTotalUnits
                            (e.target.value)
                        }
                        value={totalUnits}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Unit Sold"
                        className="outfit"
                        onChange={(e) => setUnitSold(e.target.value)}
                        value={unitSold}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Price Per Unit"
                        className="outfit"
                        onChange={(e) => setPricePerUnit(e.target.value)}
                        value={pricePerUnits}
                        required
                    />
                    <button type="submit" className="outfit">
                        Add Stock
                    </button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </div>
    )
}
export default StockForm;