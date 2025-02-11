"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { TreesIcon as Plant, Droplet, Thermometer } from "lucide-react"

export default function CropRecommendation() {
  const [result, setResult] = useState<{ class: string; confidence: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nitrogen: 50,
    phosphorus: 50,
    potassium: 50,
    temperature: 25,
    humidity: 50,
    pH: 7,
    rainfall: 100,
  })

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    const apiFormData = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      apiFormData.append(key, value.toString())
    })

    try {
      const response = await fetch("https://correct-loon-subtle.ngrok-free.app/v4/predict", {
        method: "POST",
        body: apiFormData,
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

  const handleChange = (name: string, value: number) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
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
          Crop Recommendation
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 text-center"
        >
          <p className="text-xl text-[#d3c6aa] mb-4">
            Our AI-powered crop recommendation system analyzes soil composition, climate conditions, and other factors
            to suggest the most suitable crops for your farm.
          </p>
          <p className="text-lg text-[#e0e0e0]">
            Simply input your soil and environmental data below, and let our machine learning model provide you with
            personalized crop recommendations.
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
                <CardTitle className="text-[#a7c080]">Input Parameters</CardTitle>
                <CardDescription className="text-[#d3c6aa]">
                  Adjust the sliders to match your farm's conditions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {Object.entries(formData).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <Label htmlFor={key} className="text-[#e0e0e0] flex items-center">
                        {key === "nitrogen" || key === "phosphorus" || key === "potassium" ? (
                          <Plant className="w-5 h-5 mr-2 text-[#a7c080]" />
                        ) : key === "temperature" ? (
                          <Thermometer className="w-5 h-5 mr-2 text-[#a7c080]" />
                        ) : key === "humidity" || key === "rainfall" ? (
                          <Droplet className="w-5 h-5 mr-2 text-[#a7c080]" />
                        ) : null}
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Label>
                      <Slider
                        id={key}
                        min={0}
                        max={key === "pH" ? 14 : key === "temperature" ? 50 : 200}
                        step={key === "pH" ? 0.1 : 1}
                        value={[value]}
                        onValueChange={([newValue]) => handleChange(key, newValue)}
                        className="text-[#a7c080]"
                      />
                      <div className="text-right text-sm text-[#d3c6aa]">{value}</div>
                    </div>
                  ))}
                  <Button
                    type="submit"
                    className="w-full bg-[#a7c080] hover:bg-[#83a355] text-[#2f383e]"
                    disabled={loading}
                  >
                    {loading ? "Analyzing..." : "Get Crop Recommendation"}
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
                <CardTitle className="text-[#a7c080]">Recommendation Result</CardTitle>
                <CardDescription className="text-[#d3c6aa]">
                  Based on your input, here's our AI-powered recommendation
                </CardDescription>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold text-[#e0e0e0] mb-4">Recommended Crop</h3>
                    <p className="text-4xl font-bold text-[#a7c080] mb-4">{result.class}</p>
                    <p className="text-lg text-[#d3c6aa]">Confidence: {result.confidence}</p>
                  </div>
                ) : (
                  <div className="text-center text-[#d3c6aa]">
                    <p>Adjust the parameters and click "Get Crop Recommendation" to see the results.</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="text-sm text-[#d3c6aa]">
                <p>
                  Note: This recommendation is based on the provided data and should be used in conjunction with local
                  agricultural expertise.
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

