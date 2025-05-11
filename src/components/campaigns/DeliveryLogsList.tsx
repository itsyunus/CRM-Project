import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, Eye, MousePointer } from 'lucide-react';

interface DeliveryLog {
  id: string;
  customerId: string;
  customerName: string;
  email: string;
  status: string;
  sentAt: string;
  deliveredAt: string | null;
  openedAt: string | null;
  clickedAt: string | null;
  error?: string;
}

interface DeliveryLogsListProps {
  logs: DeliveryLog[];
  isLoading: boolean;
}

const DeliveryLogsList: React.FC<DeliveryLogsListProps> = ({ logs, isLoading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('all');
  const itemsPerPage = 5;
  
  // Filter logs based on status
  const filteredLogs = filter === 'all' 
    ? logs 
    : logs.filter(log => log.status === filter);
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLogs = filteredLogs.slice(startIndex, startIndex + itemsPerPage);
  
  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading delivery logs...
      </div>
    );
  }
  
  return (
    <div>
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <button 
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              filter === 'all' 
                ? 'bg-blue-100 text-blue-800' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              filter === 'delivered' 
                ? 'bg-green-100 text-green-800' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setFilter('delivered')}
          >
            Delivered
          </button>
          <button 
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              filter === 'failed' 
                ? 'bg-red-100 text-red-800' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setFilter('failed')}
          >
            Failed
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Recipient
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sent
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delivered
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Opened
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Clicked
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentLogs.length > 0 ? (
              currentLogs.map((log) => (
                <tr key={log.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-800">
                          {log.customerName.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{log.customerName}</div>
                        <div className="text-sm text-gray-500">{log.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {log.status === 'delivered' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle size={12} className="mr-1" />
                        Delivered
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <AlertTriangle size={12} className="mr-1" />
                        Failed
                      </span>
                    )}
                    {log.error && (
                      <div className="mt-1 text-xs text-red-600">{log.error}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.sentAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.deliveredAt || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {log.openedAt ? (
                      <div className="flex items-center text-green-600">
                        <Eye size={14} className="mr-1" />
                        {log.openedAt}
                      </div>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {log.clickedAt ? (
                      <div className="flex items-center text-blue-600">
                        <MousePointer size={14} className="mr-1" />
                        {log.clickedAt}
                      </div>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                  No delivery logs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredLogs.length)} of {filteredLogs.length} results
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded text-sm ${
                currentPage === 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded text-sm ${
                currentPage === totalPages 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryLogsList;