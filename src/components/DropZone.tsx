
import { Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const DropZone = () => {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    
    const audioFiles = files.filter(file => file.type.startsWith('audio/'));
    if (audioFiles.length === 0) {
      toast({
        title: "Invalid file type",
        description: "Please upload audio files only",
        variant: "destructive",
      });
      return;
    }
    
    // Handle file upload here
    console.log("Files dropped:", audioFiles);
  }, [toast]);

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
        <Upload className="w-12 h-12 text-primary animate-bounce" />
        <h3 className="text-xl font-semibold">Drop your audio file here</h3>
        <p className="text-muted-foreground">
          or click to select files
        </p>
        <input
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            console.log("Files selected:", files);
          }}
        />
      </div>
    </div>
  );
};
