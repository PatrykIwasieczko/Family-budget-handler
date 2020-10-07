import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Main = () => {
    const [families, setFamilies] = useState([]);
    useEffect(() => {
        getFamilies();
    }, []);

    const getFamilies = async () => {
        const familyList = await axios.get("http://localhost:8000/families");
        setFamilies(familyList.data.families);
    };
    return (
        <div>
            {families &&
                families.map((family) => (
                    <div key="family._id">
                        <p>{family.name}</p>
                        <button>Dołącz do rodziny</button>
                    </div>
                ))}
        </div>
    );
};

export default Main;
