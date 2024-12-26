import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [type, setType] = useState('code');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8000/search/`, {
                params: { query, type },
            });
            // console.log("response: ", response);

            const data = response.data;
            const postOffices = data
            .filter(item => item.Status === "Success")
            .flatMap(item => item.PostOffice || []);
            
            setResults(postOffices);
        } catch (error) {
            console.error('Error fetching results:', error);
        }finally {
            setLoading(false);
        }
    };

    

    const markAsFavourite = async (location) => {
        const { Name: name, BranchType: branchType, DeliveryStatus: deliveryStatus, District: district, Region: region, State: state } = location;
        try {
            await axios.post('http://localhost:8000/favourites', {
                name,
                branchType,
                deliveryStatus,
                district,
                region,
                state,
            });
            alert('Added to favourites!');
        } catch (error) {
            console.error('Error saving favourite:', error);
        }
    };

    return (
        <div className="container mx-auto flex flex-col items-center justify-center">
            <h1 className="text-center my-4 text-3xl font-bold">Search Pincode Locations</h1>
            <Link to="/favourites">
            <button className='bg-blue-500 p-2 rounded-md'>
                Go to Favourites
            </button>
            </Link>
            <div className="mb-4 ">
                <input
                    type="text"
                    className="ring-1 rounded-md pl-2 my-2 flex items-center justify-center"
                    placeholder="Enter pincode or name"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <div className="mt-2">
                    <input
                        type="radio"
                        id="code"
                        name="type"
                        value="code"
                        checked={type === 'code'}
                        onChange={() => setType('code')}
                    />
                    <label htmlFor="code" className="ml-2">Search by Code</label>
                    <input
                        type="radio"
                        id="name"
                        name="type"
                        value="name"
                        className="ml-4"
                        checked={type === 'name'}
                        onChange={() => setType('name')}
                    />
                    <label htmlFor="name" className="ml-2">Search by Name</label>
                </div>
                <button className="bg-slate-400 px-3 py-1 rounded-md" onClick={handleSearch}>Search</button>
            </div>

            {loading && <p className="text-center">Loading...</p>}

            {results.length > 0 && (
                <table className="table-auto border-collapse border border-gray-300 w-full p-4">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">BranchType</th>
                            <th className="border border-gray-300 px-4 py-2">DeliveryStatus</th>
                            <th className="border border-gray-300 px-4 py-2">District</th>
                            <th className="border border-gray-300 px-4 py-2">Region</th>
                            <th className="border border-gray-300 px-4 py-2">State</th>
                            <th className="border border-gray-300 px-4 py-2">Favourite</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((item, index) => (
                            <tr key={index} className="border border-gray-300">
                                <td className="border border-gray-300 px-4 py-2">{item.Name}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.BranchType}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.DeliveryStatus}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.District}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.Region}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.State}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button className="bg-green-600 p-1 rounded-md" onClick={() => markAsFavourite(item)}>
                                       Add to Favourite
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SearchPage;
