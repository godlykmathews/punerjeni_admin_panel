import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Helpline } from "../../types";
import { Loader2, Phone } from "lucide-react";
import { useNavigate } from 'react-router-dom';


export default function Helplines() {
  const [helplines, setHelplines] = useState<Helpline[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchHelplines = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "helplines"));
        const helplinesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Helpline[];
        setHelplines(helplinesData);
      } catch (error) {
        console.error("Error fetching helplines:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHelplines();
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
        <h1 className="text-2xl font-semibold text-gray-900">Helplines</h1>
        <button
          onClick={() => navigate("/helplines/add")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add Helpline
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {helplines.map((helpline) => (
            <li key={helpline.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {helpline.name}
                      </h3>
                      <p className="text-lg font-bold text-indigo-600">
                        {helpline.number}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    {helpline.description}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Available: {helpline.available}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
