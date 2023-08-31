import { useState } from 'react';
import {AsyncPaginate} from 'react-select-async-paginate'
import { GEO_API_URL,geoAPIoptions } from '../../api';
const Search=({onSearchChange})=>{
   
    const [search,setSearch]=useState(null);

    const loadOptions=(inputValue)=>{
        return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,geoAPIoptions)
        .then((res)=>res.json())
        .then((res)=>{
            // console.log('API Response:', res);
            return {
                options:res.data.map((city)=>{
                    return{
                        value: `${city.latitude} ${city.longitude}` ,
                        label: `${city.name} ,${city.countryCode}`,
                        

                    }
                    
                })
            }
            
        }
        )
        .catch(err=>console.error(err))

    }

    const handleOnChange=(searchData)=>{
        setSearch(searchData)
        onSearchChange(searchData)

    }

    return (
        <AsyncPaginate
        placeholder="Select for city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        
        />
    )
}

export default Search;