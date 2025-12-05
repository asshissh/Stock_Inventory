import React, { useState } from "react"
import "./../../styles/components/Forms/AddForm.css"
import { useCompaniesContext } from "../../hooks/useCompaniesContext"
import { useAuthContext } from "../../hooks/useAuthContext"
import { API_ENDPOINTS } from "../../config/api"


const CompanyForm = ({ onClose }) => {
    const { dispatch } = useCompaniesContext()
    const { user } = useAuthContext()

    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [contact, setContact] = useState("")

    const [error, setError] = useState(null)

    const handleAddCompany = async (e) => {
        e.preventDefault();
        if (!user) {
            setError("you must logged in ")
            return
        }

        const company = {
            name,
            address,
            contactEmail: email,
            contactNumber: contact,

        };
        const response = await fetch(API_ENDPOINTS.COMPANIES.BASE, {
            method: "POST",
            body: JSON.stringify(company),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            }

        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }
        if (response.ok) {
            setName("");
            setAddress("")
            setEmail("");
            setContact("");
            setError(null);
            dispatch({ type: "CREATE_COMPANIES", payload: json })
        }
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content auth-form">
                <button className="close-button" onClick={onClose}>
                    x
                </button>
                <h2 className="sora">Add Company</h2>
                <form onSubmit={handleAddCompany}>
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
                        placeholder="Address"
                        className="outfit"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="outfit"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Contact"
                        className="outfit"
                        onChange={(e) => setContact(e.target.value)}
                        value={contact}
                        required
                    />
                    <button type="submit" className="outfit">
                        Add Company
                    </button>
                    {error && <div className="error">{error}</div>}


                </form>
            </div>
        </div>
    )


}
export default CompanyForm