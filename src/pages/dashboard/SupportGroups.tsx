import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { SupportGroup } from "../../types";
import { Loader2, Users, Link as LinkIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SupportGroups() {
  const [groups, setGroups] = useState<SupportGroup[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "support-groups"));
        const groupsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as SupportGroup[];
        setGroups(groupsData);
      } catch (error) {
        console.error("Error fetching groups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
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
        <h1 className="text-2xl font-semibold text-gray-900">Support Groups</h1>
        <button
          onClick={() => navigate("/support-groups/add")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add Group
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <div
            key={group.id}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-indigo-600" />
                <h3 className="ml-2 text-lg font-medium text-gray-900">
                  {group.name}
                </h3>
              </div>
              <p className="mt-2 text-sm text-gray-600">{group.description}</p>
              <div className="mt-4">
                <div className="flex items-center text-sm text-gray-500">
                  <LinkIcon className="mr-2 h-4 w-4" />
                  <a
                    href={group.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Join Meeting
                  </a>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <span className="font-medium">Schedule:</span>{" "}
                  {group.schedule}
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  <span className="font-medium">Type:</span> {group.type}
                </div>
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
