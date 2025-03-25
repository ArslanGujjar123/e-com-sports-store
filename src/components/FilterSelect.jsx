import Select from 'react-select';
import React, { useState, useEffect } from 'react';

const options = [
    { value: "English willow Bats", label: "English willow Bats" },
    { value: "Helmets", label: "Helmets" },
    { value: "Batting Gloves", label: "Batting Gloves" },
    { value: "Kashmir willow bat", label: "Kashmir willow bat" },
    { value: "Stumps and Bails", label: "Stumps and Bails" },
    { value: "Kit Bag", label: "Kit Bag" },
    { value: "Keeping Pads", label: "Keeping Pads" },
    { value: "Keeping Gloves", label: "Keeping Gloves" },
    { value: "Shoes", label: "Shoes" },
    { value: "Side Arm", label: "Side Arm" },
    { value: "Abdominal Guard", label: "Abdominal Guard" },
    { value: "Ball", label: "Ball" },
];

const customStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: "#0f3460",
        color: "white",
        borderRadius: "5px",
        border: "none",
        boxShadow: "none",
        width: "200px",
        height: "40px",
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#0f3460" : "white",
        color: state.isSelected ? "white" : "#0f3460",
        "&:hover": {
            backgroundColor: "#0f3460",
            color: "white",
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "white",
    }),
};

const FilterSelect = ({ setFilterList }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    const handleChange = (selectedOption) => {
        console.log("Selected Option:", selectedOption);
        setFilterList(products.filter((item) => item.category === selectedOption.value));
    };

    return (
        <Select
            options={options}
            defaultValue={{ value: "", label: "Filter By Category" }}
            styles={customStyles}
            onChange={handleChange}
        />
    );
};

export default FilterSelect;
