import { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Upload, 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  Loader2,
  X
} from 'lucide-react';

interface FileUploadSummaryProps {
  language: 'en' | 'ml';
}

const translations = {
  en: {
    title: 'Document Analysis & Summary',
    description: 'Upload operational documents for instant summaries',
    chooseFile: 'Choose File',
    noFileChosen: 'No file chosen',
    dragDropText: 'Drag and drop files here, or',
    submitButton: 'Generate Summary',
    processing: 'Processing...',
    summary: 'Document Summary',
    success: 'Summary generated successfully',
    removeFile: 'Remove file',
    supportedFormats: 'Supported: PDF, DOCX, TXT (Max 10MB)'
  },
  ml: {
    title: 'ഡോക്യുമെന്റ് വിശകലനവും സംഗ്രഹവും',
    description: 'തൽക്ഷണ സംഗ്രഹങ്ങൾക്കായി പ്രവർത്തന ഡോക്യുമെന്റുകൾ അപ്‌ലോഡ് ചെയ്യുക',
    chooseFile: 'ഫയൽ തിരഞ്ഞെടുക്കുക',
    noFileChosen: 'ഫയൽ തിരഞ്ഞെടുത്തിട്ടില്ല',
    dragDropText: 'ഫയലുകൾ ഇവിടെ വലിച്ചിടുക, അല്ലെങ്കിൽ',
    submitButton: 'സംഗ്രഹം സൃഷ്ടിക്കുക',
    processing: 'പ്രോസസ്സിംഗ്...',
    summary: 'ഡോക്യുമെന്റ് സംഗ്രഹം',
    success: 'സംഗ്രഹം വിജയകരമായി സൃഷ്ടിച്ചു',
    removeFile: 'ഫയൽ നീക്കം ചെയ്യുക',
    supportedFormats: 'പിന്തുണയുള്ളത്: PDF, DOCX, TXT (പരമാവധി 10MB)'
  }
};

export function FileUploadSummary({ language }: FileUploadSummaryProps) {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = translations[language];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError('Unsupported file type. Please upload PDF, DOCX, or TXT files.');
        return;
      }
      
      // Validate file size (10MB limit)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size exceeds 10MB limit.');
        return;
      }
      
      setFile(selectedFile);
      setError('');
      setSummary('');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const formData = new FormData();
      formData.append('file', file); // MUST match multer field name

      const res = await fetch('http://localhost:5000/api/upload-summary', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setSummary(data.summary);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setSummary('');
    setError('');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          {t.title}
        </CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* File Input */}
        <div className="space-y-2">
  <label className="inline-flex items-center cursor-pointer bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-600">
    Choose File
    <input
      type="file"
      accept=".pdf,.docx,.txt"
      onChange={handleFileChange}
      className="hidden"
    />
  </label>
  <p className="text-xs text-gray-500">{t.supportedFormats}</p>
</div>


        {/* Selected File Display */}
        {file && (
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <FileText className="h-6 w-6 text-blue-500" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">{file.name}</p>
              <p className="text-sm text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeFile}
              className="text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Upload Button */}
        {file && (
          <Button
            onClick={handleUpload}
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {t.processing}
              </>
            ) : (
              t.submitButton
            )}
          </Button>
        )}

        {/* Error Display */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Summary Display */}
        {summary && (
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <CheckCircle className="h-5 w-5" />
                {t.summary}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-800 leading-relaxed">{summary}</p>
              <Badge variant="secondary" className="mt-3 bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                {t.success}
              </Badge>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}