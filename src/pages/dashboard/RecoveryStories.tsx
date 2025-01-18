import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { RecoveryStory } from "../../types";
import { Loader2 } from "lucide-react";

import { useNavigate } from 'react-router-dom';


export default function RecoveryStories() {
  const [stories, setStories] = useState<RecoveryStory[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();


  useEffect(() => {
    const fetchStories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "recovery-stories"));
        const storiesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as RecoveryStory[];
        setStories(storiesData);
      } catch (error) {
        console.error("Error fetching stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
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
          Recovery Stories
        </h1>
        <button
          onClick={() => navigate("/recovery-stories/add")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add Story
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {stories.map((story) => (
            <li key={story.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    {story.title}
                  </h3>
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
                    {story.content.substring(0, 150)}...
                  </p>
                  <div className="mt-2 text-sm text-gray-500">
                    <span>By {story.authorName}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(story.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
