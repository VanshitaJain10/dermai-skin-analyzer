import { useState, useRef, useCallback } from "react";
import { Upload, X, ImageIcon, ScanLine, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";

type AnalysisResult = {
  predicted_class: string;
  confidence: number;
  top3: { class: string; probability: number }[];
};

const UploadSection = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
    setFile(f);
    setAnalyzed(false);
    setResult(null);
    setError(null);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFile(dropped);
  }, []);

  const handleAnalyze = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    setError(null);

    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.detail ?? `Server error ${res.status}`);
      }

      const data: AnalysisResult = await res.json();
      setResult(data);
      setAnalyzed(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not reach the backend. Make sure the FastAPI server is running on localhost:8000."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearImage = () => {
    setPreview(null);
    setFile(null);
    setAnalyzed(false);
    setResult(null);
    setError(null);
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

          {/* Error */}
          {error && (
            <div className="mt-4 bg-destructive/10 border border-destructive/30 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-destructive text-sm mb-0.5">Analysis failed</p>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
            </div>
          )}

          {/* Analysis Result */}
          {analyzed && result && (
            <div className="mt-4 bg-secondary/10 border border-secondary/30 rounded-xl p-5">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Analysis Complete</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Consult a dermatologist for professional diagnosis.
                  </p>
                </div>
              </div>

              {/* Primary prediction */}
              <div className="bg-card border border-border rounded-lg px-4 py-3 mb-3">
                <p className="text-xs text-muted-foreground mb-1">Most likely condition</p>
                <div className="flex items-center justify-between gap-2">
                  <p className="font-bold text-foreground text-base leading-tight">
                    {result.predicted_class}
                  </p>
                  <span className="text-sm font-semibold text-secondary whitespace-nowrap">
                    {(result.confidence * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-secondary transition-all duration-700"
                    style={{ width: `${(result.confidence * 100).toFixed(1)}%` }}
                  />
                </div>
              </div>

              {/* Top-3 breakdown */}
              <div>
                <p className="text-xs text-muted-foreground mb-2 font-medium">Top 3 predictions</p>
                <div className="space-y-2">
                  {result.top3.map((item, i) => (
                    <div key={item.class} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-4 text-right">{i + 1}.</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-xs font-medium text-foreground truncate">
                            {item.class}
                          </span>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {(item.probability * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary/60 transition-all duration-700"
                            style={{ width: `${(item.probability * 100).toFixed(1)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
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
