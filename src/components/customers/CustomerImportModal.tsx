import React, { useState } from 'react';
import { X, Upload, AlertTriangle, CheckCircle } from 'lucide-react';
import Button from '../common/Button';

interface CustomerImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CustomerImportModal: React.FC<CustomerImportModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setImportStatus('idle');
      setErrorMessage('');
    }
  };
  
  const handleImport = async () => {
    if (!file) return;
    
    setImporting(true);
    setImportStatus('idle');
    
    try {
      // Simulate API call to import customers
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful import
      setImportStatus('success');
      setTimeout(() => {
        onSuccess();
      }, 1000);
    } catch (error) {
      setImportStatus('error');
      setErrorMessage('Failed to import customers. Please try again.');
    } finally {
      setImporting(false);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Import Customers</h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-6">
            {importStatus === 'idle' && (
              <>
                <p className="text-sm text-gray-500">
                  Upload a CSV file with your customer data. The file should include headers for name, email, phone, etc.
                </p>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Import file (CSV)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept=".csv"
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        CSV up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
                
                {file && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-md flex items-center">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-800">{file.name}</p>
                      <p className="text-xs text-blue-600">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </>
            )}
            
            {importStatus === 'success' && (
              <div className="text-center py-6">
                <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Import Successful</h3>
                <p className="text-sm text-gray-500">
                  Your customer data has been successfully imported.
                </p>
              </div>
            )}
            
            {importStatus === 'error' && (
              <div className="text-center py-6">
                <AlertTriangle size={48} className="mx-auto text-red-500 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Import Failed</h3>
                <p className="text-sm text-red-600">
                  {errorMessage || 'An error occurred during import. Please try again.'}
                </p>
              </div>
            )}
          </div>
          
          <div className="mt-6 sm:flex sm:flex-row-reverse">
            {importStatus === 'idle' && (
              <>
                <Button 
                  onClick={handleImport}
                  disabled={!file || importing}
                  variant="primary"
                >
                  {importing ? 'Importing...' : 'Import Customers'}
                </Button>
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="mt-3 sm:mt-0 sm:mr-3"
                >
                  Cancel
                </Button>
              </>
            )}
            
            {(importStatus === 'success' || importStatus === 'error') && (
              <Button
                onClick={onClose}
                variant={importStatus === 'success' ? 'primary' : 'outline'}
              >
                Close
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerImportModal;