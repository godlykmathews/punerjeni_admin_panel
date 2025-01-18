import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { LawInfo } from "../../types";
import { Loader2, Scale } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LawInfoPage() {
  const [laws, setLaws] = useState<LawInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLaws = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "law-info"));
        const lawsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as LawInfo[];
        setLaws(lawsData);
      } catch (error) {
        console.error("Error fetching laws:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLaws();
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
        <h1 className="text-2xl font-semibold text-gray-900">
          Legal Information
        </h1>
        <button
          onClick={() => navigate("/law-info/add")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add Information
        </button>
      </div>

      <div className="space-y-6">
        {laws.map((law) => (
          <div
            key={law.id}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-6">
              <div className="flex items-center">
                <Scale className="h-6 w-6 text-indigo-600" />
                <h3 className="ml-2 text-lg font-medium text-gray-900">
                  {law.title}
                </h3>
              </div>
              <div className="mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  {law.category}
                </span>
              </div>
              <p className="mt-4 text-sm text-gray-600">{law.description}</p>
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Reference:</span>{" "}
                  {law.reference}
                </p>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button className="text-indigo-600 hover:text-indigo-900">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
