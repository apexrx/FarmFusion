"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Upload } from "lucide-react"

export default function DiseaseDetection() {
  const [selectedCrop, setSelectedCrop] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<{ class: string; confidence: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleCropChange = (value: string) => {
    setSelectedCrop(value)
    setResult(null)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
    setResult(null)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!file || !selectedCrop) return

    setLoading(true)

    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch(`https://correct-loon-subtle.ngrok-free.app/v${selectedCrop}/predict`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Error:", error)
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2f383e] to-[#374247] text-[#d3c6aa] py-20">
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background: `radial-gradient(600px at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(167, 192, 128, 0.15), transparent 80%)`,
        }}
      />
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-[#a7c080] mb-8 text-center"
        >
          Disease Detection
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 text-center"
        >
          <p className="text-xl text-[#d3c6aa] mb-4">
            Our AI-powered disease detection system uses advanced image recognition to identify crop diseases quickly
            and accurately.
          </p>
          <p className="text-lg text-[#e0e0e0]">
            Simply select your crop type and upload an image of the affected plant to get an instant diagnosis.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="bg-[#2f383e] border-[#4f5b58]">
              <CardHeader>
                <CardTitle className="text-[#a7c080]">Image Upload</CardTitle>
                <CardDescription className="text-[#d3c6aa]">
                  Select your crop and upload a clear image of the plant
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="crop" className="text-[#e0e0e0]">
                      Select Crop
                    </Label>
                    <Select value={selectedCrop} onValueChange={handleCropChange}>
                      <SelectTrigger className="bg-[#374247] border-[#4f5b58] text-[#d3c6aa]">
                        <SelectValue placeholder="Select a crop" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#374247] border-[#4f5b58]">
                        <SelectItem value="1" className="text-[#d3c6aa]">
                          Potato
                        </SelectItem>
                        <SelectItem value="2" className="text-[#d3c6aa]">
                          Bell Pepper
                        </SelectItem>
                        <SelectItem value="5" className="text-[#d3c6aa]">
                          Wheat
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image" className="text-[#e0e0e0]">
                      Upload Image
                    </Label>
                    <div
                      className="border-2 border-dashed border-[#4f5b58] rounded-lg p-4 text-center cursor-pointer hover:bg-[#374247] transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {preview ? (
                        <img src={preview || "/placeholder.svg"} alt="Preview" className="max-h-48 mx-auto" />
                      ) : (
                        <div className="text-[#a7c080]">
                          <Upload className="w-12 h-12 mx-auto mb-2" />
                          <p>Click to upload or drag and drop</p>
                          <p className="text-sm text-[#d3c6aa]">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#a7c080] hover:bg-[#83a355] text-[#2f383e]"
                    disabled={loading || !file || !selectedCrop}
                  >
                    {loading ? "Analyzing..." : "Detect Disease"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="bg-[#2f383e] border-[#4f5b58]">
              <CardHeader>
                <CardTitle className="text-[#a7c080]">Detection Result</CardTitle>
                <CardDescription className="text-[#d3c6aa]">AI-powered disease diagnosis</CardDescription>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold text-[#e0e0e0] mb-4">Detected Condition</h3>
                    <p className="text-4xl font-bold text-[#a7c080] mb-4">{result.class}</p>
                    <p className="text-lg text-[#d3c6aa]">Confidence: {result.confidence}</p>
                  </div>
                ) : (
                  <div className="text-center text-[#d3c6aa]">
                    <AlertCircle className="w-16 h-16 mx-auto mb-4 text-[#a7c080]" />
                    <p>Upload an image and click "Detect Disease" to see the results.</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="text-sm text-[#d3c6aa]">
                <p>
                  Note: This detection is based on the provided image and should be confirmed by a professional
                  agronomist.
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

