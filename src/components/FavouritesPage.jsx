import { useEffect, useState } from 'react';
import axios from 'axios';

const FavouritesPage = () => {
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        const fetchFavourites = async () => {
            try {
                const response = await axios.get('http://localhost:8000/favourites');
                setFavourites(response.data);
            } catch (error) {
                console.error('Error fetching favourites:', error);
            }
        };

        fetchFavourites();
    }, []);

    return (
        <div className="container mx-auto flex flex-col items-center justify-center">
            <h1 className="text-center my-4 text-3xl font-bold">Favourites</h1>
            <table className="table ">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">BranchType</th>
                        <th className="border border-gray-300 px-4 py-2">DeliveryStatus</th>
                        <th className="border border-gray-300 px-4 py-2">District</th>
                        <th className="border border-gray-300 px-4 py-2">Region</th>
                        <th className="border border-gray-300 px-4 py-2">State</th>
                    </tr>
                </thead>
                <tbody>
                    {favourites.map((item, index) => (
                        <tr key={index} className="border border-gray-300">
                            <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.branch_type}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.delivery_status}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.district}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.region}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.state}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FavouritesPage;
