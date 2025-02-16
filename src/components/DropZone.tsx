
import { Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

export const DropZone = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('audio/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload audio files only",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 500);

    try {
      // TODO: Replace with actual upload logic
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setProgress(100);
      toast({
        title: "Success!",
        description: "Your file has been processed successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process the file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      clearInterval(interval);
    }
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    
    if (files.length === 0) return;
    handleFileUpload(files[0]);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    handleFileUpload(files[0]);
  };

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`glass w-full max-w-2xl mx-auto rounded-lg p-8 text-center transition-all duration-300 ${
        isDragging ? "scale-105 border-primary" : ""
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        {isProcessing ? (
          <>
            <div className="w-full space-y-4">
              <p className="text-lg font-medium">Processing your file...</p>
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground">{progress}% complete</p>
            </div>
          </>
        ) : (
          <>
            <Upload className="w-12 h-12 text-primary animate-bounce" />
            <h3 className="text-xl font-semibold">Drop your audio file here</h3>
            <p className="text-muted-foreground">
              or click to select files
            </p>
            <input
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleInputChange}
              onClick={(e) => (e.currentTarget.value = '')}
            />
          </>
        )}
      </div>
    </div>
  );
};
