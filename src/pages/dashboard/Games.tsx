import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Game } from '../../types';
import { Loader2, GamepadIcon } from 'lucide-react';

import { useNavigate } from 'react-router-dom';


export default function Games() {

  const navigate = useNavigate();

  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'games'));
        const gamesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Game[];
        setGames(gamesData);
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Games</h1>
        <button 
          onClick={() => navigate('/games/add')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add Game
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <div key={game.id} className="bg-white overflow-hidden shadow rounded-lg">
            <img
              src={game.thumbnailUrl}
              alt={game.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center">
                <GamepadIcon className="h-5 w-5 text-indigo-600" />
                <h3 className="ml-2 text-lg font-medium text-gray-900">{game.name}</h3>
              </div>
              <p className="mt-2 text-sm text-gray-600">{game.description}</p>
              <div className="mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  {game.category}
                </span>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                <button className="text-red-600 hover:text-red-900">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}