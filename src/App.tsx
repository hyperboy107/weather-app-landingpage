import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Moon, Sun, Cloud, Droplets, Wind, ThermometerSun, CloudRain, Compass, Search, MapPin, Globe2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, BarChart, Bar } from 'recharts';
import { cn } from '@/lib/utils';

const mockData = {
  hourly: [
    { time: '00:00', temp: 18 },
    { time: '03:00', temp: 16 },
    { time: '06:00', temp: 15 },
    { time: '09:00', temp: 19 },
    { time: '12:00', temp: 23 },
    { time: '15:00', temp: 25 },
    { time: '18:00', temp: 22 },
    { time: '21:00', temp: 20 },
  ],
  humidity: [
    { name: 'Morning', value: 65 },
    { name: 'Afternoon', value: 45 },
    { name: 'Evening', value: 55 },
    { name: 'Night', value: 70 },
  ],
  windSpeed: [
    { time: 'Mon', speed: 12 },
    { time: 'Tue', speed: 15 },
    { time: 'Wed', speed: 8 },
    { time: 'Thu', speed: 10 },
    { time: 'Fri', speed: 14 },
  ],
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

function AnimatedSection({ children }: { children: React.ReactNode }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className={cn("min-h-screen transition-colors duration-300", 
      isDark ? "dark bg-background" : "bg-white")}>
      {/* Navbar */}
      <motion.nav 
        className="border-b sticky top-0 z-50 backdrop-blur-sm bg-background/80"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cloud className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary"></span>
          </div>
          <div className="flex items-center gap-6">
            <Button variant="ghost" className="text-primary">Features</Button>
            <Button variant="ghost" className="text-primary">About</Button>
            <Button variant="ghost" className="text-primary">Contact</Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDark(!isDark)}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Your Personal Weather Intelligence Platform
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Experience weather forecasting reimagined with stunning visualizations and precise analytics.
            </p>
            <div className="flex gap-4">
              <a href="https://weather-app-react-ts-chi.vercel.app/" target='_blank'><Button size="lg" className="bg-primary hover:bg-primary/90">
                Get Started
              </Button> </a>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="rounded-lg overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=2000&q=80"
              alt="Weather dashboard"
              className="w-full h-[400px] object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Search Preview Section */}
      <AnimatedSection>
        <section className="container mx-auto px-4 py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-3xl" />
          <div className="relative">
            <h2 className="text-3xl font-bold text-center mb-8">Search Any Location</h2>
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder="Search any city or country..." 
                    className="pl-10"
                  />
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                  Search
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: <Globe2 />, text: "Global Coverage" },
                  { icon: <MapPin />, text: "Precise Locations" },
                  { icon: <CloudRain />, text: "Real-time Data" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-center gap-2 text-primary"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection>
        <section className="container mx-auto px-4 py-16 bg-secondary/50 rounded-3xl my-16">
          <h2 className="text-3xl font-bold text-center mb-12">Advanced Weather Analytics</h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp}>
              <Card className="bg-card/50 backdrop-blur transform hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ThermometerSun className="h-5 w-5 text-primary" />
                    Temperature Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={mockData.hourly}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="temp" 
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-card/50 backdrop-blur transform hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-primary" />
                    Humidity Patterns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={mockData.humidity}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        fill="hsl(var(--primary))"
                      />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-card/50 backdrop-blur transform hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wind className="h-5 w-5 text-primary" />
                    Wind Patterns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={mockData.windSpeed}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="speed" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </section>
      </AnimatedSection>

      {/* Image Gallery Section */}
      <AnimatedSection>
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Weather Around the World</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1429552077091-836152271555?auto=format&fit=crop&w=800&q=80",
            ].map((url, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-lg aspect-video"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={url}
                  alt={`Weather scene ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Features Grid */}
      <AnimatedSection>
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose❓</h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerChildren}
          >
            {[
              {
                icon: <CloudRain className="h-8 w-8 text-primary" />,
                title: "Precise Forecasts",
                description: "Advanced algorithms provide accurate predictions for any location worldwide"
              },
              {
                icon: <Compass className="h-8 w-8 text-primary" />,
                title: "Real-time Updates",
                description: "Stay informed with live weather updates and alerts from any city"
              },
              {
                icon: <ThermometerSun className="h-8 w-8 text-primary" />,
                title: "Detailed Analytics",
                description: "Comprehensive weather data visualization and analysis for every location"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="bg-card p-6 rounded-lg shadow-lg"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-center">{feature.title}</h3>
                <p className="text-muted-foreground text-center">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </AnimatedSection>
    </div>
  );
}

export default App;