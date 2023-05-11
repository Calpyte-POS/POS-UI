import React, { useState, useEffect } from 'react';

function CategoryAdd({ setOpen, rowId }) {
    return <></>;
}

export default CategoryAdd;

// import React, { useState, useEffect } from 'react';

// function MyComponent() {
//   const [dropdownValues, setDropdownValues] = useState([]);

//   useEffect(() => {
//     fetchDropdownValues();
//   }, []);

//   const fetchDropdownValues = async () => {
//     try {
//       const response = await fetch('/api/dropdown-values'); // Replace with your backend API endpoint
//       const data = await response.json();
//       setDropdownValues(data);
//     } catch (error) {
//       console.error('Error fetching dropdown values:', error);
//     }
//   };

//   return (
//     <Autocomplete
//       // Other props for the Autocomplete component
//       options={dropdownValues}
//       getOptionLabel={(option) => option.name}
//       renderInput={(params) => <TextField {...params} />}
//     />
//   );
// }

// export default MyComponent;
