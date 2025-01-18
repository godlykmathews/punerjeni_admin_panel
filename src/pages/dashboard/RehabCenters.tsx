import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { RehabCenter } from '../../types';
import { Loader2, MapPin, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RehabCenters() {
  const [centers, setCenters] = useState<RehabCenter[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'rehab-centers'));
        const centersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as RehabCenter[];
        setCenters(centersData);
      } catch (error) {
        console.error('Error fetching centers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCenters();
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
        <h1 className="text-2xl font-semibold text-gray-900">Rehabilitation Centers</h1>
        <button 
          onClick={() => navigate('/rehab-centers/add')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add Center
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {centers.map((center) => (
          <div key={center.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">{center.name}</h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="mr-2 h-4 w-4" />
                  <a href={center.locationLink} target="_blank" rel="noopener noreferrer">
                    {center.place}
                  </a>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Phone className="mr-2 h-4 w-4" />
                  {center.phone}
                </div>
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
