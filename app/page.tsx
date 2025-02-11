"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Droplet, Bug } from "lucide-react"

export default function Home() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)
  const solutionsRef = useRef(null) // Ref for "Our AI-Powered Solutions" section

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const heroImages = [
    {
      src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&h=900&fit=crop",
      alt: "Beautiful farm landscape",
    },
    {
      src: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&h=900&fit=crop",
      alt: "Farmer examining crops",
    },
    {
      src: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=1600&h=900&fit=crop",
      alt: "Modern farming technology",
    },
  ]

  // Handler for the "Explore Our Solutions" button click
  const handleExploreClick = () => {
    solutionsRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2f383e] to-[#374247] text-[#d3c6aa]">
      {/* Dynamic radial gradient following the cursor */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background: `radial-gradient(600px at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(29, 32, 33, 0.15), transparent 80%)`,
        }}
      />

      <header className="fixed top-0 left-0 right-0 z-50 bg-opacity-50 backdrop-blur-md">
        <nav className="container mx-auto py-4 px-6 flex justify-center items-center">
          <h1 className="text-3xl font-bold text-[#a7c080]">Farm Fusion</h1>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="relative h-screen overflow-hidden">
          <motion.div style={{ opacity, scale }} className="absolute inset-0">
            <Image
              src={heroImages[0].src || "/placeholder.svg"}
              alt={heroImages[0].alt}
              layout="fill"
              objectFit="cover"
              priority
            />
            <div className="absolute inset-0 bg-[#2f383e] bg-opacity-50" />
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="max-w-4xl px-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl font-bold mb-6 text-[#e0e0e0]"
              >
                Revolutionizing Agriculture with AI
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl mb-8 text-[#d3c6aa]"
              >
                Farm Fusion harnesses the power of machine learning to optimize crop yields, reduce resource waste, and promote sustainable farming practices.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button
                  onClick={handleExploreClick}
                  className="bg-[#a7c080] hover:bg-[#83a355] text-[#2f383e] text-lg px-8 py-3"
                >
                  Explore Our Solutions
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* "Why AI in Agriculture?" Section */}
        <section className="py-20 bg-[#374247]">
          <div className="container mx-auto px-6">
            <h3 className="text-3xl font-semibold text-[#a7c080] mb-12 text-center">Why AI in Agriculture?</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="bg-[#2f383e] border-[#4f5b58]">
                  <CardHeader>
                    <CardTitle className="text-[#a7c080]">Precision Farming</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#d3c6aa]">
                      AI analyzes vast amounts of data to provide tailored recommendations, optimizing resource use and increasing crop yields.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-[#2f383e] border-[#4f5b58]">
                  <CardHeader>
                    <CardTitle className="text-[#a7c080]">Early Disease Detection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#d3c6aa]">
                      Our AI can identify plant diseases from images with high accuracy, allowing for timely interventions and reduced crop losses.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Card className="bg-[#2f383e] border-[#4f5b58]">
                  <CardHeader>
                    <CardTitle className="text-[#a7c080]">Sustainable Practices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#d3c6aa]">
                      By recommending optimal fertilizer use and crop selection, we help reduce environmental impact and promote sustainable farming.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* "Our AI-Powered Solutions" Section (with ref for scrolling) */}
        <section ref={solutionsRef} className="py-20 bg-[#2f383e]">
          <div className="container mx-auto px-6">
            <h3 className="text-3xl font-semibold text-[#a7c080] mb-12 text-center">Our AI-Powered Solutions</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="bg-[#374247] border-[#4f5b58]">
                  <CardHeader>
                    <Leaf className="w-10 h-10 text-[#a7c080] mb-2" />
                    <CardTitle className="text-[#e0e0e0]">Crop Recommendation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#d3c6aa]">
                      Get AI-powered suggestions for the best crops to grow based on your soil and climate conditions.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/crop-recommendation">
                      <Button
                        variant="outline"
                        className="border-[#a7c080] text-[#a7c080] hover:bg-[#a7c080] hover:text-[#2f383e]"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-[#374247] border-[#4f5b58]">
                  <CardHeader>
                    <Droplet className="w-10 h-10 text-[#a7c080] mb-2" />
                    <CardTitle className="text-[#e0e0e0]">Fertilizer Recommendation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#d3c6aa]">
                      Receive personalized fertilizer recommendations to optimize your crop yield and soil health.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/fertilizer-recommendation">
                      <Button
                        variant="outline"
                        className="border-[#a7c080] text-[#a7c080] hover:bg-[#a7c080] hover:text-[#2f383e]"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Card className="bg-[#374247] border-[#4f5b58]">
                  <CardHeader>
                    <Bug className="w-10 h-10 text-[#a7c080] mb-2" />
                    <CardTitle className="text-[#e0e0e0]">Disease Detection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#d3c6aa]">
                      Detect crop diseases early with our advanced image recognition technology.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/disease-detection">
                      <Button
                        variant="outline"
                        className="border-[#a7c080] text-[#a7c080] hover:bg-[#a7c080] hover:text-[#2f383e]"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* "The Power of AI in Agriculture" Section */}
        <section className="py-20 bg-[#374247]">
          <div className="container mx-auto px-6">
            <h3 className="text-3xl font-semibold text-[#a7c080] mb-12 text-center">The Power of AI in Agriculture</h3>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h4 className="text-2xl font-semibold text-[#e0e0e0] mb-4">Data-Driven Decisions</h4>
                <p className="text-[#d3c6aa] mb-6">
                  Farm Fusion's AI models process vast amounts of data, including soil composition, weather patterns,
                  and historical crop performance, to provide accurate and personalized recommendations for farmers.
                </p>
                <h4 className="text-2xl font-semibold text-[#e0e0e0] mb-4">Continuous Learning</h4>
                <p className="text-[#d3c6aa]">
                  Our AI systems continuously learn and improve from new data, ensuring that our recommendations stay
                  up-to-date with the latest agricultural research and best practices.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative h-96"
              >
                <Image
                  src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&h=600&fit=crop"
                  alt="AI in Agriculture"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#374247] via-transparent to-transparent" />
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#2f383e] text-[#d3c6aa] py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2023 Farm Fusion. All rights reserved.</p>
          <p className="mt-2">Empowering farmers with AI-driven insights for a sustainable future.</p>
        </div>
      </footer>
    </div>
  )
}

