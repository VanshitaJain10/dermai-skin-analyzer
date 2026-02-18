import { useState, useRef, useCallback } from "react";
import { Upload, X, ImageIcon, ScanLine, AlertTriangle, CheckCircle } from "lucide-react";

const UploadSection = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
    setAnalyzed(false);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  const handleAnalyze = () => {
    if (!preview) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalyzed(true);
    }, 2500);
  };

  const clearImage = () => {
    setPreview(null);
    setAnalyzed(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <section id="upload" className="py-20 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-4 border border-primary/20">
            <ScanLine className="w-4 h-4 text-primary" />
            Image Analysis
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Upload & <span className="gradient-text">Analyze</span> Your Skin Image
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Upload a clear, well-lit photo of the skin area you'd like analyzed. Our AI model will identify potential conditions within seconds.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Upload Zone */}
          {!preview ? (
            <div
              className={`upload-zone rounded-2xl p-12 text-center cursor-pointer ${isDragging ? "border-primary bg-accent" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                  <Upload className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-foreground font-semibold text-lg mb-1">
                    Drag & drop your image here
                  </p>
                  <p className="text-muted-foreground text-sm">
                    or <span className="text-primary font-medium underline-offset-2 underline">browse to upload</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Supported: JPG, PNG, WEBP — Max 10MB</span>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </div>
          ) : (
            <div className="bg-muted/30 border border-border rounded-2xl overflow-hidden">
              {/* Image Preview */}
              <div className="relative">
                <img
                  src={preview}
                  alt="Uploaded skin image"
                  className="w-full max-h-80 object-contain bg-muted/20"
                />
                <button
                  onClick={clearImage}
                  className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm border border-border p-2 rounded-lg hover:bg-destructive hover:text-destructive-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-card rounded-xl px-8 py-6 flex flex-col items-center gap-3 shadow-xl">
                      <div className="relative w-10 h-10">
                        <div className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                      </div>
                      <p className="text-foreground font-semibold">Analyzing image...</p>
                      <p className="text-muted-foreground text-sm">AI model is processing</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="p-5 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 border border-border bg-card text-foreground px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-accent transition-colors"
                >
                  Change Image
                </button>
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || analyzed}
                  className="flex-1 gradient-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  <ScanLine className="w-4 h-4" />
                  {analyzed ? "Analysis Complete" : "Analyze with AI"}
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </div>
          )}

          {/* Demo Result */}
          {analyzed && (
            <div className="mt-4 bg-secondary/10 border border-secondary/30 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Analysis Complete (Demo)</p>
                  <p className="text-sm text-muted-foreground">
                    This is a frontend demo — connect a real AI backend to get actual predictions. The model would classify this image across 10 dermatological categories.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-5 rounded-xl p-4 flex items-start gap-3" style={{ background: "hsl(45 90% 96%)", border: "1px solid hsl(45 60% 80%)" }}>
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "hsl(45 80% 35%)" }} />
            <p className="text-sm leading-relaxed" style={{ color: "hsl(45 80% 25%)" }}>
              <strong>Disclaimer:</strong> DermAI is intended for educational and informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified dermatologist or healthcare provider for medical concerns.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;
