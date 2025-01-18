import { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Report } from '../../types';
import { Loader2 } from 'lucide-react';

export default function Reports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'reports'));
        const reportsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Report[];
        setReports(reportsData);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const toggleStatus = async (reportId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'pending' ? 'resolved' : 'pending';
    try {
      const reportRef = doc(db, 'reports', reportId);
      await updateDoc(reportRef, { status: newStatus });
      setReports(reports.map(report => 
        report.id === reportId ? { ...report, status: newStatus } : report
      ));
    } catch (error) {
      console.error('Error updating report status:', error);
    }
  };

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
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {reports.map((report) => (
            <li key={report.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{report.type}</h3>
                    <div className="mt-1 flex items-center">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        report.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {report.status}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        {new Date(report.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      className="text-indigo-600 hover:text-indigo-900"
                      onClick={() => toggleStatus(report.id, report.status)}
                    >
                      Mark as {report.status === 'pending' ? 'Resolved' : 'Pending'}
                    </button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600">{report.description}</p>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Location: {report.location}</p>
                  {report.photo && <img src={report.photo} alt="Report" className="mt-2 w-full h-auto" />}
                  {report.video && <video controls src={report.video} className="mt-2 w-full h-auto" />}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}